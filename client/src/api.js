const API_BASE = 'http://localhost:3000/api';

export const api = {
  // Committees
  getCommittee: (name) => fetch(`${API_BASE}/committees/${name}`).then(r => r.json()),

  // Members
  getMembers: () => fetch(`${API_BASE}/roles/members`).then(r => r.json()),

  // Events
  getEvents: () => fetch(`${API_BASE}/events/getevents`).then(r => r.json()),

  // Announcements
  getAnnouncements: () => fetch(`${API_BASE}/announcements/getannouncements`).then(r => r.json()),

  // Issues
  createIssue: (title, description) =>
    fetch(`${API_BASE}/issues/create`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description }),
    }).then(r => r.json()),

  getAllIssues: () => fetch(`${API_BASE}/issues/all`).then(r => r.json()),

  // Admin
  adminLogin: (password) =>
    fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    }),

  // Announcements (admin)
  addAnnouncement: (data) =>
    fetch(`${API_BASE}/announcements/addnewannouncement`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  // Events (admin)
  addEvent: (data) =>
    fetch(`${API_BASE}/events/newevent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then(r => r.json()),

  // Roles
  requestRole: (data) =>
    fetch(`${API_BASE}/roles/request`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }),

  getPendingRoles: () => fetch(`${API_BASE}/roles/pending`).then(r => r.json()),

  approveRole: (id) =>
    fetch(`${API_BASE}/roles/approve/${id}`, { method: 'POST' }),

  rejectRole: (id) =>
    fetch(`${API_BASE}/roles/reject/${id}`, { method: 'POST' }),
};
