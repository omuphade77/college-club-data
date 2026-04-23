import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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
  'Technology': { committee: 'Technovanza /COC (Community of Coders)', desc: 'Innovation, coding and tech building' },
  'Academic Excellence': { committee: 'COC (Community of Coders)', desc: 'Coding + academics' },
  'Sports': { committee: 'Enthusia', desc: 'Sports & fitness' },
  'Arts': { committee: 'Rangwardhan / Pratibimb', desc: 'Creative arts' },
  'Performance': { committee: 'Rangwardhan / Pratibimb', desc: 'Stage & performance' },
  'Environment': { committee: 'Swachh VJTI', desc: 'Sustainability' },
  'Finance': { committee: 'E-Cell VJTI', desc: 'Finance & entrepreneurship' },
  'Writing': { committee: 'DLA', desc: 'Writing & content' },
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
    <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Banner Section matching HomePage design */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 px-8 py-16 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-sm">Find Your Perfect Match</h2>
            <p className="text-lg md:text-xl opacity-90 drop-shadow-sm">Select your areas of interest below to discover committees that align with your goals.</p>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-32 w-48 h-48 bg-teal-300 opacity-20 rounded-full blur-2xl transform translate-y-1/2"></div>
        </div>

        <div className="p-8">
          <h3 className="text-2xl font-bold text-slate-800 mb-8">Available Interests</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {interestsList.map(interest => (
              <div
                key={interest}
                className={`border rounded-xl p-4 flex items-center gap-4 cursor-pointer transition-all ${selected.has(interest) ? 'border-blue-500 bg-blue-50/50 shadow-sm' : 'border-gray-200 hover:border-blue-300 hover:bg-slate-50'}`}
                onClick={() => toggleInterest(interest)}
              >
                <div className={`w-6 h-6 rounded border flex flex-shrink-0 items-center justify-center transition-colors ${selected.has(interest) ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'}`}>
                  {selected.has(interest) && (
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
                <div className={`font-medium ${selected.has(interest) ? 'text-blue-700' : 'text-slate-700'}`}>{interest}</div>
              </div>
            ))}
          </div>

          <div className="flex gap-4 mt-10">
            <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-md transition-all hover:-translate-y-0.5" onClick={findMatch}>Find Committees</button>
            <button className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all" onClick={clearSelection}>Clear</button>
          </div>

          {results && (
            <div className="mt-16 animate-fadeIn" ref={resultRef}>
              <div className="flex items-center gap-4 mb-8 border-b border-gray-100 pb-4">
                <h3 className="text-2xl font-bold text-slate-800">Recommended Committees</h3>
                <span className="bg-blue-100 text-blue-700 font-bold py-1 px-3 rounded-full text-sm">{results.length}</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((r, i) => (
                  <div key={i} className="flex gap-5 p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-teal-400 to-blue-500"></div>
                    <div className="w-14 h-14 bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200 rounded-xl flex items-center justify-center text-slate-600 font-bold text-xl flex-shrink-0 shadow-inner">
                      {r.committee.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-800 mb-1 leading-tight">
                        {r.committee.split(' / ').map((c, idx, arr) => (
                          <span key={idx}>
                            <span 
                              className="cursor-pointer hover:text-blue-600 transition-colors inline-block hover:underline" 
                              onClick={() => navigate(`/committee?committeeName=${encodeURIComponent(c)}`)}
                            >
                              {c}
                            </span>
                            {idx < arr.length - 1 ? ' / ' : ''}
                          </span>
                        ))}
                      </h4>
                      <p className="text-sm font-medium text-blue-600 mb-1">{r.interest}</p>
                      <p className="text-sm text-slate-500">{r.desc}</p>
                    </div>
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
