import { useState, useEffect } from 'react';
import { api } from '../api';
import { Megaphone, Building2 } from 'lucide-react';

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getAnnouncements()
      .then(data => { setAnnouncements(data); setLoading(false); })
      .catch(err => { console.error('Error fetching announcements:', err); setLoading(false); });
  }, []);

  return (
    <div className="pt-24 pb-12 px-4 max-w-4xl mx-auto min-h-screen">
      <div className="flex flex-col items-center justify-center mb-12">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 shadow-sm">
          <Megaphone size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 text-center drop-shadow-sm">
          Announcements
        </h1>
        <p className="text-slate-500 mt-4 text-center max-w-lg">Stay updated with the latest news, notices, and important information from all campus committees.</p>
      </div>

      {loading ? (
        <div className="space-y-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse flex flex-col gap-4">
              <div className="w-1/3 h-6 bg-slate-200 rounded-md"></div>
              <div className="w-full h-4 bg-slate-200 rounded-md"></div>
              <div className="w-5/6 h-4 bg-slate-200 rounded-md"></div>
            </div>
          ))}
        </div>
      ) : announcements.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center">
          <p className="text-slate-500 text-lg">No announcements yet.</p>
        </div>
      ) : (
        <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[2.25rem] md:before:left-1/2 before:-ml-px before:w-0.5 before:bg-gradient-to-b before:from-teal-400 before:to-blue-500">
          {announcements.map((a, i) => (
            <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group animate-fadeIn" style={{ animationDelay: `${i * 0.08}s` }}>
              {/* Timeline marker */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 ml-4 md:ml-0">
                <Megaphone size={16} />
              </div>
              
              {/* Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-shadow ml-4 md:ml-0">
                <div className="flex items-center gap-2 text-sm font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full w-fit mb-3 border border-teal-100">
                  <Building2 size={14} />
                  {a.committee_name}
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {a.announcement_description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
