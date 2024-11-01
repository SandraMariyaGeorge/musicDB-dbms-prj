import React, { useState, useEffect } from "react";
import "../table.css"; // Import the CSS file for this component

export default function Songs() {
    const [songs, setSongs] = useState([]); // State to hold songs from backend
    const [isOpen, setIsOpen] = useState(false); // State to manage dialog box
    const [newSong, setNewSong] = useState({
        song_id: '',
        song_name: '',
        duration: '',
        artist_id: '',
        genre_id: '',
        release_date: '',
        no_of_times_played: 0
    });
    const [editingSong, setEditingSong] = useState(null); // State for editing a song
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null); // State to manage dropdown visibility
    const [artists, setArtists] = useState([]); // State for artists
    const [genres, setGenres] = useState([]); // State for genres

    // Fetch songs, artists, and genres from backend on component mount
    useEffect(() => {
        fetchSongs();
        fetchArtists();
        fetchGenres();
    }, []);

    const fetchSongs = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/songs'); // Adjust endpoint as needed
            const data = await response.json();
            setSongs(data);
        } catch (error) {
            console.error('Error fetching songs:', error);
        }
    };

    const fetchArtists = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/artists'); // Adjust endpoint as needed
            const data = await response.json();
            setArtists(data);
        } catch (error) {
            console.error('Error fetching artists:', error);
        }
    };

    const fetchGenres = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/genres'); // Adjust endpoint as needed
            const data = await response.json();
            setGenres(data);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    // Handle input changes for form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewSong((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission for adding/updating a song
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingSong) {
            await updateSong(editingSong);
        } else {
            await addSong();
        }
        setIsOpen(false);
        resetForm();
    };

    const addSong = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/songs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSong)
            });
            const addedSong = await response.json();
            setSongs((prev) => [...prev, addedSong]);
        } catch (error) {
            console.error('Error adding song:', error);
        }
    };

    const updateSong = async (songId) => {
        try {
            const response = await fetch(`http://localhost:3000/api/songs/${songId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSong)
            });
            const updatedSong = await response.json();
            setSongs((prev) => prev.map(song => song.song_id === songId ? updatedSong : song));
        } catch (error) {
            console.error('Error updating song:', error);
        }
        setEditingSong(null);
    };

    const handleDelete = async (songId) => {
        try {
            await fetch(`http://localhost:3000/api/songs/${songId}`, {
                method: 'DELETE'
            });
            setSongs((prev) => prev.filter(song => song.song_id !== songId));
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    const handleEdit = (song) => {
        setNewSong(song);
        setEditingSong(song.song_id);
        setIsOpen(true);
        setDropdownOpenIndex(null);
    };

    const toggleDropdown = (index) => {
        setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
    };

    const increasePlays = async (songId) => {
        const song = songs.find(song => song.song_id === songId);
        if (song) {
            await updateSong(songId, { ...song, plays: song.plays + 1 });
        }
    };

    const decreasePlays = async (songId) => {
        const song = songs.find(song => song.song_id === songId);
        if (song && song.plays > 0) {
            await updateSong(songId, { ...song, plays: song.plays - 1 });
        }
    };

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

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Add Song</button>

            {isOpen && (
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
                        <select
                            name="artist_id"
                            value={newSong.artist_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Artist</option>
                            {artists.map(artist => (
                                <option key={artist.artist_id} value={artist.artist_id}>{artist.artist_name}</option>
                            ))}
                        </select>
                        <select
                            name="genre_id"
                            value={newSong.genre_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Genre</option>
                            {genres.map(genre => (
                                <option key={genre.genre_id} value={genre.genre_id}>{genre.genre_name}</option>
                            ))}
                        </select>
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
                        <button type="submit">Submit</button>
                        <button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
                    </form>
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th>SONG ID</th>
                        <th>SONG NAME</th>
                        <th>DURATION</th>
                        <th>ARTIST NAME</th>
                        <th>GENRE NAME</th>
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
                            <td>{artists.find(artist => artist.artist_id === song.artist_id)?.artist_name}</td>
                            <td>{genres.find(genre => genre.genre_id === song.genre_id)?.genre_name}</td>
                            <td>{song.release_date}</td>
                            <td>{song.no_of_times_played}</td>
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
