import React, { useState } from "react";
import "../table.css"; // Import the CSS file for this component

export default function Songs() {
    const [songs, setSongs] = useState([]); // State to hold songs
    const [isOpen, setIsOpen] = useState(false); // State to manage dialog box
    const [newSong, setNewSong] = useState({
        song_id: '',
        song_name: '',
        duration: '',
        artist_id: '',
        genre_id: '',
        release_date: '',
        plays: 0
    });
    const [editingSong, setEditingSong] = useState(null); // State for editing a song
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null); // State to manage dropdown visibility

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSong((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingSong) {
            // Update existing song
            setSongs((prev) =>
                prev.map(song => song.song_id === editingSong ? newSong : song)
            );
            setEditingSong(null); // Reset editing song state
        } else {
            // Add new song to songs state
            setSongs((prev) => [...prev, newSong]);
        }
        setIsOpen(false); // Close dialog
        resetForm(); // Reset form
    };

    // Function to reset form
    const resetForm = () => {
        setNewSong({
            song_id: '',
            song_name: '',
            duration: '',
            artist_id: '',
            genre_id: '',
            release_date: '',
            plays: 0
        });
    };

    // Function to handle delete song
    const handleDelete = (songId) => {
        setSongs((prev) => prev.filter(song => song.song_id !== songId));
    };

    // Function to handle edit song
    const handleEdit = (song) => {
        setNewSong(song); // Set the form fields to the song data
        setEditingSong(song.song_id); // Set the song id of the song being edited
        setIsOpen(true); // Open the dialog
        setDropdownOpenIndex(null); // Close dropdown on edit
    };

    // Function to toggle dropdown for specific row
    const toggleDropdown = (index) => {
        setDropdownOpenIndex(dropdownOpenIndex === index ? null : index); // Toggle dropdown for the row
    };

    // Function to increase play count
    const increasePlays = (songId) => {
        setSongs((prev) =>
            prev.map(song =>
                song.song_id === songId ? { ...song, plays: song.plays + 1 } : song
            )
        );
    };

    // Function to decrease play count
    const decreasePlays = (songId) => {
        setSongs((prev) =>
            prev.map(song =>
                song.song_id === songId && song.plays > 0
                    ? { ...song, plays: song.plays - 1 }
                    : song
            )
        );
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Add Song</button> {/* Button to open dialog */}

            {isOpen && (  // Dialog box conditionally rendered
                <div className="modal">
                    <h2>{editingSong ? 'Edit Song' : 'Add New Song'}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="song_id"
                            placeholder="Song ID"
                            value={newSong.song_id}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="song_name"
                            placeholder="Song Name"
                            value={newSong.song_name}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="duration"
                            placeholder="Duration (e.g., 3:45)"
                            value={newSong.duration}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="artist_id"
                            placeholder="Artist ID"
                            value={newSong.artist_id}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="genre_id"
                            placeholder="Genre ID"
                            value={newSong.genre_id}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="date"
                            name="release_date"
                            value={newSong.release_date}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="number"
                            name="plays"
                            placeholder="Number of Plays"
                            value={newSong.plays}
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
                        <th>SONG ID</th>
                        <th>SONG NAME</th>
                        <th>DURATION</th>
                        <th>ARTIST ID</th>
                        <th>GENRE ID</th>
                        <th>RELEASE DATE</th>
                        <th>PLAYS</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song, index) => (
                        <tr key={index} className="song-row">
                            <td>{song.song_id}</td>
                            <td>{song.song_name}</td>
                            <td>{song.duration}</td>
                            <td>{song.artist_id}</td>
                            <td>{song.genre_id}</td>
                            <td>{song.release_date}</td>
                            <td>
                                {song.plays}
                                <button onClick={() => increasePlays(song.song_id)}>▲</button> {/* Increment plays */}
                                <button onClick={() => decreasePlays(song.song_id)}>▼</button> {/* Decrement plays */}
                            </td>
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
                                            <button onClick={() => handleEdit(song)}>Edit</button>
                                            <button onClick={() => handleDelete(song.song_id)}>Delete</button>
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
