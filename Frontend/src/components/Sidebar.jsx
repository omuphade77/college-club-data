import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

// SVG Icons
const IconDashboard = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M4 4h6v6H4zm10 0h6v6h-6zM4 14h6v6H4zm10 0h6v6h-6z" />
  </svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
  </svg>
);
const IconTarget = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
  </svg>
);
const IconAlert = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
  </svg>
);
const IconRole = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
  </svg>
);
const IconPhone = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.12-.74-.03-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.03 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
  </svg>
);
const IconLogout = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59zM19 3H5c-1.11 0-2 .9-2 2v4h2V5h14v14H5v-4H3v4c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
  </svg>
);

export default function Sidebar({ isOpen, onClose, onOpenIssue }) {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">Menu</span>
          <button className="sidebar-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/home" className={isActive("/home")} onClick={onClose}>
                <span className="nav-icon"><IconDashboard /></span>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/events" className={isActive("/events")} onClick={onClose}>
                <span className="nav-icon"><IconCalendar /></span>
                Events
              </Link>
            </li>
            <li>
              <Link to="/match" className={isActive("/match")} onClick={onClose}>
                <span className="nav-icon"><IconTarget /></span>
                Your Match
              </Link>
            </li>
            <li className="divider"></li>
            <li>
              <button
                className="sidebar-btn"
                onClick={() => {
                  onOpenIssue();
                  onClose();
                }}
              >
                <span className="nav-icon"><IconAlert /></span>
                Raise an Issue
              </button>
            </li>
            <li>
              <Link to="/add-role" className={isActive("/add-role")} onClick={onClose}>
                <span className="nav-icon"><IconRole /></span>
                Add your Role
              </Link>
            </li>
            <li>
              <a
                href="/admin-login"
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
              >
                <span className="nav-icon"><IconShield /></span>
                Admin Panel
              </a>
            </li>
            <li>
              <Link to="/connect" className={isActive("/connect")} onClick={onClose}>
                <span className="nav-icon"><IconPhone /></span>
                Connect with us
              </Link>
            </li>
            <li className="sidebar-bottom-item">
              <a href="/login">
                <span className="nav-icon"><IconLogout /></span>
                Logout
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className={`overlay ${isOpen ? "open" : ""}`} onClick={onClose} />
    </>
  );
}
