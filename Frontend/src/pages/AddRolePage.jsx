import { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { supabase } from '../supabase';
import { ChevronDown, BadgePlus } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-12">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <BadgePlus size={32} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Committee Membership</p>
            <h1 className="text-3xl font-extrabold text-slate-800">Add Your Role</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 pl-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. John Doe" 
                  required
                  value={formData.name} 
                  onChange={(e) => handleChange('name', e.target.value)} 
                  className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 pl-1">Mobile Number</label>
                <input 
                  type="text" 
                  placeholder="e.g. 9876543210" 
                  required
                  value={formData.mobile} 
                  onChange={(e) => handleChange('mobile', e.target.value)} 
                  className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1 pl-1">Email Address</label>
              <input 
                type="email" 
                placeholder="yourname@vjti.ac.in" 
                required
                value={formData.email} 
                onChange={(e) => handleChange('email', e.target.value)} 
                className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 pl-1">Branch</label>
                <select 
                  required 
                  value={formData.branch} 
                  onChange={(e) => handleChange('branch', e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors cursor-pointer"
                >
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
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 pl-1">Year</label>
                <select 
                  required 
                  value={formData.year} 
                  onChange={(e) => handleChange('year', e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors cursor-pointer"
                >
                  <option value="">Select Year</option>
                  <option value="1st">1st Year</option>
                  <option value="2nd">2nd Year</option>
                  <option value="3rd">3rd Year</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 pl-1">Committee</label>
                <select 
                  required 
                  value={formData.committee_name} 
                  onChange={(e) => handleChange('committee_name', e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors cursor-pointer"
                >
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
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 pl-1">Role</label>
                <select 
                  required 
                  value={formData.role} 
                  onChange={(e) => handleChange('role', e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors cursor-pointer"
                >
                  <option value="">Select Role</option>
                  <option value="Department Head">Department Head</option>
                  <option value="Secretary">Secretary</option>
                  <option value="Treasurer">Treasurer</option>
                  <option value="Department Coordinator">Department Coordinator</option>
                </select>
              </div>
            </div>

            {/* Skills multi-select dropdown */}
            <div className="relative">
              <label className="block text-sm font-semibold text-slate-700 mb-1 pl-1">Skills</label>
              <div
                className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-xl p-3 cursor-pointer flex justify-between items-center transition-colors hover:border-blue-300"
                onClick={() => setIsSkillsOpen(!isSkillsOpen)}
              >
                <span className={`truncate mr-4 ${skills.length === 0 ? 'text-slate-400' : 'text-slate-800'}`}>
                  {skills.length > 0 ? skills.join(', ') : 'Select Skills'}
                </span>
                <ChevronDown size={18} className={`text-slate-400 transition-transform ${isSkillsOpen ? 'rotate-180' : ''}`} />
              </div>
              
              {isSkillsOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto py-1">
                  {skillOptions.map((skill, index) => (
                    <label key={index} className="flex items-center gap-3 px-4 py-2 hover:bg-slate-50 cursor-pointer text-slate-700 text-sm">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
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

            {/* Profile image upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1 pl-1">Profile Image</label>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            <button 
              type="submit" 
              className="w-full text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 font-bold rounded-xl text-lg px-5 py-4 mt-6 text-center transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex justify-center items-center gap-2" 
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  Submitting...
                </>
              ) : (
                'Submit Request'
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link to="/home" className="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition-colors inline-flex items-center gap-2">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
