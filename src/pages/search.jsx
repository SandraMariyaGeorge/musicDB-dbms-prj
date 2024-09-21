import React, { useState } from "react";
import SongCard from "../components/SongCard";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState(""); // State to hold search input
  const [songs] = useState([
    { title: "Song 1", artist: "Artist 1" },
    { title: "Song 2", artist: "Artist 2" },
    { title: "Song 3", artist: "Artist 3" },
  ]);

  // Filter songs based on the search term
  const filteredSongs = songs.filter((song) =>
    song.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Songs List</h1>

      <input
        type="text"
        placeholder="Search for a song"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)} 
        style={{
          padding: "8px",
          marginBottom: "20px",
          width: "100%",
          maxWidth: "400px",
        }}
      />

      <div>
        {filteredSongs.length > 0 ? (
          filteredSongs.map((song, index) => (
            <SongCard key={index} song={song} />
          ))
        ) : (
          <p>No songs match your search</p>
        )}
      </div>
    </div>
  );
}
