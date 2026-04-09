import { Link } from 'react-router-dom';
import './Sidebar.css';

export default function Sidebar({ isOpen, onClose, onOpenIssue }) {
  return (
    <>
      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-title">CommitteeHub</span>
          <button className="sidebar-close" onClick={onClose}>✕</button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/" onClick={onClose}>🏠 Home</Link></li>
            <li><Link to="/events" onClick={onClose}>📅 Events</Link></li>
            <li><Link to="/match" onClick={onClose}>🎯 Your Match</Link></li>
            <li className="divider"></li>
            <li>
              <button className="issue-btn" onClick={() => { onOpenIssue(); onClose(); }}>
                ⚠️ Raise an Issue
              </button>
            </li>
            <li>
              <Link to="/add-role" onClick={onClose}>🎯 Add your Role</Link>
            </li>
            <li>
              <Link to="/admin-login" onClick={onClose}>🛡️ Admin Panel</Link>
            </li>
            <li>
              <Link to="/connect" onClick={onClose}>📞 Connect with us</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div
        className={`overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      />
    </>
  );
}
