import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api';
import { ShieldAlert, Lock, AlertTriangle } from 'lucide-react';
import './AdminLoginPage.css';

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
    <div className="admin-login-page">
      <Link to="/home" className="back-link">← Back</Link>

      <div className="admin-box">
        <span className="shield-icon"><ShieldAlert size={48} className="admin-danger-icon" /></span>
        <p className="eyebrow">Restricted Access</p>
        <h1>Admin<br />Portal</h1>
        <div className="admin-divider"></div>
        <p className="subtitle">
          This area is reserved for authorized administrators only.<br />
          Unauthorized access attempts are logged.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <div>
              <label className="input-label">Secret Password</label>
              <div className="admin-input-wrapper">
                <Lock size={18} className="admin-input-icon" />
                <input
                  type="password"
                  className="admin-input"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit" className="admin-login-btn">Authenticate</button>
          </div>
        </form>

        <div className="warning-box">
          <strong><AlertTriangle size={16} /> Warning:</strong> This portal is for authorized personnel only. All login attempts are monitored and recorded.
        </div>
      </div>
    </div>
  );
}
