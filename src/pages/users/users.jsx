import React, { useState } from "react";
import "../table.css"; // Import the CSS file for this component

export default function User() {
    const [users, setUsers] = useState([]); // State to hold users
    const [isOpen, setIsOpen] = useState(false); // State to manage dialog box
    const [newUser, setNewUser] = useState({
        user_id: '',
        username: '',
        email: '',
        subscription_plan: '',
        join_date: '',
        birthdate: '',
        country: ''
    });
    const [editingUser, setEditingUser] = useState(null); // State for editing a user
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null); // State to manage dropdown visibility

    // Function to handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingUser) {
            // Update existing user
            setUsers((prev) =>
                prev.map(user => user.user_id === editingUser ? newUser : user)
            );
            setEditingUser(null); // Reset editing user state
        } else {
            // Add new user to users state
            setUsers((prev) => [...prev, newUser]);
        }
        setIsOpen(false); // Close dialog
        resetForm(); // Reset form
    };

    // Function to reset form
    const resetForm = () => {
        setNewUser({
            user_id: '',
            username: '',
            email: '',
            subscription_plan: '',
            join_date: '',
            birthdate: '',
            country: ''
        });
    };

    // Function to handle delete user
    const handleDelete = (userId) => {
        setUsers((prev) => prev.filter(user => user.user_id !== userId));
    };

    // Function to handle edit user
    const handleEdit = (user) => {
        setNewUser(user); // Set the form fields to the user data
        setEditingUser(user.user_id); // Set the user id of the user being edited
        setIsOpen(true); // Open the dialog
        setDropdownOpenIndex(null); // Close dropdown on edit
    };

    // Function to toggle dropdown for specific row
    const toggleDropdown = (index) => {
        setDropdownOpenIndex(dropdownOpenIndex === index ? null : index); // Toggle dropdown for the row
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Add User</button> {/* Button to open dialog */}

            {isOpen && (  // Dialog box conditionally rendered
                <div className="modal">
                    <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="user_id"
                            placeholder="User ID"
                            value={newUser.user_id}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={newUser.username}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={newUser.email}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="subscription_plan"
                            placeholder="Subscription Plan"
                            value={newUser.subscription_plan}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="date"
                            name="join_date"
                            value={newUser.join_date}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="date"
                            name="birthdate"
                            value={newUser.birthdate}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={newUser.country}
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
                        <th>USER ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>SUBSCRIPTION PLAN</th>
                        <th>JOIN DATE</th>
                        <th>BIRTH DATE</th>
                        <th>COUNTRY</th>
                        {/* Removed ACTIONS column */}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} className="user-row">
                            <td>{user.user_id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.subscription_plan}</td>
                            <td>{user.join_date}</td>
                            <td>{user.birthdate}</td>
                            <td>{user.country}</td>
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
                                            <button onClick={() => handleEdit(user)}>Edit</button>
                                            <button onClick={() => handleDelete(user.user_id)}>Delete</button>
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
