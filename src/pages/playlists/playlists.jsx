import React, { useState, useEffect } from "react";
import axios from "axios";
import "../table.css";

export default function Playlists() {
    const [playlists, setPlaylists] = useState([]); 
    const [isOpen, setIsOpen] = useState(false);
    const [newPlaylist, setNewPlaylist] = useState({
        playlist_id: '',
        playlists_name: '',
        user_id: '',
        creation_date: '',
        ispublic: false
    });
    const [editingPlaylist, setEditingPlaylist] = useState(null);
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null);

    // Fetch all playlists from backend on component mount
    useEffect(() => {
        axios.get("http://localhost:3000/api/playlists")
            .then(response => setPlaylists(response.data))
            .catch(error => console.error("Error fetching playlists:", error));
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewPlaylist((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingPlaylist) {
            // Update existing playlist
            try {
                const response = await axios.put(`http://localhost:3000/api/playlists/${editingPlaylist}`, newPlaylist);
                setPlaylists(prev => prev.map(p => p.id === editingPlaylist ? response.data.updatedPlaylist : p));
                setEditingPlaylist(null);
            } catch (error) {
                console.error("Error updating playlist:", error);
            }
        } else {
            // Add new playlist
            try {
                const response = await axios.post("http://localhost:3000/api/playlists", newPlaylist);
                setPlaylists(prev => [...prev, response.data]);
            } catch (error) {
                console.error("Error adding playlist:", error);
            }
        }
        setIsOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setNewPlaylist({
            id: '',
            playlists_name: '',
            user_id: '',
            creation_date: '',
            ispublic: false
        });
    };

    const handleDelete = async (playlistId) => {
        try {
            await axios.delete(`http://localhost:3000/api/playlists/${playlistId}`);
            setPlaylists(prev => prev.filter(playlist => playlist.id !== playlistId));
        } catch (error) {
            console.error("Error deleting playlist:", error);
        }
    };

    const handleEdit = (playlist) => {
        setNewPlaylist(playlist);
        setEditingPlaylist(playlist.id);
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
            <button onClick={() => setIsOpen(true)}>Add Playlist</button>
            {isOpen && (
                <div className="modal">
                    <h2>{editingPlaylist ? 'Edit Playlist' : 'Add New Playlist'}</h2>
                    <form onSubmit={handleSubmit}>
                        {/* <input
                            type="text"
                            name="id"
                            placeholder="Playlist ID"
                            value={newPlaylist.id}
                            onChange={handleChange}
                            required
                        /> */}
                        <input
                            type="text"
                            name="playlists_name"
                            placeholder="Playlist Name"
                            value={newPlaylist.playlists_name}
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
                                name="ispublic"
                                checked={newPlaylist.ispublic}
                                onChange={handleChange}
                            />
                            Is Public
                        </label>
                        <button type="submit">Submit</button>
                        <button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
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
                            <td>{playlist.id}</td>
                            <td>{playlist.playlists_name}</td>
                            <td>{playlist.user_id}</td>
                            <td>{formatDate(playlist.creation_date)}</td>
                            <td>{playlist.ispublic ? "Yes" : "No"}</td>
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
                                            <button onClick={() => handleEdit(playlist)}>Edit</button>
                                            <button onClick={() => handleDelete(playlist.id)}>Delete</button>
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
