import { useState, useEffect } from 'react';
import { api } from '../api';
import './AnnouncementsPage.css';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAnnouncements()
      .then(data => { setAnnouncements(data); setLoading(false); })
      .catch(err => { console.error('Error fetching announcements:', err); setLoading(false); });
  }, []);

  return (
    <div className="container announcements-page">
      <h1 className="section-title">Announcements</h1>
      {loading ? (
        <div className="announcements-skeleton">
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton skeleton-box" />
          ))}
        </div>
      ) : announcements.length === 0 ? (
        <div className="empty-state"><p>No announcements yet.</p></div>
      ) : (
        <div className="announcements-list">
          {announcements.map((a, i) => (
            <div key={i} className="announcement-item" style={{ animationDelay: `${i * 0.08}s` }}>
              <h3>{a.committee_name}</h3>
              <p>{a.announcement_description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
