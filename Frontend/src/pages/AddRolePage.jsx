import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { supabase } from '../supabase';
import './AddRolePage.css';

export default function AddRolePage() {
  const [formData, setFormData] = useState({
    name: '', mobile: '', email: '', branch: '',
    role: '', committee_name: '', year: '',
  });

  const [skills, setSkills] = useState([]);
  const [image, setImage] = useState(null);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const skillOptions = [
    'Arts & Creativity',
    'Sports & Fitness',
    'Academic Excellence',
    'Technology',
    'Event Planning',
    'Social Media',
    'Environment',
    'Finance & Budget',
    'Writing',
    'Performance',
    'Photography',
  ];

  const uploadImage = async (file) => {
    if (!file) return null;
    const fileName = Date.now() + '-' + file.name;
    const { error } = await supabase.storage
      .from('profile-images')
      .upload(fileName, file);
    if (error) {
      alert('Image upload failed: ' + error.message);
      return null;
    }
    const { data } = supabase.storage
      .from('profile-images')
      .getPublicUrl(fileName);
    return data.publicUrl;
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const profile_image = await uploadImage(image);

      const payload = {
        ...formData,
        skills,
        profile_image,
      };

      const res = await api.requestRole(payload);
      if (res.ok) {
        alert('Request submitted successfully!');
        setFormData({ name: '', mobile: '', email: '', branch: '', role: '', committee_name: '', year: '' });
        setSkills([]);
        setImage(null);
      } else {
        alert('Failed to submit request');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server');
    } finally {
      setUploading(false);
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
            <option value="Swachh VJTI">Swachh VJTI</option>
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

          {/* ── Skills multi-select dropdown ── */}
          <div className="role-skills-dropdown">
            <div
              className="role-dropdown-header"
              onClick={() => setIsSkillsOpen(!isSkillsOpen)}
            >
              {skills.length > 0 ? skills.join(', ') : 'Select Skills'}
            </div>
            {isSkillsOpen && (
              <div className="role-dropdown-list">
                {skillOptions.map((skill, index) => (
                  <label key={index} className="role-dropdown-item">
                    <input
                      type="checkbox"
                      value={skill}
                      checked={skills.includes(skill)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSkills([...skills, skill]);
                        } else {
                          setSkills(skills.filter((s) => s !== skill));
                        }
                      }}
                    />
                    {skill}
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* ── Profile image upload ── */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button type="submit" className="role-submit-btn" disabled={uploading}>
            {uploading ? 'Uploading...' : 'Submit Request'}
          </button>
        </form>

        <Link to="/home" className="role-back-link">← Back to Home</Link>
      </div>
    </div>
  );
}
