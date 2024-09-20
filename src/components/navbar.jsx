import { Link, useMatch, useResolvedPath} from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav">
        <Link to="/" className="site-title">Music Streaming Platform</Link>
        <ul>
        <CustomLink to="/">Songs</CustomLink>
        <CustomLink to="/search">Search</CustomLink>
        <CustomLink to="/liked">Liked</CustomLink>
        <CustomLink to="/playlists">Playlists</CustomLink>
        <CustomLink to="/artists">Artists</CustomLink>
        </ul>
    </nav>
  )
}
function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }