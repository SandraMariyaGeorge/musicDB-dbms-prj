import React, { useState } from "react";
import "../table.css"; // Import the CSS file for styling

export default function Artist() {
    const [artists, setArtists] = useState([]); // State to hold artist data
    const [isOpen, setIsOpen] = useState(false); // State to manage dialog box
    const [newArtist, setNewArtist] = useState({
        artist_id: '',
        name: '',
        genre: '',
        birthdate: '',
        country: '',
        albums_released: ''
    });
    const [editingArtist, setEditingArtist] = useState(null); // State for editing artist
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null); // Manage dropdown visibility

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewArtist((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingArtist) {
            // Update existing artist
            setArtists((prev) =>
                prev.map(artist => artist.artist_id === editingArtist ? newArtist : artist)
            );
            setEditingArtist(null); // Reset editing artist state
        } else {
            // Add new artist
            setArtists((prev) => [...prev, newArtist]);
        }
        setIsOpen(false); // Close dialog
        resetForm(); // Reset form
    };

    // Function to reset form
    const resetForm = () => {
        setNewArtist({
            artist_id: '',
            name: '',
            genre: '',
            birthdate: '',
            country: '',
            albums_released: ''
        });
    };

    // Function to handle delete artist
    const handleDelete = (artistId) => {
        setArtists((prev) => prev.filter(artist => artist.artist_id !== artistId));
    };

    // Function to handle edit artist
    const handleEdit = (artist) => {
        setNewArtist(artist); // Set the form fields to the artist data
        setEditingArtist(artist.artist_id); // Set the artist id of the artist being edited
        setIsOpen(true); // Open the dialog
        setDropdownOpenIndex(null); // Close dropdown on edit
    };

    // Function to toggle dropdown for specific row
    const toggleDropdown = (index) => {
        setDropdownOpenIndex(dropdownOpenIndex === index ? null : index); // Toggle dropdown for the row
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
                            name="name"
                            placeholder="Artist Name"
                            value={newArtist.name}
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
                            name="birthdate"
                            value={newArtist.birthdate}
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
                    </tr>
                </thead>
                <tbody>
                    {artists.map((artist, index) => (
                        <tr key={index} className="artist-row">
                            <td>{artist.artist_id}</td>
                            <td>{artist.name}</td>
                            <td>{artist.genre}</td>
                            <td>{artist.birthdate}</td>
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
