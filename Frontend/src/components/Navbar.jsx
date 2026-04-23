import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar({ onToggleSidebar, sidebarOpen, isAdminDashboard }) {
  const location = useLocation();
  const adminTab = new URLSearchParams(location.search).get('tab');
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
  }, [location.pathname, location.search]);

  const logoTo = isAdminDashboard ? '/admin-dashboard' : '/home';
  const toggleDropdown = (id) => {
    setOpenDropdown((prev) => (prev === id ? null : id));
  };

  if (isAdminDashboard) {
    return (
      <nav className="navbar navbar--admin" ref={navRef}>
        <div className="nav-container">
          <div className="nav-left">
            <Link to={logoTo} className="logo logo--admin">
              <img src="/images/logo.png" alt="" className="nav-logo-image" />
              CommitteeHub
            </Link>
          </div>

          <ul className="nav-links nav-links--admin">
            <li className="nav-dropdown">
              <button
                type="button"
                className={`nav-dropdown-trigger ${openDropdown === 'announcements' ? 'is-open' : ''}`}
                aria-expanded={openDropdown === 'announcements'}
                onClick={() => toggleDropdown('announcements')}
              >
                Announcements
              </button>
              <ul className={`nav-dropdown-menu ${openDropdown === 'announcements' ? 'is-visible' : ''}`}>
                <li>
                  <Link to="/admin-dashboard?tab=announcements-new" onClick={() => setOpenDropdown(null)}>
                    New announcement
                  </Link>
                </li>
                <li>
                  <Link to="/admin-dashboard?tab=announcements-past" onClick={() => setOpenDropdown(null)}>
                    Past announcements
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-dropdown">
              <button
                type="button"
                className={`nav-dropdown-trigger ${openDropdown === 'events' ? 'is-open' : ''}`}
                aria-expanded={openDropdown === 'events'}
                onClick={() => toggleDropdown('events')}
              >
                Events
              </button>
              <ul className={`nav-dropdown-menu ${openDropdown === 'events' ? 'is-visible' : ''}`}>
                <li>
                  <Link to="/admin-dashboard?tab=events-new" onClick={() => setOpenDropdown(null)}>
                    Upload new
                  </Link>
                </li>
                <li>
                  <Link to="/admin-dashboard?tab=events-past" onClick={() => setOpenDropdown(null)}>
                    Past events
                  </Link>
                </li>
              </ul>
            </li>

            <li className="nav-dropdown">
              <button
                type="button"
                className={`nav-dropdown-trigger ${openDropdown === 'roles' ? 'is-open' : ''}`}
                aria-expanded={openDropdown === 'roles'}
                onClick={() => toggleDropdown('roles')}
              >
                Roles
              </button>
              <ul className={`nav-dropdown-menu ${openDropdown === 'roles' ? 'is-visible' : ''}`}>
                <li>
                  <Link to="/admin-dashboard?tab=roles-pending" onClick={() => setOpenDropdown(null)}>
                    Pending
                  </Link>
                </li>
                <li>
                  <Link to="/admin-dashboard?tab=roles-approved" onClick={() => setOpenDropdown(null)}>
                    Approved members
                  </Link>
                </li>
              </ul>
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
    <nav className="navbar" ref={navRef}>
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
