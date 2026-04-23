import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { supabase } from "../supabase";
import { Sparkles, AlertTriangle, CheckCircle2, ChevronDown } from "lucide-react";

const API_BASE = "https://college-club-data.onrender.com/api";

export default function StudentRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [skills, setSkills] = useState([]);
  const [image, setImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const skillOptions = [
    "Arts & Creativity",
    "Sports & Fitness",
    "Academic Excellence",
    "Technology",
    "Event Planning",
    "Social Media",
    "Environment",
    "Finance & Budget",
    "Writing",
    "Performance",
    "Photography"
  ];

  const uploadImage = async (file) => {
    if (!file) return null;

    const fileName = Date.now() + "-" + file.name;

    const { error } = await supabase.storage
      .from("profile-images")
      .upload(fileName, file);

    if (error) {
      setError("Image upload failed");
      return null;
    }

    const { data } = supabase.storage
      .from("profile-images")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.endsWith("vjti.ac.in")) {
      setError("Only VJTI email allowed");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const imageUrl = await uploadImage(image);

      await axios.post(`${API_BASE}/auth/signup`, {
        full_name: name,
        email,
        password,
        skills: skills,
        profile_image: imageUrl,
      });

      setSuccess("Account created! Redirecting...");
      setTimeout(() => navigate("/login"), 1500);

    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 py-12 relative">
      <div className="absolute inset-0 w-full h-full bg-[url('/images/quad.webp')] bg-cover bg-center bg-fixed"></div>
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden relative z-20">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <Sparkles size={32} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Student Portal</p>
            <h1 className="text-3xl font-extrabold text-slate-800">Create Account</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-start gap-3 text-sm">
              <AlertTriangle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-start gap-3 text-sm">
              <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <input
                className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-base rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3.5 transition-colors outline-none"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="email"
                className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-base rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3.5 transition-colors outline-none"
                placeholder="Email (yourname@vjti.ac.in)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="password"
                className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-base rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3.5 transition-colors outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="password"
                className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-base rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3.5 transition-colors outline-none"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            {/* Custom Multi Select Dropdown */}
            <div className="relative">
              <div
                className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-base rounded-xl p-3.5 cursor-pointer flex justify-between items-center transition-colors hover:border-blue-300"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className={`truncate mr-4 ${skills.length === 0 ? 'text-slate-400' : 'text-slate-800'}`}>
                  {skills.length > 0 ? skills.join(", ") : "Select Skills"}
                </span>
                <ChevronDown size={18} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>

              {isOpen && (
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

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1 ml-1">Profile Picture (Optional)</label>
              <input
                type="file"
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
              />
            </div>

            <button 
              type="submit" 
              className="w-full text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 font-bold rounded-xl text-lg px-5 py-4 mt-4 text-center transition-all shadow-md hover:shadow-lg disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <div className="mt-8 text-center text-slate-500">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition-colors">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}