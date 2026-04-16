import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import IssueModal from './components/IssueModal';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import EventsPage from './pages/EventsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import MatchPage from './pages/MatchPage';
import CommitteePage from './pages/CommitteePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AddRolePage from './pages/AddRolePage';
import ConnectPage from './pages/ConnectPage';
import StudentLogin from './pages/StudentLogin';
import StudentRegister from './pages/StudentRegister';
import ResetPassword from './pages/ResetPass';
import ForgotPassword from './pages/ForgotPassword';

function AppContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const location = useLocation();

  // Pages that should NOT show navbar/sidebar
  const hideNavPages = ['/admin-login', '/login', '/register', '/', '/forgot-password'];
  const showNav = !hideNavPages.includes(location.pathname) && !location.pathname.startsWith('/reset-password');

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
        {/* Public routes */}
        <Route path="/" element={<StudentLogin />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/register" element={<StudentRegister />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />

        {/* Protected student routes */}
        <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path="/events" element={<ProtectedRoute><EventsPage /></ProtectedRoute>} />
        <Route path="/announcements" element={<ProtectedRoute><AnnouncementsPage /></ProtectedRoute>} />
        <Route path="/match" element={<ProtectedRoute><MatchPage /></ProtectedRoute>} />
        <Route path="/committee" element={<ProtectedRoute><CommitteePage /></ProtectedRoute>} />
        <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
        <Route path="/add-role" element={<ProtectedRoute><AddRolePage /></ProtectedRoute>} />
        <Route path="/connect" element={<ProtectedRoute><ConnectPage /></ProtectedRoute>} />
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
