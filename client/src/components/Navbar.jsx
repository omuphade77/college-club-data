import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ onToggleSidebar, sidebarOpen }) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">CommitteHub</Link>

        <button
          className={`hamburger ${sidebarOpen ? 'open' : ''}`}
          onClick={onToggleSidebar}
          aria-label="Toggle menu"
          aria-expanded={sidebarOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {isHome && (
          <ul className="nav-links">
            <li><Link to="/" className="active">Home</Link></li>
            <li><Link to="/announcements">Announcements</Link></li>
            <li><Link to="/events">Events</Link></li>
            <li><Link to="/match">Your Match</Link></li>
          </ul>
        )}

        {!isHome && (
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
          </ul>
        )}
      </div>
    </nav>
  );
}
