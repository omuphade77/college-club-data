import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import "./Sidebar.css";

const API_BASE = "https://college-club-data.onrender.com/api";

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
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) { navigate("/login"); return; }
        const res = await axios.get(`${API_BASE}/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchProfile();
  }, []);

  return (
    <>
      {/* Sidebar panel */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>

        {/* Header */}
        <div className="sidebar-header">
          <span className="sidebar-title">Menu</span>
          <button className="sidebar-close" onClick={onClose} aria-label="Close menu">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {/* Navigation */}
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
              <button className="sidebar-btn" onClick={() => { onOpenIssue(); onClose(); }}>
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
              <a href="/admin-login" target="_blank" rel="noopener noreferrer" onClick={onClose}>
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

            {/* Profile — just above logout */}
            <li className="sidebar-bottom-item">
              {user ? (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer", padding: "0.85rem 1rem" }}
                  onClick={() => setIsProfileOpen(true)}
                  title="View profile"
                >
                  {user.profile_image ? (
                    <img src={user.profile_image} width="35" height="35" style={{ borderRadius: "50%", objectFit: "cover" }} alt="avatar" />
                  ) : (
                    <div style={{ width: 35, height: 35, borderRadius: "50%", background: "#0f172a", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
                      {user.full_name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div style={{ fontSize: "14px", fontWeight: "bold", color: "#1e293b" }}>{user.full_name}</div>
                    <div style={{ fontSize: "12px", opacity: 0.6, color: "#334155" }}>{user.email}</div>
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: "12px", opacity: 0.6, padding: "0.85rem 1rem" }}>Loading profile...</div>
              )}
            </li>

            {/* Logout */}
            <li className="sidebar-bottom-item">
              <button
                className="sidebar-btn"
                onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}
              >
                <span className="nav-icon"><IconLogout /></span>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Backdrop overlay */}
      <div className={`overlay ${isOpen ? "open" : ""}`} onClick={onClose} />

      {/* Profile Modal */}
      {isProfileOpen && user && (
        <div className="profile-modal-backdrop" onClick={() => setIsProfileOpen(false)}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>

            <button className="profile-modal-close" onClick={() => setIsProfileOpen(false)} aria-label="Close profile">✕</button>

            {/* Avatar */}
            <div className="profile-modal-avatar-wrap">
              {user.profile_image ? (
                <img src={user.profile_image} alt={user.full_name} className="profile-modal-avatar" />
              ) : (
                <div className="profile-modal-avatar profile-modal-avatar-default">
                  {user.full_name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <h2 className="profile-modal-name">{user.full_name}</h2>
            <p className="profile-modal-email">{user.email}</p>

            {/* Skills */}
            <div className="profile-modal-skills-section">
              <span className="profile-modal-skills-label">Skills</span>
              {Array.isArray(user.skills) && user.skills.length > 0 ? (
                <div className="profile-modal-skills">
                  {user.skills.map((s, i) => (
                    <span key={i} className="profile-modal-skill-tag">{s}</span>
                  ))}
                </div>
              ) : (
                <p className="profile-modal-no-skills">No skills added</p>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
