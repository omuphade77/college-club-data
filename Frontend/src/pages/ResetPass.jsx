import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { KeyRound, Check, AlertTriangle, Lock, EyeOff, Eye, X } from "lucide-react";
import "./ResetPass.css";

const API_BASE = "https://college-club-data.onrender.com/api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(false);

    if (password.length < 6) {
      return setMessage("Password must be at least 6 characters.");
    }

    if (password !== confirmPassword) {
      return setMessage("Passwords do not match.");
    }

    try {
      setLoading(true);

      await axios.post(`${API_BASE}/auth/reset-password/${token}`, {
        newPassword: password,
      });

      setIsSuccess(true);
      setMessage("Password updated successfully!");

      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setMessage(
        err.response?.data?.error || "Invalid or expired reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  // Password strength indicator
  const getStrength = () => {
    if (!password) return { level: 0, text: "", color: "" };
    if (password.length < 6) return { level: 1, text: "Weak", color: "#ff5252" };
    if (password.length < 10) return { level: 2, text: "Fair", color: "#FEE140" };
    if (/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password))
      return { level: 4, text: "Strong", color: "#52ffab" };
    return { level: 3, text: "Good", color: "#4FACFE" };
  };

  const strength = getStrength();

  return (
    <div className="reset-page">
      <div className="reset-container">
        {/* Decorative orbs */}
        <div className="reset-orb reset-orb-1"></div>
        <div className="reset-orb reset-orb-2"></div>

        <div className="reset-header">
          <div className="reset-icon">
            <KeyRound size={28}/>
          </div>
          <p className="reset-eyebrow">Secure Reset</p>
          <h1>New Password</h1>
          <div className="reset-divider"></div>
          <p className="reset-subtitle">
            Create a strong new password for your account. Make it at least 6 characters long.
          </p>
        </div>

        {message && (
          <div className={`reset-alert ${isSuccess ? "reset-alert-success" : "reset-alert-error"}`}>
            <span>{isSuccess ? <Check size={16}/> : <AlertTriangle size={16}/>}</span> {message}
          </div>
        )}

        {isSuccess && (
          <div className="reset-redirect-notice">
            <span className="reset-redirect-spinner"></span>
            Redirecting to login...
          </div>
        )}

        {!isSuccess && (
          <form className="reset-form" onSubmit={handleReset}>
            <div className="reset-field">
              <label className="reset-label" htmlFor="reset-password">
                New Password
              </label>
              <div className="reset-input-wrapper">
                <input
                  id="reset-password"
                  type={showPassword ? "text" : "password"}
                  className="reset-input"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
                <span className="reset-input-icon"><Lock size={18} /></span>
                <button
                  type="button"
                  className="reset-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>

              {/* Strength bar */}
              {password && (
                <div className="reset-strength">
                  <div className="reset-strength-bar">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="reset-strength-segment"
                        style={{
                          background: i <= strength.level ? strength.color : "rgba(255,255,255,0.06)",
                        }}
                      />
                    ))}
                  </div>
                  <span className="reset-strength-text" style={{ color: strength.color }}>
                    {strength.text}
                  </span>
                </div>
              )}
            </div>

            <div className="reset-field">
              <label className="reset-label" htmlFor="reset-confirm">
                Confirm Password
              </label>
              <div className="reset-input-wrapper">
                <input
                  id="reset-confirm"
                  type={showConfirm ? "text" : "password"}
                  className="reset-input"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
                <span className="reset-input-icon"><Lock size={18} /></span>
                <button
                  type="button"
                  className="reset-toggle-btn"
                  onClick={() => setShowConfirm(!showConfirm)}
                  tabIndex={-1}
                  aria-label="Toggle confirm password visibility"
                >
                  {showConfirm ? <EyeOff size={16}/> : <Eye size={16}/>}
                </button>
              </div>

              {confirmPassword && (
                <div className="reset-match-indicator">
                  {password === confirmPassword ? (
                    <span className="reset-match-yes"><Check size={14}/> Passwords match</span>
                  ) : (
                    <span className="reset-match-no"><X size={14}/> Passwords don&apos;t match</span>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="reset-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="reset-btn-loading">
                  <span className="reset-spinner"></span>
                  Updating...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        )}

        <div className="reset-footer">
          <p>
            <Link to="/login">← Back to Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}