import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import "../table.css"; // Import the CSS file for styling

export default function Artist() {
    const [artists, setArtists] = useState([]); // State to hold artist data
    const [isOpen, setIsOpen] = useState(false); // State to manage dialog box
    const [newArtist, setNewArtist] = useState({
        artist_id: '',
        art_name: '',
        genre: '',
        dob: '',
        country: '',
        albums_released: ''
    });
    const [editingArtist, setEditingArtist] = useState(null); // State for editing artist
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null); // Manage dropdown visibility

    // Fetch all artists from backend on component mount
    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/artists'); // Adjust the URL as needed
                setArtists(response.data);
            } catch (error) {
                console.error('Error fetching artists:', error);
            }
        };
        fetchArtists();
    }, []); // Empty dependency array ensures this runs only on mount

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewArtist((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingArtist) {
                // Update existing artist
                const response = await axios.put(`http://localhost:3000/api/artists/${editingArtist}`, newArtist); // Adjust the URL as needed
                setArtists((prev) =>
                    prev.map(artist => artist.artist_id === editingArtist ? response.data : artist)
                );
                setEditingArtist(null); // Reset editing artist state
            } else {
                // Add new artist
                const response = await axios.post('http://localhost:3000/api/artists', newArtist); // Adjust the URL as needed
                setArtists((prev) => [...prev, response.data]);
            }
            setIsOpen(false); // Close dialog
            resetForm(); // Reset form
        } catch (error) {
            console.error('Error submitting artist:', error);
        }
    };

    // Function to reset form
    const resetForm = () => {
        setNewArtist({
            artist_id: '',
            art_name: '',
            genre: '',
            dob: '',
            country: '',
            albums_released: ''
        });
    };

    // Function to handle delete artist
    const handleDelete = async (artistId) => {
        try {
            await axios.delete(`http://localhost:3000/api/artists/${artistId}`); // Adjust the URL as needed
            setArtists((prev) => prev.filter(artist => artist.artist_id !== artistId));
        } catch (error) {
            console.error('Error deleting artist:', error);
        }
    };

    // Function to handle edit artist
    const handleEdit = (artist) => {
        setNewArtist({
            artist_id: artist.artist_id,
            art_name: artist.art_name,
            genre: artist.genre,
            dob: artist.dob,
            country: artist.country,
            albums_released: artist.albums_released
        });
        setEditingArtist(artist.artist_id); // Set the artist id of the artist being edited
        setIsOpen(true); // Open the dialog
        setDropdownOpenIndex(null); // Close dropdown on edit
    };

    // Function to toggle dropdown for specific row
    const toggleDropdown = (index) => {
        setDropdownOpenIndex(dropdownOpenIndex === index ? null : index); // Toggle dropdown for the row
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }; // Format options
        return new Date(dateString).toLocaleDateString(undefined, options); // Format date
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Add Artist</button> {/* Button to open dialog */}

            {isOpen && (  // Dialog box conditionally rendered
                <div className="modal">
                    <h2>{editingArtist ? 'Edit Artist' : 'Add New Artist'}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="artist_id"
                            placeholder="Artist ID"
                            value={newArtist.artist_id}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="art_name"
                            placeholder="Artist Name"
                            value={newArtist.art_name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="genre"
                            placeholder="Genre"
                            value={newArtist.genre}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="date"
                            name="dob"
                            value={newArtist.dob}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={newArtist.country}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="albums_released"
                            placeholder="Albums Released"
                            value={newArtist.albums_released}
                            onChange={handleChange}
                            required
                        />
                        <button type="submit">Submit</button> {/* Submit button */}
                        <button type="button" onClick={() => setIsOpen(false)}>Cancel</button> {/* Button to close dialog */}
                    </form>
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th>ARTIST ID</th>
                        <th>NAME</th>
                        <th>GENRE</th>
                        <th>BIRTH DATE</th>
                        <th>COUNTRY</th>
                        <th>ALBUMS RELEASED</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {artists.map((artist, index) => (
                        <tr key={artist.artist_id} className="artist-row"> {/* Use artist_id as key */}
                            <td>{artist.artist_id}</td>
                            <td>{artist.art_name}</td>
                            <td>{artist.genre}</td>
                            <td>{formatDate(artist.dob)}</td>
                            <td>{artist.country}</td>
                            <td>{artist.albums_released}</td>
                            <td>
                                <div className="actions">
                                    <span 
                                        className="dots"
                                        onClick={() => toggleDropdown(index)} // Show options on click
                                    >
                                        &#x22EE; {/* Vertical ellipsis */}
                                    </span>
                                    {dropdownOpenIndex === index && ( // Show dropdown if this row is selected
                                        <div className="dropdown">
                                            <button onClick={() => handleEdit(artist)}>Edit</button>
                                            <button onClick={() => handleDelete(artist.artist_id)}>Delete</button>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
