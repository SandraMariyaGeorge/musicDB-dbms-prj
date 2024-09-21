import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddSong() {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ title, artist });
    navigate("/");
  };

  return (
    <div>
      <h1>Add New Song</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Song Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Artist:</label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
        </div>
        <button type="submit">Add Song</button>
      </form>
    </div>
  );
}
