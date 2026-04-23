
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { supabase } from "../supabase";
import { Sparkles, AlertTriangle, Check, User, Mail, Lock, Building2 } from "lucide-react";
import "./StudentRegister.css";

const API_BASE = "https://college-club-data.onrender.com/api";

export default function StudentRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [skills, setSkills] = useState("");
  const [image, setImage] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔹 Upload image
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
        skills,
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
    <div className="student-register-page">
      <div className="student-register-container">

        <div className="student-register-header">
          <div className="student-register-icon"><Sparkles size={40} /></div>
          <h1>Create Account</h1>
        </div>

        {error && <div className="student-register-error">{error}</div>}
        {success && <div className="student-register-success">{success}</div>}

        <form onSubmit={handleRegister}>

          <input placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} />

          <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />

          <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />

          <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />

          <input placeholder="Skills" value={skills} onChange={(e)=>setSkills(e.target.value)} />

          <input type="file" onChange={(e)=>setImage(e.target.files[0])} />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <div>
          Already have an account? <Link to="/login">Login</Link>
        </div>

      </div>
    </div>
  );
}

