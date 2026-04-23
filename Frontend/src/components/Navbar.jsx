import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ onToggleSidebar, sidebarOpen, isAdminDashboard }) {
  const location = useLocation();
  const adminTab = new URLSearchParams(location.search).get('tab');

  const logoTo = isAdminDashboard ? '/admin-dashboard' : '/home';

  if (isAdminDashboard) {
    return (
      <nav className="navbar navbar--admin">
        <div className="nav-container">
          <div className="nav-left">
            <Link to={logoTo} className="logo logo--admin">
              <img src="/images/logo.png" alt="" className="nav-logo-image" />
              CommitteeHub
            </Link>
          </div>

          <ul className="nav-links nav-links--admin">
            <li>
              <Link
                to="/admin-dashboard?tab=announcements-new"
                className={adminTab === 'announcements-new' ? 'active' : ''}
              >
                Announcements
              </Link>
            </li>
            <li>
              <Link
                to="/admin-dashboard?tab=events-new"
                className={adminTab === 'events-new' ? 'active' : ''}
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/admin-dashboard?tab=roles-pending"
                className={adminTab === 'roles-pending' ? 'active' : ''}
              >
                Roles
              </Link>
            </li>
            <li>
              <Link
                to="/admin-dashboard?tab=issues"
                className={adminTab === 'issues' ? 'active' : ''}
              >
                Issues
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
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
          <Link to={logoTo} className="logo">
            <img src="/images/logo.png" alt="Logo" className="nav-logo-image" />
            CommitteeHub
          </Link>
        </div>

        <ul className="nav-links">
          <li><Link to="/home" className={location.pathname === '/home' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/announcements" className={location.pathname === '/announcements' ? 'active' : ''}>Announcements</Link></li>
          <li><Link to="/events" className={location.pathname === '/events' ? 'active' : ''}>Events</Link></li>
          <li><Link to="/match" className={location.pathname === '/match' ? 'active' : ''}>Your Match</Link></li>
        </ul>
      </div>
    </nav>
  );
}
