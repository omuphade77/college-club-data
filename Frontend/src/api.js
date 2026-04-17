const API_BASE = import.meta.env.VITE_API_BASE;
// Helper: get student auth headers
const studentHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Helper: get admin auth headers
const adminHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Committees (student-protected)
  getCommittee: (name) =>
    fetch(`${API_BASE}/committees/${name}`, {
      headers: studentHeaders(),
    }).then(r => r.json()),

  // Members (student-protected)
  getMembers: () =>
    fetch(`${API_BASE}/roles/members`, {
      headers: studentHeaders(),
    }).then(r => r.json()),

  // Events (student-protected)
  getEvents: () =>
    fetch(`${API_BASE}/events/getevents`, {
      headers: studentHeaders(),
    }).then(r => r.json()),

  // Announcements (student-protected)
  getAnnouncements: () =>
    fetch(`${API_BASE}/announcements/getannouncements`, {
      headers: studentHeaders(),
    }).then(r => r.json()),

  // Issues (student-protected for create, public for getAll)
  createIssue: (title, description, committee_name) =>
    fetch(`${API_BASE}/issues/create`, {
      method: 'POST',
      headers: studentHeaders(),
      body: JSON.stringify({ title, description, committee_name }),
    }).then(r => r.json()),

  getAllIssues: () => fetch(`${API_BASE}/issues/all`).then(r => r.json()),

  // Admin login (public)
  adminLogin: (password) =>
    fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    }),

  // Announcements (admin-protected)
  addAnnouncement: (data) =>
    fetch(`${API_BASE}/announcements/addnewannouncement`, {
      method: 'POST',
      headers: adminHeaders(),
      body: JSON.stringify(data),
    }).then(r => r.json()),

  // Events (admin-protected)
  addEvent: (data) =>
    fetch(`${API_BASE}/events/newevent`, {
      method: 'POST',
      headers: adminHeaders(),
      body: JSON.stringify(data),
    }).then(r => r.json()),

  // Roles (student-protected for request)
  requestRole: (data) =>
    fetch(`${API_BASE}/roles/request`, {
      method: 'POST',
      headers: studentHeaders(),
      body: JSON.stringify(data),
    }),

  // Roles (admin-protected)
  getPendingRoles: () =>
    fetch(`${API_BASE}/roles/pending`, {
      headers: adminHeaders(),
    }).then(r => r.json()),

  approveRole: (id) =>
    fetch(`${API_BASE}/roles/approve/${id}`, {
      method: 'POST',
      headers: adminHeaders(),
    }),

  rejectRole: (id) =>
    fetch(`${API_BASE}/roles/reject/${id}`, {
      method: 'POST',
      headers: adminHeaders(),
    }),
};
