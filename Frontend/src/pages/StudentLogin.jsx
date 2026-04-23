import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  GraduationCap,
  AlertTriangle,
} from "lucide-react";

const API_BASE = "https://college-club-data.onrender.com/api";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.endsWith("vjti.ac.in")) {
      setError("Only VJTI email addresses (vjti.ac.in) are allowed.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/auth/login`, {
        email,
        password,
      });

      if (!res.data.token) {
        setError("Login failed: No token received");
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user || {}));

      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="absolute inset-0 w-full h-full bg-[url('/images/quad.webp')] bg-cover bg-center bg-fixed"></div>
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      
      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden relative z-20">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <GraduationCap size={32} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Student Portal</p>
            <h1 className="text-3xl font-extrabold text-slate-800">Welcome Back</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-start gap-3 text-sm">
              <AlertTriangle size={18} className="shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input
                type="email"
                className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-base rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-4 transition-colors outline-none"
                placeholder="yourname@vjti.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <input
                type="password"
                className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-base rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-4 transition-colors outline-none"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="w-full text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 font-bold rounded-xl text-lg px-5 py-4 text-center transition-all shadow-md hover:shadow-lg disabled:opacity-70"
              disabled={loading}
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center text-slate-500">
            <p>
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 font-semibold hover:text-blue-800 hover:underline transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
