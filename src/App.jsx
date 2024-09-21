import Navbar from "./components/navbar";
import "./style.css";
import Songs from "./pages/songs";
import Search from "./pages/search";
import Liked from "./pages/liked";
import Artists from "./pages/artists";
import Playlists from "./pages/playlists";
import AddPlaylist from "./components/AddPlaylist";
import AddSong from "./components/AddSong";
import { Route, Routes } from "react-router-dom";

export default function App() {
  return (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Songs />} />
      <Route path="/addsong" element={<AddSong />} />
      <Route path="/addplaylist" element={<AddPlaylist />} />
      <Route path="/search" element={<Search />} />
      <Route path="/liked" element={<Liked />} />
      <Route path="/playlists" element={<Playlists />} />
      <Route path="/artists" element={<Artists />} />
    </Routes>
  </>
  )
}