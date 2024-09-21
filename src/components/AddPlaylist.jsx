import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddPlaylist() {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, theme });
    navigate("/playlists");
  };

  return (
    <div>
      <h1>Add New Playlist</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Playlist Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Playlist theme:</label>
          <input
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          />
        </div>
        <button type="submit">Create Playlist</button>
      </form>
    </div>
  );
}
