import { useState } from 'react';
import { api } from '../api';
import { AlertTriangle, CheckCircle2, X } from 'lucide-react';

export default function IssueModal({ isOpen, onClose }) {
  const [category, setCategory] = useState('general');
  const [committee, setCommittee] = useState('General');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const committeeOptions = [
    'General', 'Technovanza', 'Rangwardhan', 'Enthusia', 'Swachh VJTI',
    'Digital vjti', 'Pratibimb', 'Ecell', 'Community of coders',
    'Digital Literary Activities',
  ];

  const handleSubmit = async () => {
    if (!title.trim() || !desc.trim()) {
      setError(true);
      setTimeout(() => setError(false), 3000);
      return;
    }

    try {
      await api.createIssue(title, desc, committee);
      setSuccess(true);
      setTimeout(() => {
        handleClose();
      }, 2500);
    } catch (err) {
      console.error('Error submitting issue:', err);
      alert('An error occurred while submitting your issue.');
    }
  };

  const handleClose = () => {
    setTitle('');
    setDesc('');
    setCategory('general');
    setCommittee('General');
    setError(false);
    setSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-fadeIn transform transition-all">
        
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 px-6 py-5 flex items-center justify-between">
          <div className="text-white">
            <h2 className="text-xl font-bold">Raise an Issue</h2>
            <p className="text-sm text-teal-50 opacity-90">Report a problem or share feedback with us</p>
          </div>
          <button 
            className="text-white/80 hover:text-white bg-black/10 hover:bg-black/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors"
            onClick={handleClose} 
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {!success ? (
          <div className="p-6">
            {error && (
              <div className="mb-5 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl flex items-start gap-2 text-sm">
                <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                <span>Please fill in both the title and description before submitting.</span>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="issueCategory" className="block text-sm font-semibold text-slate-700 mb-1">Category</label>
                <select 
                  id="issueCategory" 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                >
                  <option value="general">General</option>
                  <option value="technical">Technical Problem</option>
                  <option value="event">Event Related</option>
                  <option value="committee">Committee Related</option>
                  <option value="feedback">Feedback / Suggestion</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="issueCommittee" className="block text-sm font-semibold text-slate-700 mb-1">Committee</label>
                <select 
                  id="issueCommittee" 
                  value={committee} 
                  onChange={(e) => setCommittee(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                >
                  {committeeOptions.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="issueTitle" className="block text-sm font-semibold text-slate-700 mb-1">Issue Title</label>
                <input
                  type="text"
                  id="issueTitle"
                  placeholder="Brief summary of your issue"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                />
              </div>

              <div>
                <label htmlFor="issueDesc" className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                <textarea
                  id="issueDesc"
                  placeholder="Describe your issue in detail..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-gray-200 text-slate-800 rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors min-h-[100px] resize-y"
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
              <button 
                className="flex-1 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold py-2.5 px-4 rounded-lg shadow-sm transition-colors"
                onClick={handleSubmit}
              >
                Submit Issue
              </button>
              <button 
                className="flex-1 bg-white border border-gray-300 hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-4 rounded-lg shadow-sm transition-colors"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="p-8 flex flex-col items-center justify-center text-center animate-fadeIn min-h-[300px]">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Issue Submitted!</h3>
            <p className="text-slate-500">Thank you for your feedback. We'll look into it and get back to you shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
