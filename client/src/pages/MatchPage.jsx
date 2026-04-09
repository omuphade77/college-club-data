import { useState, useRef } from 'react';
import './MatchPage.css';

const interestsList = [
  '🎨 Arts & Creativity',
  '⚽ Sports & Fitness',
  '📚 Academic Excellence',
  '💻 Technology',
  '🎉 Event Planning',
  '📱 Social Media',
  '🌍 Environment',
  '💰 Finance & Budget',
  '✍️ Writing',
  '🎭 Performance',
  '📸 Photography',
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

  return (
    <div className="container match-page">
      <div className="match-container">
        <h1 className="section-title">Find Your Committee Match</h1>

        <div className="match-intro">
          <h3>🎯 Discover Your Perfect Committee</h3>
          <p>Select your interests and we'll match you with the best committee for you!</p>
        </div>

        <div className="interests-grid">
          {interestsList.map(interest => (
            <div
              key={interest}
              className={`interest-tag ${selected.has(interest) ? 'selected' : ''}`}
              onClick={() => toggleInterest(interest)}
            >
              <div>{interest}</div>
            </div>
          ))}
        </div>

        <button className="match-button" onClick={findMatch}>Find My Match!</button>

        {results && (
          <div className="match-result" ref={resultRef}>
            <h3>Your Perfect Match!</h3>
            <div>
              {results.map((r, i) => (
                <div key={i} className="match-card">
                  <h4>{r.interest}</h4>
                  <p><strong>Committee:</strong> {r.committee}</p>
                  <p>{r.desc}</p>
                </div>
              ))}
            </div>
            <p className="match-result-desc">Based on your selected interests:</p>
          </div>
        )}
      </div>
    </div>
  );
}
