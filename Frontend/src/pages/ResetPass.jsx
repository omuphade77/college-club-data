import { useParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { KeyRound, Check, AlertTriangle, Lock, EyeOff, Eye, X } from "lucide-react";

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
    if (password.length < 6) return { level: 1, text: "Weak", color: "#ef4444" }; // red-500
    if (password.length < 10) return { level: 2, text: "Fair", color: "#eab308" }; // yellow-500
    if (/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/.test(password))
      return { level: 4, text: "Strong", color: "#22c55e" }; // green-500
    return { level: 3, text: "Good", color: "#3b82f6" }; // blue-500
  };

  const strength = getStrength();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-100 rounded-full blur-3xl opacity-50"></div>

        <div className="p-8 relative z-10">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
              <KeyRound size={32} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Secure Reset</p>
            <h1 className="text-3xl font-extrabold text-slate-800">New Password</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
            <p className="text-slate-500 text-sm mt-4 leading-relaxed px-4">
              Create a strong new password for your account. Make it at least 6 characters long.
            </p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-sm border ${isSuccess ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600"}`}>
              <span className="shrink-0 mt-0.5">{isSuccess ? <Check size={18}/> : <AlertTriangle size={18}/>}</span>
              <span>{message}</span>
            </div>
          )}

          {isSuccess && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 text-blue-700 rounded-xl flex items-center justify-center gap-3 text-sm font-medium">
              <span className="w-5 h-5 border-2 border-blue-200 border-t-blue-600 rounded-full animate-spin"></span>
              Redirecting to login...
            </div>
          )}

          {!isSuccess && (
            <form onSubmit={handleReset} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 pl-1" htmlFor="reset-password">
                  New Password
                </label>
                <div className="relative">
                  <input
                    id="reset-password"
                    type={showPassword ? "text" : "password"}
                    className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-base rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3.5 pl-11 pr-11 transition-colors outline-none"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Lock size={18} />
                  </div>
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>

                {/* Strength bar */}
                {password && (
                  <div className="mt-2 pl-1">
                    <div className="flex gap-1 mb-1">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="h-1 flex-1 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: i <= strength.level ? strength.color : "#e2e8f0",
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold" style={{ color: strength.color }}>
                      {strength.text}
                    </span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 pl-1" htmlFor="reset-confirm">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="reset-confirm"
                    type={showConfirm ? "text" : "password"}
                    className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-base rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3.5 pl-11 pr-11 transition-colors outline-none"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Lock size={18} />
                  </div>
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
                    onClick={() => setShowConfirm(!showConfirm)}
                    tabIndex={-1}
                  >
                    {showConfirm ? <EyeOff size={18}/> : <Eye size={18}/>}
                  </button>
                </div>

                {confirmPassword && (
                  <div className="mt-2 pl-1">
                    {password === confirmPassword ? (
                      <span className="text-xs font-semibold text-green-600 flex items-center gap-1"><Check size={12}/> Passwords match</span>
                    ) : (
                      <span className="text-xs font-semibold text-red-500 flex items-center gap-1"><X size={12}/> Passwords don&apos;t match</span>
                    )}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 font-bold rounded-xl text-lg px-5 py-4 text-center transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex justify-center items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Updating...
                  </>
                ) : (
                  "Reset Password"
                )}
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <Link to="/login" className="text-slate-500 text-sm font-medium hover:text-blue-600 transition-colors inline-flex items-center gap-2">
              ← Back to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}