import SongCard from "../components/SongCard";
import { Link } from "react-router-dom";


export default function Songs() {
    return (
        <div>
            <h1>Songs List</h1>
            <Link to="/addsong">
                <button>Add New Song</button>
            </Link>
            <div>
                <SongCard song={{ title: "Song 1", artist: "Artist 1" }} />
                <SongCard song={{ title: "Song 2", artist: "Artist 2" }} />
                <SongCard song={{ title: "Song 3", artist: "Artist 3" }} />
            </div>
        </div>
    );
}