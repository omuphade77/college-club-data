import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock, faMapMarkerAlt, faBuilding, faCheck, faTimes, faColumns } from '@fortawesome/free-solid-svg-icons';
import './AdminDashboardPage.css';

const committeeOptions = [
  'Technovanza', 'Rangwardhan', 'Enthusia', 'Swachh VJTI',
  'Digital VJTI', 'Pratibimb', 'E-Cell VJTI', 'COC (Community of Coders)',
  'DLA',
];

const VALID_TABS = new Set([
  'announcements-new',
  'events-new',
  'roles-pending',
  'issues',
]);

function WelcomePanel() {
  return (
    <div className="admin-welcome">
        <FontAwesomeIcon icon={faColumns} size="2x" />
      <h2>Admin dashboard</h2>
      <p className="admin-welcome-lead">
        Use the navigation above to post announcements, manage events, review roles, or read reported issues.
      </p>
      <p className="admin-welcome-hint">
        Open <strong>Announcements</strong>, <strong>Events</strong>, <strong>Roles</strong>, or <strong>Issues</strong> in the bar above.
      </p>
    </div>
  );
}

function AnnouncementTab() {
  const [committee, setCommittee] = useState(committeeOptions[0]);
  const [text, setText] = useState('');

  const handlePost = async () => {
    if (!text.trim()) { alert('Please enter announcement'); return; }
    try {
      await api.addAnnouncement({ announcement_description: text, committee_name: committee });
      alert('Announcement added successfully!');
      setText('');
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to add announcement');
    }
  };

  return (
    <div>
      <h2>New announcement</h2>
      <select value={committee} onChange={(e) => setCommittee(e.target.value)}>
        {committeeOptions.map(c => <option key={c}>{c}</option>)}
      </select>
      <textarea placeholder="Write announcement..." value={text} onChange={(e) => setText(e.target.value)} />
      <button type="button" className="admin-submit-btn" onClick={handlePost}>Post</button>
    </div>
  );
}

function IssuesTab() {
  const [issues, setIssues] = useState([]);
  const [selectedCommittee, setSelectedCommittee] = useState('All');

  useEffect(() => {
    api.getAllIssues()
      .then(data => setIssues(data))
      .catch(err => console.error('Error:', err));
  }, []);

  const filteredIssues = issues.filter(issue =>
    selectedCommittee === 'All'
    || issue.committee_name === selectedCommittee
    || issue.committee_name === 'General'
    || !issue.committee_name
  );

  return (
    <div>
      <div className="issues-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Reported issues</h2>
        <select
          value={selectedCommittee}
          onChange={(e) => setSelectedCommittee(e.target.value)}
          className="admin-inline-select"
        >
          <option value="All">All Committees</option>
          {committeeOptions.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      {filteredIssues.length === 0 ? (
        <div className="empty-state"><p>No issues reported.</p></div>
      ) : (
        <div className="issue-list">
          {filteredIssues.map((issue, i) => (
            <div key={i} className="issue-item">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <h3 style={{ margin: 0 }}>{issue.issue_title}</h3>
                <span className="issue-badge">
                  {issue.committee_name || 'General'}
                </span>
              </div>
              <p>{issue.issue_text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EventsTab() {
  const [eventData, setEventData] = useState({
    event_name: '', event_date: '', event_time: '',
    event_location: '', committee_name: committeeOptions[0], event_description: '',
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (field, value) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const handlePost = async () => {
    if (!eventData.event_name || !eventData.event_date || !eventData.event_time) {
      alert('Please fill required fields');
      return;
    }
    try {
      await api.addEvent(eventData);
      alert('Event added successfully!');
      setPreview({ ...eventData });
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to add event');
    }
  };

  return (
    <div>
      <h2>Create event</h2>
      <input type="text" placeholder="Event Name" value={eventData.event_name}
        onChange={(e) => handleChange('event_name', e.target.value)} />
      <input type="date" value={eventData.event_date}
        onChange={(e) => handleChange('event_date', e.target.value)} />
      <input type="time" value={eventData.event_time}
        onChange={(e) => handleChange('event_time', e.target.value)} />
      <input type="text" placeholder="Location" value={eventData.event_location}
        onChange={(e) => handleChange('event_location', e.target.value)} />
      <select value={eventData.committee_name}
        onChange={(e) => handleChange('committee_name', e.target.value)}>
        {committeeOptions.map(c => <option key={c}>{c}</option>)}
      </select>
      <textarea placeholder="Short Description" value={eventData.event_description}
        onChange={(e) => handleChange('event_description', e.target.value)} />
      <button type="button" className="admin-submit-btn" onClick={handlePost}>Post event</button>

      {preview && (
        <div className="event-preview">
          <h3>{preview.event_name}</h3>
          <p><FontAwesomeIcon icon={faCalendarAlt}/> {preview.event_date} <FontAwesomeIcon icon={faClock}/> {preview.event_time}</p>
          <p><FontAwesomeIcon icon={faMapMarkerAlt}/> {preview.event_location}</p>
          <p><FontAwesomeIcon icon={faBuilding}/> {preview.committee_name}</p>
          <p>{preview.event_description}</p>
        </div>
      )}
    </div>
  );
}

function RolesPendingTab() {
  const [requests, setRequests] = useState([]);

  const loadRequests = async () => {
    try {
      const result = await api.getPendingRoles();
      setRequests(result.data || []);
    } catch (err) {
      console.error('Error:', err);
    }
  };

  useEffect(() => { loadRequests(); }, []);

  const approve = async (id) => {
    if (!window.confirm('Approve this request?')) return;
    try {
      await api.approveRole(id);
      alert('Approved successfully');
      loadRequests();
    } catch (err) { console.error('Error:', err); }
  };

  const reject = async (id) => {
    if (!window.confirm('Reject this request?')) return;
    try {
      await api.rejectRole(id);
      alert('Rejected');
      loadRequests();
    } catch (err) { console.error('Error:', err); }
  };

  return (
    <div>
      <h2>Pending role requests</h2>
      <h4 className="admin-pending-subtitle">Awaiting approval</h4>
      {requests.length === 0 ? (
        <div className="empty-state"><p>No pending requests</p></div>
      ) : (
        <div className="requests-grid">
          {requests.map(req => (
            <div key={req.id} className="request-card">
              {/* Profile image */}
              {req.profile_image && (
                <img
                  src={req.profile_image}
                  alt={`${req.name} profile`}
                  className="req-card-avatar"
                />
              )}
              <h3>{req.name}</h3>
              <p><strong>Mobile:</strong> {req.mobile}</p>
              <p><strong>Email:</strong> {req.email}</p>
              <p><strong>Branch:</strong> {req.branch}</p>
              <p><strong>Role:</strong> {req.role}</p>
              <p><strong>Committee:</strong> {req.committee_name}</p>
              <p><strong>Year:</strong> {req.year}</p>
              {/* Skills */}
              {Array.isArray(req.skills) && req.skills.length > 0 && (
                <div className="req-card-skills">
                  <p><strong>Skills:</strong></p>
                  <div className="req-skills-tags">
                    {req.skills.map((skill, i) => (
                      <span key={i} className="req-skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}
              <div className="actions">
                <button type="button" className="approve-btn" onClick={() => approve(req.id)}><FontAwesomeIcon icon={faCheck}/> Approve</button>
                <button type="button" className="reject-btn" onClick={() => reject(req.id)}><FontAwesomeIcon icon={faTimes}/> Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('tab');

  const view = useMemo(() => {
    if (!tab || !VALID_TABS.has(tab)) return 'welcome';
    return tab;
  }, [tab]);

  return (
    <div className="admin-dashboard">
      <div className="tab-content">
        {view === 'welcome' && <WelcomePanel />}
        {view === 'announcements-new' && <AnnouncementTab />}
        {view === 'events-new' && <EventsTab />}
        {view === 'roles-pending' && <RolesPendingTab />}
        {view === 'issues' && <IssuesTab />}
      </div>
    </div>
  );
}
