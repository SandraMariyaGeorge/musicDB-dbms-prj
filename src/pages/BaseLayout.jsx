import './layout.css';
import { NavLink, Outlet } from 'react-router-dom';

export default function BaseLayout() {
    return (
        <div className="container">
            <h1>Music Database</h1>
            <div className="button-row">
                <NavLink to="/artists" className={({ isActive }) => (isActive ? "active button" : "button")}>
                    Artist
                </NavLink>
                <NavLink to="/songs" className={({ isActive }) => (isActive ? "active button" : "button")}>
                    Songs
                </NavLink>
                <NavLink to="/users" className={({ isActive }) => (isActive ? "active button" : "button")}>
                    Users
                </NavLink>
                <NavLink to="/playlists" className={({ isActive }) => (isActive ? "active button" : "button")}>
                    Playlist
                </NavLink>
                <NavLink to="/genres" className={({ isActive }) => (isActive ? "active button" : "button")}>
                    Genre
                </NavLink>
            </div>

            <Outlet />
        </div>
    );
}
