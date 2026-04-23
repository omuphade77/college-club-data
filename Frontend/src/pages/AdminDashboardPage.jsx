import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api';
import { Calendar, Clock, MapPin, Building2, Check, X, LayoutDashboard } from 'lucide-react';

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
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
        <LayoutDashboard size={40} />
      </div>
      <h2 className="text-3xl font-extrabold text-slate-800 mb-4">Admin Dashboard</h2>
      <p className="text-lg text-slate-600 mb-2 max-w-lg">
        Use the navigation above to post announcements, manage events, review roles, or read reported issues.
      </p>
      <p className="text-slate-400 text-sm">
        Open <strong className="text-slate-600">Announcements</strong>, <strong className="text-slate-600">Events</strong>, <strong className="text-slate-600">Roles</strong>, or <strong className="text-slate-600">Issues</strong> in the bar above.
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
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">New Announcement</h2>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Committee</label>
          <select 
            value={committee} 
            onChange={(e) => setCommittee(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          >
            {committeeOptions.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1">Announcement Details</label>
          <textarea 
            placeholder="Write announcement..." 
            value={text} 
            onChange={(e) => setText(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors min-h-[150px] resize-y"
          />
        </div>

        <button 
          type="button" 
          onClick={handlePost}
          className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          Post Announcement
        </button>
      </div>
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
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 border-b border-gray-100 pb-6">
        <h2 className="text-2xl font-bold text-slate-800">Reported Issues</h2>
        <select
          value={selectedCommittee}
          onChange={(e) => setSelectedCommittee(e.target.value)}
          className="bg-slate-50 border border-gray-200 text-slate-800 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-medium shadow-sm"
        >
          <option value="All">All Committees</option>
          {committeeOptions.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {filteredIssues.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 rounded-xl border border-gray-100">
          <p className="text-slate-500 text-lg">No issues reported.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredIssues.map((issue, i) => (
            <div key={i} className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-400 group-hover:bg-red-500 transition-colors"></div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2 pl-2">
                <h3 className="text-lg font-bold text-slate-800 m-0">{issue.issue_title}</h3>
                <span className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1 rounded-full border border-gray-200 whitespace-nowrap">
                  {issue.committee_name || 'General'}
                </span>
              </div>
              <p className="text-slate-600 pl-2 text-sm leading-relaxed">{issue.issue_text}</p>
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-gray-100 pb-4">Create Event</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Event Name</label>
            <input 
              type="text" 
              placeholder="e.g. Annual Tech Symposium" 
              value={eventData.event_name}
              onChange={(e) => handleChange('event_name', e.target.value)} 
              className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Date</label>
              <input 
                type="date" 
                value={eventData.event_date}
                onChange={(e) => handleChange('event_date', e.target.value)} 
                className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Time</label>
              <input 
                type="time" 
                value={eventData.event_time}
                onChange={(e) => handleChange('event_time', e.target.value)} 
                className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Location</label>
            <input 
              type="text" 
              placeholder="e.g. Main Quad, VJTI" 
              value={eventData.event_location}
              onChange={(e) => handleChange('event_location', e.target.value)} 
              className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Committee</label>
            <select 
              value={eventData.committee_name}
              onChange={(e) => handleChange('committee_name', e.target.value)}
              className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
            >
              {committeeOptions.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Short Description</label>
            <textarea 
              placeholder="Describe the event..." 
              value={eventData.event_description}
              onChange={(e) => handleChange('event_description', e.target.value)} 
              className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors min-h-[100px] resize-y"
            />
          </div>

          <button 
            type="button" 
            className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg transition-all mt-4" 
            onClick={handlePost}
          >
            Post Event
          </button>
        </div>
      </div>

      <div className="bg-slate-50 p-8 rounded-2xl border border-gray-200 flex flex-col">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b border-gray-200 pb-4">Live Preview</h2>
        
        <div className="flex-grow flex items-start justify-center">
          {preview ? (
            <div className="w-full bg-white border border-gray-100 rounded-xl p-6 shadow-md animate-fadeIn">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full w-fit mb-4">
                <Building2 size={14} /> {preview.committee_name}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">{preview.event_name}</h3>
              
              <div className="space-y-3 mb-4 text-sm text-slate-600 bg-slate-50 p-4 rounded-lg">
                <p className="flex items-center gap-3"><Calendar size={16} className="text-slate-400" /> <span className="font-medium">{preview.event_date}</span></p>
                <p className="flex items-center gap-3"><Clock size={16} className="text-slate-400" /> <span className="font-medium">{preview.event_time}</span></p>
                <p className="flex items-center gap-3"><MapPin size={16} className="text-slate-400" /> <span className="font-medium">{preview.event_location}</span></p>
              </div>
              
              <p className="text-slate-700 text-sm leading-relaxed pt-2 border-t border-gray-100">
                {preview.event_description || "No description provided."}
              </p>
            </div>
          ) : (
            <div className="w-full h-full min-h-[300px] border-2 border-dashed border-gray-300 rounded-xl flex items-center justify-center text-gray-400 font-medium">
              Preview will appear here after posting
            </div>
          )}
        </div>
      </div>
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
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
      <div className="mb-8 border-b border-gray-100 pb-4 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-1">Pending Role Requests</h2>
          <h4 className="text-slate-500 font-medium">Awaiting approval from admin</h4>
        </div>
        <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
          {requests.length} Pending
        </span>
      </div>

      {requests.length === 0 ? (
        <div className="p-12 text-center bg-slate-50 rounded-xl border border-gray-100">
          <p className="text-slate-500 text-lg">No pending requests at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {requests.map(req => (
            <div key={req.id} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full relative overflow-hidden">
              {/* Header with Avatar */}
              <div className="flex items-start gap-4 mb-5">
                {req.profile_image ? (
                  <img src={req.profile_image} alt={`${req.name} profile`} className="w-16 h-16 rounded-full object-cover border border-gray-200 shadow-sm" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xl border border-blue-200 shadow-sm">
                    {req.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-slate-800 leading-tight mb-1">{req.name}</h3>
                  <p className="text-blue-600 text-xs font-bold uppercase tracking-wider">{req.role}</p>
                  <p className="text-slate-500 text-xs mt-1 bg-slate-100 inline-block px-2 py-0.5 rounded border border-gray-200">{req.committee_name}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="space-y-2 mb-6 flex-grow text-sm">
                <div className="grid grid-cols-3 gap-1 py-1 border-b border-gray-50">
                  <span className="text-slate-400 font-semibold text-xs uppercase tracking-wider col-span-1">Email</span>
                  <span className="text-slate-700 font-medium col-span-2 truncate" title={req.email}>{req.email}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 py-1 border-b border-gray-50">
                  <span className="text-slate-400 font-semibold text-xs uppercase tracking-wider col-span-1">Mobile</span>
                  <span className="text-slate-700 font-medium col-span-2">{req.mobile}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 py-1 border-b border-gray-50">
                  <span className="text-slate-400 font-semibold text-xs uppercase tracking-wider col-span-1">Branch</span>
                  <span className="text-slate-700 font-medium col-span-2">{req.branch}</span>
                </div>
                <div className="grid grid-cols-3 gap-1 py-1 border-b border-gray-50">
                  <span className="text-slate-400 font-semibold text-xs uppercase tracking-wider col-span-1">Year</span>
                  <span className="text-slate-700 font-medium col-span-2">{req.year} Year</span>
                </div>
              </div>

              {/* Skills */}
              {Array.isArray(req.skills) && req.skills.length > 0 && (
                <div className="mb-6 bg-slate-50 p-3 rounded-lg border border-gray-100">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Skills</p>
                  <div className="flex flex-wrap gap-1.5">
                    {req.skills.map((skill, i) => (
                      <span key={i} className="bg-white border border-gray-200 text-slate-600 text-xs px-2 py-1 rounded shadow-sm">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  className="flex-1 flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 font-bold py-2 px-3 rounded-lg transition-colors"
                  onClick={() => approve(req.id)}
                >
                  <Check size={16}/> Approve
                </button>
                <button 
                  type="button" 
                  className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 font-bold py-2 px-3 rounded-lg transition-colors"
                  onClick={() => reject(req.id)}
                >
                  <X size={16}/> Reject
                </button>
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
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="w-full animate-fadeIn">
        {view === 'welcome' && <WelcomePanel />}
        {view === 'announcements-new' && <AnnouncementTab />}
        {view === 'events-new' && <EventsTab />}
        {view === 'roles-pending' && <RolesPendingTab />}
        {view === 'issues' && <IssuesTab />}
      </div>
    </div>
  );
}
