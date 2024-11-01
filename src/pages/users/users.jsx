import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import "../table.css";

export default function User() {
    const [users, setUsers] = useState([]); // State to hold users
    const [isOpen, setIsOpen] = useState(false); // State to manage dialog box
    const [newUser, setNewUser] = useState({
        id: '',
        username: '',
        email: '',
        subscription_plan: '',
        join_date: '',
        birthdate: '',
        country: ''
    });
    const [editingUser, setEditingUser] = useState(null); // State for editing a user
    const [dropdownOpenIndex, setDropdownOpenIndex] = useState(null); // State to manage dropdown visibility

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Fetch all users from the backend
    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/users");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUser) {
                // Update existing user
                await axios.put(`http://localhost:3000/api/users/${editingUser}`, newUser);
                setEditingUser(null);
            } else {
                // Add new user
                await axios.post("http://localhost:3000/api/users", newUser);
            }
            fetchUsers(); // Refresh users list
            setIsOpen(false); // Close dialog
            resetForm(); // Reset form
        } catch (error) {
            console.error("Error submitting user:", error);
        }
    };

    // Reset form
    const resetForm = () => {
        setNewUser({
            id: '',
            username: '',
            email: '',
            subscription_plan: '',
            join_date: '',
            birthdate: '',
            country: ''
        });
    };

    // Delete a user
    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:3000/api/users/${userId}`);
            fetchUsers(); // Refresh users list
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    // Edit a user
    const handleEdit = (user) => {
        setNewUser(user); // Fill form with user data
        setEditingUser(user.id); // Set user_id for editing
        setIsOpen(true); // Open the dialog
        setDropdownOpenIndex(null); // Close dropdown
    };

    // Toggle dropdown for specific row
    const toggleDropdown = (index) => {
        setDropdownOpenIndex(dropdownOpenIndex === index ? null : index);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Add User</button>

            {isOpen && (
                <div className="modal">
                    <h2>{editingUser ? 'Edit User' : 'Add New User'}</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="id"
                            placeholder="User ID"
                            value={newUser.id}
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
                        <button type="submit">Submit</button>
                        <button type="button" onClick={() => setIsOpen(false)}>Cancel</button>
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
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} className="user-row">
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.subscription_plan}</td>
                            <td>{formatDate(user.join_date)}</td>
                            <td>{formatDate(user.dob)}</td>
                            <td>{user.country}</td>
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
                                            <button onClick={() => handleEdit(user)}>Edit</button>
                                            <button onClick={() => handleDelete(user.id)}>Delete</button>
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
