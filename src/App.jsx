import { Route, Routes } from 'react-router-dom';
import BaseLayout from './pages/BaseLayout.jsx';
import Users from './pages/users/users.jsx';
import Artists from './pages/artists/artists.jsx';
import Songs from './pages/songs/songs.jsx';
import Playlists from './pages/playlists/playlists.jsx';
import Genres from './pages/genre/genre.jsx';

export default function App() {
  return (
    <Routes>
      {/* BaseLayout as the parent route */}
      <Route path="/" element={<BaseLayout />}>
        {/* Child routes - These will be rendered in the Outlet */}
        <Route path="users" element={<Users />} />
        <Route path="artists" element={<Artists />} />
        <Route path="songs" element={<Songs />} />
        <Route path="playlists" element={<Playlists />} />
        <Route path="genres" element={<Genres />} /> 
      </Route>
    </Routes>
  );
}
