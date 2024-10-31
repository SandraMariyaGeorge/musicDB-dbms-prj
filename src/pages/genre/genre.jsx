import React, { useState } from "react";
import "../table.css"; // Import the CSS file for this component

export default function Genres() {
    const [genres, setGenres] = useState([]); // State to hold genres
    const [isOpen, setIsOpen] = useState(false); // State to manage dialog box
    const [newGenre, setNewGenre] = useState({
        genre_id: '',
        genre_name: ''
    });
    const [editingGenre, setEditingGenre] = useState(null); // State for editing a genre
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null); // State to manage dropdown visibility

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewGenre((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingGenre) {
            // Update existing genre
            setGenres((prev) =>
                prev.map(genre => genre.genre_id === editingGenre ? newGenre : genre)
            );
            setEditingGenre(null); // Reset editing genre state
        } else {
            // Add new genre to genres state
            setGenres((prev) => [...prev, newGenre]);
        }
        setIsOpen(false); // Close dialog
        resetForm(); // Reset form
    };

    // Function to reset form
    const resetForm = () => {
        setNewGenre({
            genre_id: '',
            genre_name: ''
        });
    };

    // Function to handle delete genre
    const handleDelete = (genreId) => {
        setGenres((prev) => prev.filter(genre => genre.genre_id !== genreId));
    };

    // Function to handle edit genre
    const handleEdit = (genre) => {
        setNewGenre(genre); // Set the form fields to the genre data
        setEditingGenre(genre.genre_id); // Set the genre id of the genre being edited
        setIsOpen(true); // Open the dialog
        setDropdownOpenIndex(null); // Close dropdown on edit
    };

    // Function to toggle dropdown for specific row
    const toggleDropdown = (index) => {
        setDropdownOpenIndex(dropdownOpenIndex === index ? null : index); // Toggle dropdown for the row
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Add Genre</button> {/* Button to open dialog */}

            {isOpen && (  // Dialog box conditionally rendered
                <div className="modal">
                    <h2>{editingGenre ? 'Edit Genre' : 'Add New Genre'}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="genre_id"
                            placeholder="Genre ID"
                            value={newGenre.genre_id}
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
                        <button type="submit">Submit</button> {/* Submit button */}
                        <button type="button" onClick={() => setIsOpen(false)}>Cancel</button> {/* Button to close dialog */}
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
                            <td>{genre.genre_id}</td>
                            <td>{genre.genre_name}</td>
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
                                            <button onClick={() => handleEdit(genre)}>Edit</button>
                                            <button onClick={() => handleDelete(genre.genre_id)}>Delete</button>
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
