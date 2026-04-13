import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../api';
import './CommitteePage.css';

export default function CommitteePage() {
  const [searchParams] = useSearchParams();
  const committeeName = searchParams.get('committeeName');

  const [committee, setCommittee] = useState(null);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!committeeName) return;

    Promise.all([
      api.getCommittee(committeeName),
      api.getMembers(),
    ])
      .then(([committeeData, membersResult]) => {
        setCommittee(committeeData);
        setMembers(membersResult.data || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, [committeeName]);

  if (!committeeName) {
    return (
      <div className="container committee-detail">
        <div className="empty-state">
          <p>No committee selected. <Link to="/home" className="gold-link">Go back home</Link></p>
        </div>
      </div>
    );
  }

  const filtered = members.filter(m => m.committee_name === committeeName);

  // Group by year
  const grouped = {};
  filtered.forEach(m => {
    if (!grouped[m.year]) grouped[m.year] = [];
    grouped[m.year].push(m);
  });

  return (
    <div className="container committee-detail">
      {loading ? (
        <div className="detail-skeleton">
          <div className="skeleton skeleton-box" />
        </div>
      ) : (
        <>
          <h1 className="section-title">{committee?.committee_name || committeeName}</h1>

          <div className="committee-detail-card">
            {committee?.committee_logo_url && (
              <div className="detail-image-wrapper">
                <img src={committee.committee_logo_url} alt={committee.committee_name} />
              </div>
            )}
            {committee?.committee_description && (
              <div className="committee-desc-text">{committee.committee_description}</div>
            )}
          </div>

          <div className="members-title-wrapper">
            <h2 className="members-title">Members</h2>
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state"><p>No members yet</p></div>
          ) : (
            Object.keys(grouped).map(year => (
              <div key={year}>
                <h3 className="year-heading">{year} Year</h3>
                <div className="member-grid">
                  {grouped[year].map((m, i) => (
                    <div key={i} className="member-card" style={{ animationDelay: `${i * 0.06}s` }}>
                      <h4>{m.name}</h4>
                      <p>{m.role}</p>
                      <p>{m.branch}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}
