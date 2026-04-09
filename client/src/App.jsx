import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import IssueModal from './components/IssueModal';

import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import MatchPage from './pages/MatchPage';
import CommitteePage from './pages/CommitteePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AddRolePage from './pages/AddRolePage';
import ConnectPage from './pages/ConnectPage';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const location = useLocation();

  // Pages that should NOT show navbar/sidebar
  const hideNavPages = ['/admin-login'];
  const showNav = !hideNavPages.includes(location.pathname);

  return (
    <>
      {showNav && (
        <Navbar
          onToggleSidebar={() => setSidebarOpen(prev => !prev)}
          sidebarOpen={sidebarOpen}
        />
      )}

      {showNav && (
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onOpenIssue={() => setIssueModalOpen(true)}
        />
      )}

      <IssueModal
        isOpen={issueModalOpen}
        onClose={() => setIssueModalOpen(false)}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/match" element={<MatchPage />} />
        <Route path="/committee" element={<CommitteePage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/add-role" element={<AddRolePage />} />
        <Route path="/connect" element={<ConnectPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
