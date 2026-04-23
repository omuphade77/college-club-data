import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { ShieldAlert, Lock, AlertTriangle } from 'lucide-react';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.adminLogin(password);
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        alert('Login successful! Redirecting to admin dashboard...');
        navigate('/admin-dashboard');
      } else {
        alert(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 w-full h-full bg-[url('/images/quad.webp')] bg-cover bg-center bg-fixed"></div>
      <div className="absolute inset-0 bg-slate-900/80 z-10"></div>
      
      <Link to="/" className="absolute top-8 left-8 text-slate-400 hover:text-white transition-colors font-medium z-30">← Back</Link>

      <div className="max-w-md w-full bg-slate-800/90 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-700/50 overflow-hidden relative z-20">
        {/* Glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-red-500/20 blur-3xl rounded-full pointer-events-none"></div>

        <div className="p-10 relative z-10">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-20 h-20 bg-slate-900/80 rounded-full flex items-center justify-center border border-red-500/30 mb-6 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
              <ShieldAlert size={40} className="text-red-500" />
            </div>
            <p className="text-red-400 text-sm font-bold tracking-[0.2em] uppercase mb-2">Restricted Access</p>
            <h1 className="text-4xl font-black text-white leading-tight">Admin<br />Portal</h1>
            <div className="w-16 h-1.5 bg-red-500 rounded-full my-6"></div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-[280px]">
              This area is reserved for authorized administrators only.<br />
              Unauthorized access attempts are logged.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Secret Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock size={18} className="text-slate-500" />
                </div>
                <input
                  type="password"
                  className="w-full bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 text-base rounded-xl focus:ring-2 focus:ring-red-500 focus:border-red-500 block w-full pl-11 p-4 transition-colors outline-none shadow-inner"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              className="w-full text-white bg-red-600 hover:bg-red-700 font-bold rounded-xl text-lg px-5 py-4 text-center transition-all shadow-lg hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
            >
              Authenticate
            </button>
          </form>

          <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-xs text-red-400 leading-relaxed flex items-start gap-2">
              <AlertTriangle size={16} className="shrink-0 mt-0.5" />
              <span><strong>Warning:</strong> This portal is for authorized personnel only. All login attempts are monitored and recorded.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
