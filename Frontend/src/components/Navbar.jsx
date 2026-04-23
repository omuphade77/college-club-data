import { Link, useLocation } from 'react-router-dom';

export default function Navbar({ onToggleSidebar, sidebarOpen, isAdminDashboard }) {
  const location = useLocation();
  const adminTab = new URLSearchParams(location.search).get('tab');

  const logoTo = isAdminDashboard ? '/admin-dashboard' : '/home';

  if (isAdminDashboard) {
    return (
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-40 h-16 flex items-center">
        <div className="w-full px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link to={logoTo} className="flex items-center gap-2 font-bold text-xl text-slate-800">
              <img src="/images/logo.png" alt="" className="h-8 w-8 object-contain" />
              CommitteeHub
            </Link>
          </div>

          <ul className="hidden md:flex items-center gap-6">
            <li>
              <Link
                to="/admin-dashboard?tab=announcements-new"
                className={`text-sm font-semibold transition-colors ${adminTab === 'announcements-new' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
              >
                Announcements
              </Link>
            </li>
            <li>
              <Link
                to="/admin-dashboard?tab=events-new"
                className={`text-sm font-semibold transition-colors ${adminTab === 'events-new' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                to="/admin-dashboard?tab=roles-pending"
                className={`text-sm font-semibold transition-colors ${adminTab === 'roles-pending' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
              >
                Roles
              </Link>
            </li>
            <li>
              <Link
                to="/admin-dashboard?tab=issues"
                className={`text-sm font-semibold transition-colors ${adminTab === 'issues' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}
              >
                Issues
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-40 h-16 flex items-center">
      <div className="w-full px-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none z-50 hover:bg-slate-100 rounded p-1 transition-colors"
            onClick={onToggleSidebar}
            aria-label="Toggle menu"
            aria-expanded={sidebarOpen}
          >
            <span className={`block w-6 h-0.5 bg-slate-800 transition-transform duration-300 ${sidebarOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-slate-800 transition-opacity duration-300 ${sidebarOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-slate-800 transition-transform duration-300 ${sidebarOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
          <Link to={logoTo} className="flex items-center gap-2 font-bold text-xl text-slate-800">
            <img src="/images/logo.png" alt="Logo" className="h-8 w-8 object-contain" />
            CommitteeHub
          </Link>
        </div>

        <ul className="hidden md:flex items-center gap-6">
          <li><Link to="/home" className={`text-sm font-semibold transition-colors px-3 py-2 rounded-md ${location.pathname === '/home' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'}`}>HOME</Link></li>
          <li><Link to="/announcements" className={`text-sm font-semibold transition-colors px-3 py-2 rounded-md ${location.pathname === '/announcements' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'}`}>ANNOUNCEMENTS</Link></li>
          <li><Link to="/events" className={`text-sm font-semibold transition-colors px-3 py-2 rounded-md ${location.pathname === '/events' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'}`}>EVENTS</Link></li>
          <li><Link to="/match" className={`text-sm font-semibold transition-colors px-3 py-2 rounded-md ${location.pathname === '/match' ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'}`}>YOUR MATCH</Link></li>
        </ul>
      </div>
    </nav>
  );
}
