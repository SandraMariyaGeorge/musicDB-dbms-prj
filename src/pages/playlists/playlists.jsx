import React, { useState } from "react";
import "../table.css"; // Import the CSS file for this component

export default function Playlists() {
    const [playlists, setPlaylists] = useState([]); // State to hold playlists
    const [isOpen, setIsOpen] = useState(false); // State to manage dialog box
    const [newPlaylist, setNewPlaylist] = useState({
        playlist_id: '',
        playlist_name: '',
        user_id: '',
        creation_date: '',
        is_public: false
    });
    const [editingPlaylist, setEditingPlaylist] = useState(null); // State for editing a playlist
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null); // State to manage dropdown visibility

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewPlaylist((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingPlaylist) {
            // Update existing playlist
            setPlaylists((prev) =>
                prev.map(playlist => playlist.playlist_id === editingPlaylist ? newPlaylist : playlist)
            );
            setEditingPlaylist(null); // Reset editing playlist state
        } else {
            // Add new playlist to playlists state
            setPlaylists((prev) => [...prev, newPlaylist]);
        }
        setIsOpen(false); // Close dialog
        resetForm(); // Reset form
    };

    // Function to reset form
    const resetForm = () => {
        setNewPlaylist({
            playlist_id: '',
            playlist_name: '',
            user_id: '',
            creation_date: '',
            is_public: false
        });
    };

    // Function to handle delete playlist
    const handleDelete = (playlistId) => {
        setPlaylists((prev) => prev.filter(playlist => playlist.playlist_id !== playlistId));
    };

    // Function to handle edit playlist
    const handleEdit = (playlist) => {
        setNewPlaylist(playlist); // Set the form fields to the playlist data
        setEditingPlaylist(playlist.playlist_id); // Set the playlist id of the playlist being edited
        setIsOpen(true); // Open the dialog
        setDropdownOpenIndex(null); // Close dropdown on edit
    };

    // Function to toggle dropdown for specific row
    const toggleDropdown = (index) => {
        setDropdownOpenIndex(dropdownOpenIndex === index ? null : index); // Toggle dropdown for the row
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Add Playlist</button> {/* Button to open dialog */}

            {isOpen && (  // Dialog box conditionally rendered
                <div className="modal">
                    <h2>{editingPlaylist ? 'Edit Playlist' : 'Add New Playlist'}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="playlist_id"
                            placeholder="Playlist ID"
                            value={newPlaylist.playlist_id}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="playlist_name"
                            placeholder="Playlist Name"
                            value={newPlaylist.playlist_name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="user_id"
                            placeholder="User ID"
                            value={newPlaylist.user_id}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="date"
                            name="creation_date"
                            value={newPlaylist.creation_date}
                            onChange={handleChange}
                            required
                        />
                        <label>
                            <input
                                type="checkbox"
                                name="is_public"
                                checked={newPlaylist.is_public}
                                onChange={handleChange}
                            />
                            Is Public
                        </label>
                        <button type="submit">Submit</button> {/* Submit button */}
                        <button type="button" onClick={() => setIsOpen(false)}>Cancel</button> {/* Button to close dialog */}
                    </form>
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th>PLAYLIST ID</th>
                        <th>PLAYLIST NAME</th>
                        <th>USER ID</th>
                        <th>CREATION DATE</th>
                        <th>IS PUBLIC</th>
                    </tr>
                </thead>
                <tbody>
                    {playlists.map((playlist, index) => (
                        <tr key={index} className="playlist-row">
                            <td>{playlist.playlist_id}</td>
                            <td>{playlist.playlist_name}</td>
                            <td>{playlist.user_id}</td>
                            <td>{playlist.creation_date}</td>
                            <td>{playlist.is_public ? "Yes" : "No"}</td>
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
                                            <button onClick={() => handleEdit(playlist)}>Edit</button>
                                            <button onClick={() => handleDelete(playlist.playlist_id)}>Delete</button>
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
