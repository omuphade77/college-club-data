import { useState, useEffect } from 'react';
import { api } from '../api';
import './AdminDashboardPage.css';

const committeeOptions = [
  'Technovanza', 'Rangwardhan', 'Enthusia', 'Swachh VJTI',
  'Digital vjti', 'Pratibimb', 'Ecell', 'Community of coders',
  'Digital Literary Activities',
];

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
      <h2>Make Announcement</h2>
      <select value={committee} onChange={(e) => setCommittee(e.target.value)}>
        {committeeOptions.map(c => <option key={c}>{c}</option>)}
      </select>
      <textarea placeholder="Write announcement..." value={text} onChange={(e) => setText(e.target.value)} />
      <button className="admin-submit-btn" onClick={handlePost}>Post</button>
    </div>
  );
}

function IssuesTab() {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    api.getAllIssues()
      .then(data => setIssues(data))
      .catch(err => console.error('Error:', err));
  }, []);

  return (
    <div>
      <h2>Reported Issues</h2>
      {issues.length === 0 ? (
        <div className="empty-state"><p>No issues reported.</p></div>
      ) : (
        <div className="issue-list">
          {issues.map((issue, i) => (
            <div key={i} className="issue-item">
              <h3>{issue.issue_title}</h3>
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
      <h2>Create Event</h2>
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
      <button className="admin-submit-btn" onClick={handlePost}>Post Event</button>

      {preview && (
        <div className="event-preview">
          <h3>{preview.event_name}</h3>
          <p>📅 {preview.event_date} ⏰ {preview.event_time}</p>
          <p>📍 {preview.event_location}</p>
          <p>🏢 {preview.committee_name}</p>
          <p>{preview.event_description}</p>
        </div>
      )}
    </div>
  );
}

function RolesTab() {
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
      <h2>Role Approval Panel</h2>
      <h4 className="admin-pending-subtitle">Pending Requests</h4>
      {requests.length === 0 ? (
        <div className="empty-state"><p>No pending requests</p></div>
      ) : (
        <div className="requests-grid">
          {requests.map(req => (
            <div key={req.id} className="request-card">
              <h3>{req.name}</h3>
              <p><strong>Mobile:</strong> {req.mobile}</p>
              <p><strong>Email:</strong> {req.email}</p>
              <p><strong>Branch:</strong> {req.branch}</p>
              <p><strong>Role:</strong> {req.role}</p>
              <p><strong>Committee:</strong> {req.committee_name}</p>
              <p><strong>Year:</strong> {req.year}</p>
              <div className="actions">
                <button onClick={() => approve(req.id)}>✅ Approve</button>
                <button onClick={() => reject(req.id)}>❌ Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('announcement');

  const tabs = [
    { id: 'announcement', label: 'Announcement' },
    { id: 'issues', label: 'Issues' },
    { id: 'events', label: 'Events' },
    { id: 'roles', label: 'Roles' },
  ];

  return (
    <div className="admin-dashboard">
      <div className="tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {activeTab === 'announcement' && <AnnouncementTab />}
        {activeTab === 'issues' && <IssuesTab />}
        {activeTab === 'events' && <EventsTab />}
        {activeTab === 'roles' && <RolesTab />}
      </div>
    </div>
  );
}
