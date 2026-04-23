import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Check, AlertTriangle, Mail, Building2, KeyRound } from "lucide-react";

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
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Account Recovery</p>
            <h1 className="text-3xl font-extrabold text-slate-800">Forgot Password?</h1>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
            <p className="text-slate-500 text-sm mt-4 leading-relaxed px-4">
              Enter your VJTI email address and we&apos;ll send you a link to reset your password.
            </p>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-xl flex items-start gap-3 text-sm border ${isSuccess ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600"}`}>
              <span className="shrink-0 mt-0.5">{isSuccess ? <Check size={18}/> : <AlertTriangle size={18}/>}</span>
              <span>{message}</span>
            </div>
          )}

          {!isSuccess && (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1 pl-1" htmlFor="forgot-email">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="forgot-email"
                    type="email"
                    className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-base rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3.5 pl-11 transition-colors outline-none"
                    placeholder="yourname@vjti.ac.in"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Mail size={18} />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 font-bold rounded-xl text-lg px-5 py-4 text-center transition-all shadow-md hover:shadow-lg disabled:opacity-70 flex justify-center items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    Sending...
                  </>
                ) : (
                  "Send Reset Link"
                )}
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col items-center gap-4">
            <p className="text-slate-500 text-sm">
              Remember your password?{" "}
              <Link to="/login" className="text-blue-600 font-bold hover:text-blue-800 hover:underline transition-colors">
                Sign In
              </Link>
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 bg-slate-50 border border-gray-200 px-3 py-1.5 rounded-full">
              <Building2 size={14} />
              VJTI Students Only
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
