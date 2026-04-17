import { useState } from 'react';
import { api } from '../api';
import './IssueModal.css';

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
    <div className="issue-modal" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="issue-box">
        <div className="issue-modal-header">
          <div className="issue-modal-title">
            <h2>Raise an Issue</h2>
            <p>Report a problem or share feedback with us</p>
          </div>
          <button className="modal-close-btn" onClick={handleClose} aria-label="Close">✕</button>
        </div>

        {!success ? (
          <div className="issue-form-body">
            {error && (
              <div className="issue-error">
                ⚠️ Please fill in both the title and description before submitting.
              </div>
            )}

            <div className="form-group">
              <label htmlFor="issueCategory">Category</label>
              <select id="issueCategory" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="general">General</option>
                <option value="technical">Technical Problem</option>
                <option value="event">Event Related</option>
                <option value="committee">Committee Related</option>
                <option value="feedback">Feedback / Suggestion</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="issueCommittee">Committee</label>
              <select id="issueCommittee" value={committee} onChange={(e) => setCommittee(e.target.value)}>
                {committeeOptions.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="issueTitle">Issue Title</label>
              <input
                type="text"
                id="issueTitle"
                placeholder="Brief summary of your issue"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="issueDesc">Description</label>
              <textarea
                id="issueDesc"
                placeholder="Describe your issue in detail..."
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button className="btn-submit" onClick={handleSubmit}>Submit Issue</button>
              <button className="btn-cancel" onClick={handleClose}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="issue-success">
            <div className="success-icon">✓</div>
            <h3>Issue Submitted!</h3>
            <p>Thank you for your feedback. We'll look into it and get back to you shortly.</p>
          </div>
        )}
      </div>
    </div>
  );
}
