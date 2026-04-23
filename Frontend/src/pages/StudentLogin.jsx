import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGraduationCap, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import "./StudentLogin.css";

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

      // ✅ Check token exists
      if (!res.data.token) {
        setError("Login failed: No token received");
        return;
      }

      // 🎟️ Store token
      localStorage.setItem("token", res.data.token);

      // 👤 Store user (IMPORTANT for future use)
      localStorage.setItem("user", JSON.stringify(res.data.user || {}));

      // 🚀 Redirect
      navigate("/home");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-login-page">
      <div className="student-login-container">
        <div className="student-login-header">
          <div className="student-login-icon">
            <FontAwesomeIcon icon={faGraduationCap} size="2x" className="student-icon" />
          </div>
          <p className="student-login-eyebrow">Student Portal</p>
          <h1>Welcome Back</h1>
          <div className="student-login-divider"></div>
        </div>

        {error && (
          <div className="student-login-error">
            <span>
              <FontAwesomeIcon icon={faExclamationTriangle} />
            </span>{" "}
            {error}
          </div>
        )}

        <form className="student-login-form" onSubmit={handleLogin}>
          <input
            type="email"
            className="student-form-input"
            placeholder="yourname@vjti.ac.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="student-form-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="admin-login-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="student-login-footer">
          <p>
            Don't have an account? <Link to="/register">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
