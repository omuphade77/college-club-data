import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./StudentRegister.css";

const API_BASE = "https://college-club-data.onrender.com/api";


export default function StudentRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Password strength calculator
  const getPasswordStrength = (pass) => {
    if (!pass) return { level: 0, label: "" };
    let score = 0;
    if (pass.length >= 6) score++;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 2) return { level: 1, label: "Weak", class: "weak" };
    if (score <= 3) return { level: 2, label: "Medium", class: "medium" };
    return { level: 3, label: "Strong", class: "strong" };
  };

  const strength = getPasswordStrength(password);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.endsWith("vjti.ac.in")) {
      setError("Only VJTI email addresses (vjti.ac.in) are allowed.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API_BASE}/auth/register`, {
        email,
        password,
      });

      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="student-register-page">


      <div className="student-register-container">
        <div className="student-register-header">
          <div className="student-register-icon">✨</div>
          <p className="student-register-eyebrow">Join CommitteHub</p>
          <h1>Create Account</h1>
          <div className="student-register-divider"></div>
          <p className="student-register-subtitle">
            Register with your VJTI email to join clubs, participate in events, and connect with peers.
          </p>
        </div>

        {error && (
          <div className="student-register-error">
            <span>⚠</span> {error}
          </div>
        )}

        {success && (
          <div className="student-register-success">
            <span>✓</span> {success}
          </div>
        )}

        <form className="student-register-form" onSubmit={handleRegister}>
          <div className="student-register-field">
            <label className="student-register-label" htmlFor="register-name">Full Name</label>
            <div className="student-register-input-wrapper">
              <input
                id="register-name"
                type="text"
                className="student-register-input"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
              <span className="student-register-input-icon">👤</span>
            </div>
          </div>

          <div className="student-register-field">
            <label className="student-register-label" htmlFor="register-email">Email Address</label>
            <div className="student-register-input-wrapper">
              <input
                id="register-email"
                type="email"
                className="student-register-input"
                placeholder="yourname@vjti.ac.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              <span className="student-register-input-icon">✉</span>
            </div>
          </div>

          <div className="student-register-field">
            <label className="student-register-label" htmlFor="register-password">Password</label>
            <div className="student-register-input-wrapper">
              <input
                id="register-password"
                type="password"
                className="student-register-input"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <span className="student-register-input-icon">🔒</span>
            </div>
            {password && (
              <>
                <div className="password-strength">
                  {[1, 2, 3].map((bar) => (
                    <div
                      key={bar}
                      className={`password-strength-bar ${bar <= strength.level ? `active ${strength.class}` : ""}`}
                    />
                  ))}
                </div>
                <p className={`password-strength-text ${strength.class}`}>
                  {strength.label}
                </p>
              </>
            )}
          </div>

          <div className="student-register-field">
            <label className="student-register-label" htmlFor="register-confirm">Confirm Password</label>
            <div className="student-register-input-wrapper">
              <input
                id="register-confirm"
                type="password"
                className="student-register-input"
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
              <span className="student-register-input-icon">🔐</span>
            </div>
          </div>

          <button
            type="submit"
            className="student-register-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="student-register-btn-loading">
                <span className="student-register-spinner"></span>
                Creating Account...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="student-register-footer">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
          <div className="vjti-register-badge">
            <span>🏛</span> VJTI Students Only
          </div>
        </div>
      </div>
    </div>
  );
}