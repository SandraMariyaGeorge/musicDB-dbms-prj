import React, { useState, useEffect } from "react";
import axios from "axios";
import "../table.css"; // Import the CSS file for this component

export default function Genres() {
    const [genres, setGenres] = useState([]); // State to hold genres
    const [isOpen, setIsOpen] = useState(false); // State to manage dialog box
    const [newGenre, setNewGenre] = useState({
        id: '',
        genre_name: ''
    });
    const [editingGenre, setEditingGenre] = useState(null); // State for editing a genre
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null); // State to manage dropdown visibility

    // Fetch all genres from the backend
    const fetchGenres = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/genres");
            setGenres(response.data);
        } catch (error) {
            console.error("Error fetching genres:", error);
        }
    };

    useEffect(() => {
        fetchGenres();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewGenre((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (editingGenre) {
            // Update existing genre
            try {
                await axios.put(`http://localhost:3000/api/genres/${editingGenre}`, { genre_name: newGenre.genre_name });
                setGenres((prev) =>
                    prev.map((genre) => genre.id === editingGenre ? newGenre : genre)
                );
                setEditingGenre(null);
            } catch (error) {
                console.error("Error updating genre:", error);
            }
        } else {
            // Add new genre
            try {
                const response = await axios.post("http://localhost:3000/api/genres", { genre_name: newGenre.genre_name });
                setGenres((prev) => [...prev, response.data]);
            } catch (error) {
                console.error("Error adding genre:", error);
            }
        }
        setIsOpen(false);
        resetForm();
    };

    // Reset form
    const resetForm = () => {
        setNewGenre({
            id: '',
            genre_name: ''
        });
    };

    // Delete genre
    const handleDelete = async (genreId) => {
        try {
            await axios.delete(`http://localhost:3000/api/genres/${genreId}`);
            setGenres((prev) => prev.filter((genre) => genre.id !== genreId));
        } catch (error) {
            console.error("Error deleting genre:", error);
        }
    };

    // Edit genre
    const handleEdit = (genre) => {
        setNewGenre(genre);
        setEditingGenre(genre.id);
        setIsOpen(true);
        setDropdownOpenIndex(null);
    };

    // Toggle dropdown for specific row
    const toggleDropdown = (index) => {
        setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Add Genre</button> {/* Button to open dialog */}
            {isOpen && (
                <div className="modal">
                    <h2>{editingGenre ? 'Edit Genre' : 'Add New Genre'}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="id"
                            placeholder="Genre ID"
                            value={newGenre.id}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="genre_name"
                            placeholder="Genre Name"
                            value={newGenre.genre_name}
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
                        <th>GENRE ID</th>
                        <th>GENRE NAME</th>
                    </tr>
                </thead>
                <tbody>
                    {genres.map((genre, index) => (
                        <tr key={index} className="genre-row">
                            <td>{genre.id}</td>
                            <td>{genre.genre_name}</td>
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
                                            <button onClick={() => handleEdit(genre)}>Edit</button>
                                            <button onClick={() => handleDelete(genre.id)}>Delete</button>
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
