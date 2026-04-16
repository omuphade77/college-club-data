import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./ForgotPassword.css";

const API_BASE = "https://college-club-data.onrender.com/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    if (!email.endsWith("vjti.ac.in")) {
      setMessage("Only VJTI email addresses are allowed.");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_BASE}/auth/forgot-password`, {
        email,
      });

      setIsSuccess(true);
      setMessage(
        res.data?.message || "Reset link has been generated! Check server console."
      );
    } catch (err) {
      setMessage(
        err.response?.data?.error || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-page">
      <div className="forgot-container">
        {/* Decorative floating orbs */}
        <div className="forgot-orb forgot-orb-1"></div>
        <div className="forgot-orb forgot-orb-2"></div>

        <div className="forgot-header">
          <div className="forgot-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
            </svg>
          </div>
          <p className="forgot-eyebrow">Account Recovery</p>
          <h1>Forgot Password?</h1>
          <div className="forgot-divider"></div>
          <p className="forgot-subtitle">
            Enter your VJTI email address and we&apos;ll send you a link to reset your password.
          </p>
        </div>

        {message && (
          <div className={`forgot-alert ${isSuccess ? "forgot-alert-success" : "forgot-alert-error"}`}>
            <span>{isSuccess ? "✓" : "⚠"}</span> {message}
          </div>
        )}

        {!isSuccess && (
          <form className="forgot-form" onSubmit={handleSubmit}>
            <div className="forgot-field">
              <label className="forgot-label" htmlFor="forgot-email">
                Email Address
              </label>
              <div className="forgot-input-wrapper">
                <input
                  id="forgot-email"
                  type="email"
                  className="forgot-input"
                  placeholder="yourname@vjti.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
                <span className="forgot-input-icon">✉</span>
              </div>
            </div>

            <button
              type="submit"
              className="forgot-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="forgot-btn-loading">
                  <span className="forgot-spinner"></span>
                  Sending...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </button>
          </form>
        )}

        <div className="forgot-footer">
          <p>
            Remember your password?{" "}
            <Link to="/login">Sign In</Link>
          </p>
          <div className="forgot-badge">
            <span>🏛</span> VJTI Students Only
          </div>
        </div>
      </div>
    </div>
  );
}
