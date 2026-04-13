import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import './AddRolePage.css';

export default function AddRolePage() {
  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '', branch: '',
    role: '', committee_name: '', year: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.requestRole(formData);
      if (res.ok) {
        alert('Request submitted successfully!');
        setFormData({ name: '', mobile: '', email: '', branch: '', role: '', committee_name: '', year: '' });
      } else {
        alert('Failed to submit request');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    }
  };

  return (
    <div className="role-page">
      <div className="role-form-container">
        <h1>Add Your Role</h1>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" required
            value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />

          <input type="text" placeholder="Mobile Number" required
            value={formData.mobile} onChange={(e) => handleChange('mobile', e.target.value)} />

          <input type="email" placeholder="Email" required
            value={formData.email} onChange={(e) => handleChange('email', e.target.value)} />

          <select required value={formData.branch} onChange={(e) => handleChange('branch', e.target.value)}>
            <option value="">Select Branch</option>
            <option value="CS">CS</option>
            <option value="IT">IT</option>
            <option value="EXTC">EXTC</option>
            <option value="Electronics">Electronics</option>
            <option value="Electrical">Electrical</option>
            <option value="Mechanical">Mechanical</option>
            <option value="Civil">Civil</option>
            <option value="Textile">Textile</option>
            <option value="Production">Production</option>
          </select>

          <select required value={formData.role} onChange={(e) => handleChange('role', e.target.value)}>
            <option value="">Select Role</option>
            <option value="Department Head">Department Head</option>
            <option value="Secretary">Secretary</option>
            <option value="Treasurer">Treasurer</option>
            <option value="Department Coordinator">Department Coordinator</option>
          </select>

          <select required value={formData.committee_name} onChange={(e) => handleChange('committee_name', e.target.value)}>
            <option value="">Select Committee</option>
            <option value="Technovanza">Technovanza</option>
            <option value="Digital VJTI">Digital VJTI</option>
            <option value="Enthusia">Enthusia</option>
            <option value="DLA">DLA</option>
            <option value="COC (Community of Coders)">COC (Community of Coders)</option>
            <option value="Swacch VJTI">Swacch VJTI</option>
            <option value="Pratibimb">Pratibimb</option>
            <option value="Rangwardhan">Rangwardhan</option>
            <option value="E-Cell VJTI">E-Cell VJTI</option>
          </select>

          <select required value={formData.year} onChange={(e) => handleChange('year', e.target.value)}>
            <option value="">Select Year</option>
            <option value="1st">1st Year</option>
            <option value="2nd">2nd Year</option>
            <option value="3rd">3rd Year</option>
          </select>

          <button type="submit" className="role-submit-btn">Submit Request</button>
        </form>

        <Link to="/" className="role-back-link">← Back to Home</Link>
      </div>
    </div>
  );
}
