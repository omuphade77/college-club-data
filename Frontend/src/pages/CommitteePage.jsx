import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { api } from '../api';
import { Calendar, Users } from 'lucide-react';
import './CommitteePage.css';

export default function CommitteePage() {
  const [searchParams] = useSearchParams();
  const committeeName = searchParams.get('committeeName');

  const [committee, setCommittee] = useState(null);
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeTab, setActiveTab] = useState('events');
  const [loading, setLoading] = useState(true);
  const [selectedMember, setSelectedMember] = useState(null);

  useEffect(() => {
    if (!committeeName) return;

    Promise.all([
      api.getCommittee(committeeName),
      api.getMembers(),
      api.getRegularEvents(),
    ])
      .then(([committeeData, membersResult, eventsResult]) => {
        setCommittee(committeeData);
        setMembers(membersResult.data || []);
        setEvents(eventsResult || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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

  const filteredMembers = members.filter(
    m => m.committee_name?.toLowerCase().trim() === committeeName?.toLowerCase().trim()
  );
  const grouped = {};
  filteredMembers.forEach(m => {
    if (!grouped[m.year]) grouped[m.year] = [];
    grouped[m.year].push(m);
  });

  console.log("Committee:", committeeName);
  console.log("Event committees:", events.map(e => e.committee_name));
  const filteredEvents = events.filter(
    e => e.committee_name?.toLowerCase().trim() === committeeName?.toLowerCase().trim()
  );
  return (
    <div className="container committee-detail">
      {loading ? (
        <div className="detail-skeleton">
          <div className="skeleton skeleton-box" />
        </div>
      ) : (
        <>
          <h1 className="section-title">{committee?.committee_name || committeeName}</h1>

          {(committee?.committee_logo_url || committee?.committee_description) && (
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
          )}

          <div className="tabs">
            <button
              className={activeTab === 'events' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('events')}
            >
              <Calendar size={18} /> Regular Events
            </button>
            <button
              className={activeTab === 'members' ? 'tab active' : 'tab'}
              onClick={() => setActiveTab('members')}
            >
              <Users size={18} /> Members
            </button>
          </div>

          {activeTab === 'events' ? (
            <>
              <div className="members-title-wrapper">
                <h2 className="members-title">Regular Events</h2>
              </div>

              {filteredEvents.length === 0 ? (
                <div className="empty-state"><p>No events scheduled yet.</p></div>
              ) : (
                <div className="events-list">
                  {filteredEvents.map((e, i) => (
                    <div key={i} className="event-list-item">
                      <div className="event-index">{String(i + 1).padStart(2, '0')}</div>
                      <div className="event-info">
                        <span className="event-name">{e.event_name}</span>
                      </div>
                      <div className="event-dot-line" />
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              <div className="members-title-wrapper">
                <h2 className="members-title">Members</h2>
              </div>

              {filteredMembers.length === 0 ? (
                <div className="empty-state"><p>No members yet</p></div>
              ) : (
                Object.keys(grouped).map(year => (
                  <div key={year}>
                    <h3 className="year-heading">{year} Year</h3>
                    <div className="member-grid">
                      {grouped[year].map((m, i) => (
                        <div key={i} className="member-card" style={{ cursor: 'pointer' }}
                          onClick={() => setSelectedMember(m)}>
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
        </>
      )}

      {/* ── Member Detail Modal ── */}
      {selectedMember && (
        <div className="member-modal-backdrop" onClick={() => setSelectedMember(null)}>
          <div className="member-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="member-modal-close"
              onClick={() => setSelectedMember(null)}
              aria-label="Close"
            >✕</button>

            {/* Profile image */}
            <div className="member-modal-avatar-wrap">
              {selectedMember.profile_image ? (
                <img
                  src={selectedMember.profile_image}
                  alt={selectedMember.name}
                  className="member-modal-avatar"
                />
              ) : (
                <div className="member-modal-avatar member-modal-avatar-default">
                  {selectedMember.name?.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            <h2 className="member-modal-name">{selectedMember.name}</h2>

            <div className="member-modal-body">
              <div className="member-modal-row">
                <span className="member-modal-label">Role</span>
                <span className="member-modal-value">{selectedMember.role}</span>
              </div>
              <div className="member-modal-row">
                <span className="member-modal-label">Committee</span>
                <span className="member-modal-value">{selectedMember.committee_name}</span>
              </div>
              <div className="member-modal-row">
                <span className="member-modal-label">Branch</span>
                <span className="member-modal-value">{selectedMember.branch}</span>
              </div>
              <div className="member-modal-row">
                <span className="member-modal-label">Year</span>
                <span className="member-modal-value">{selectedMember.year}</span>
              </div>
              <div className="member-modal-row">
                <span className="member-modal-label">Mobile</span>
                <span className="member-modal-value">{selectedMember.mobile}</span>
              </div>
              <div className="member-modal-row">
                <span className="member-modal-label">Email</span>
                <span className="member-modal-value member-modal-email">{selectedMember.email}</span>
              </div>
              {Array.isArray(selectedMember.skills) && selectedMember.skills.length > 0 && (
                <div className="member-modal-row member-modal-skills-row">
                  <span className="member-modal-label">Skills</span>
                  <div className="member-modal-skills">
                    {selectedMember.skills.map((s, i) => (
                      <span key={i} className="member-modal-skill-tag">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}