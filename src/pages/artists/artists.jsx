import React, { useState, useEffect } from "react";
import axios from "axios";
import "../table.css";

export default function Artist() {
    const [artists, setArtists] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [newArtist, setNewArtist] = useState({
        art_name: '',
        genre: '',
        dob: '',
        country: '',
        albums_released: ''
    });
    const [editingArtist, setEditingArtist] = useState(null); // Store artist ID for editing
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/artists');
                setArtists(response.data);
            } catch (error) {
                console.error('Error fetching artists:', error);
            }
        };
        fetchArtists();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewArtist((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingArtist) {
                // PUT request to update an existing artist
                const response = await axios.put(
                    `http://localhost:3000/api/artists/${editingArtist}`,
                    newArtist
                );
                setArtists((prev) =>
                    prev.map((artist) =>
                        artist.id === editingArtist ? response.data.updatedArtist : artist
                    )
                );
                setEditingArtist(null); // Clear editing state
            } else {
                // POST request to add a new artist
                const response = await axios.post('http://localhost:3000/api/artists', newArtist);
                setArtists((prev) => [...prev, response.data]);
            }
            setIsOpen(false); // Close dialog
            resetForm(); // Reset form
        } catch (error) {
            console.error('Error submitting artist:', error);
        }
    };

    const resetForm = () => {
        setNewArtist({
            art_name: '',
            genre: '',
            dob: '',
            country: '',
            albums_released: ''
        });
    };

    const handleDelete = async (artistId) => {
        if (!artistId) {
          console.error("Invalid artist ID for deletion");
          return;
        }
        try {
          await axios.delete(`http://localhost:3000/api/artists/${artistId}`);
          setArtists((prev) => prev.filter((artist) => artist.id !== artistId));
        } catch (error) {
          console.error('Error deleting artist:', error);
        }
      };
      

    const handleEdit = (artist) => {
        setNewArtist({
            art_name: artist.art_name,
            genre: artist.genre,
            dob: artist.dob,
            country: artist.country,
            albums_released: artist.albums_released
        });
        setEditingArtist(artist.id); // Set editing mode with artist ID
        setIsOpen(true);
        setDropdownOpenIndex(null);
    };

    const toggleDropdown = (index) => {
        setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div>
            <button onClick={() => { setIsOpen(true); setEditingArtist(null); resetForm(); }}>
                Add Artist
            </button>

            {isOpen && (
                <div className="modal">
                    <h2>{editingArtist ? 'Edit Artist' : 'Add New Artist'}</h2>
                    <form onSubmit={handleSubmit}>
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
                        <button type="submit">Submit</button>
                        <button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
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
                        <tr key={artist.id} className="artist-row">
                            <td>{artist.id}</td>
                            <td>{artist.art_name}</td>
                            <td>{artist.genre}</td>
                            <td>{formatDate(artist.dob)}</td>
                            <td>{artist.country}</td>
                            <td>{artist.albums_released}</td>
                            <td>
                                <div className="actions">
                                    <span 
                                        className="dots"
                                        onClick={() => toggleDropdown(index)}
                                    >
                                        &#x22EE;
                                    </span>
                                    {dropdownOpenIndex === index && (
                                        <div className="dropdown">
                                            <button onClick={() => handleEdit(artist)}>Edit</button>
                                            <button onClick={() => handleDelete(artist.id)}>Delete</button>
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
