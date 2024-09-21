import SongCard from "../components/SongCard";
import { Link } from "react-router-dom";


export default function playlists() {
    return (
        <div>
            <h1>PlayLists</h1>
            <Link to="/addplaylist">
                <button>Add a new Playlist</button>
            </Link>
        </div>
    );
}