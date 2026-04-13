import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentLogin.css";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // ✅ VJTI email check
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
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email,
        password,
      });

      // 🎟️ Store token
      localStorage.setItem("token", res.data.token);

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
          <div className="student-login-icon">🎓</div>
          <p className="student-login-eyebrow">Student Portal</p>
          <h1>Welcome Back</h1>
          <div className="student-login-divider"></div>
          <p className="student-login-subtitle">
            Sign in with your VJTI credentials to access club events, announcements, and more.
          </p>
        </div>

        {error && (
          <div className="student-login-error">
            <span>⚠</span> {error}
          </div>
        )}

        <form className="student-login-form" onSubmit={handleLogin}>
          <div className="student-form-field">
            <label className="student-form-label" htmlFor="login-email">Email Address</label>
            <div className="student-form-input-wrapper">
              <input
                id="login-email"
                type="email"
                className="student-form-input"
                placeholder="yourname@vjti.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              <span className="student-form-input-icon">✉</span>
            </div>
          </div>

          <div className="student-form-field">
            <label className="student-form-label" htmlFor="login-password">Password</label>
            <div className="student-form-input-wrapper">
              <input
                id="login-password"
                type="password"
                className="student-form-input"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
              <span className="student-form-input-icon">🔒</span>
            </div>
          </div>

          <button
            type="submit"
            className="student-login-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="student-btn-loading">
                <span className="student-spinner"></span>
                Signing In...
              </span>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="student-login-footer">
          <p>Don&apos;t have an account? <Link to="/register">Create one</Link></p>
          <div className="vjti-badge">
            <span>🏛</span> VJTI Students Only
          </div>
        </div>
      </div>
    </div>
  );
}