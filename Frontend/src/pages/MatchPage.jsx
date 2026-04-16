import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './MatchPage.css';

const interestsList = [
  'Arts & Creativity',
  'Sports & Fitness',
  'Academic Excellence',
  'Technology',
  'Event Planning',
  'Social Media',
  'Environment',
  'Finance & Budget',
  'Writing',
  'Performance',
  'Photography',
];

const mapping = {
  'Technology': { committee: 'Technovanza / Community of Coders', desc: 'Innovation, coding and tech building' },
  'Academic Excellence': { committee: 'Community of Coders', desc: 'Coding + academics' },
  'Sports': { committee: 'Enthusia', desc: 'Sports & fitness' },
  'Arts': { committee: 'Rangwardhan / Pratibimb', desc: 'Creative arts' },
  'Performance': { committee: 'Rangwardhan / Pratibimb', desc: 'Stage & performance' },
  'Environment': { committee: 'Swacch VJTI', desc: 'Sustainability' },
  'Finance': { committee: 'Ecell VJTI', desc: 'Finance & entrepreneurship' },
  'Writing': { committee: 'Digital Literary Activities', desc: 'Writing & content' },
  'Social Media': { committee: 'Digital VJTI', desc: 'Social media & outreach' },
  'Event Planning': { committee: 'Technovanza / Enthusia', desc: 'Event management' },
  'Photography': { committee: 'Digital VJTI', desc: 'Photography' },
};

export default function MatchPage() {
  const [selected, setSelected] = useState(new Set());
  const [results, setResults] = useState(null);
  const resultRef = useRef(null);
  const navigate = useNavigate();

  const toggleInterest = (interest) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(interest)) next.delete(interest);
      else next.add(interest);
      return next;
    });
  };

  const findMatch = () => {
    if (selected.size === 0) {
      alert('Please select at least one interest!');
      return;
    }

    const matches = [];
    selected.forEach(interest => {
      for (const key in mapping) {
        if (interest.includes(key)) {
          matches.push({ interest, ...mapping[key] });
        }
      }
    });

    setResults(matches);
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  const clearSelection = () => {
    setSelected(new Set());
    setResults(null);
  };

  return (
    <div className="container match-page">
      <div className="match-container">
        
        {/* Purple Banner matching the reference image */}
        <div className="dashboard-banner">
          <div className="banner-content">
            <h2>Find Your Perfect Match</h2>
            <p>Select your areas of interest below to discover committees that align with your goals.</p>
          </div>
          <div className="banner-decor"></div>
        </div>

        <div className="dashboard-content">
          <h3 className="section-heading">Available Interests</h3>
          
          <div className="interests-grid">
            {interestsList.map(interest => (
              <div
                key={interest}
                className={`interest-card ${selected.has(interest) ? 'selected' : ''}`}
                onClick={() => toggleInterest(interest)}
              >
                <div className="interest-check">
                  {selected.has(interest) && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <div className="interest-name">{interest}</div>
              </div>
            ))}
          </div>

          <div className="match-actions">
            <button className="btn-primary" onClick={findMatch}>Find Committees</button>
            <button className="btn-secondary" onClick={clearSelection}>Clear</button>
          </div>

          {results && (
            <div className="results-section" ref={resultRef}>
              <h3 className="section-heading">Recommended Committees <span className="badge">{results.length}</span></h3>
              <div className="results-grid">
                {results.map((r, i) => (
                  <div key={i} className="college-card">
                    <div className="card-logo-placeholder">
                      {r.committee.charAt(0)}
                    </div>
                    <div className="card-details">
                      <h4>
                        {r.committee.split(' / ').map((c, idx, arr) => (
                          <span key={idx}>
                            <span 
                              className="committee-link" 
                              onClick={() => navigate(`/committee?committeeName=${encodeURIComponent(c)}`)}
                            >
                              {c}
                            </span>
                            {idx < arr.length - 1 ? ' / ' : ''}
                          </span>
                        ))}
                      </h4>
                      <p className="card-location">{r.interest} • {r.desc}</p>
                    </div>
                    <div className="card-status status-interested">Match</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
