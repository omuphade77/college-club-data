import { useState, useEffect } from "react";
import { api } from "../api";
import { Calendar, Clock, MapPin, Building2 } from 'lucide-react';

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getEvents()
      .then((data) => {
        setUpcomingEvents(data.upcoming || []);
        setPastEvents(data.past || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching events:", err);
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const month = d.toLocaleString("en-US", { month: "short" });
    const day = d.getDate();
    return { display: `${month} ${day}`, year: d.getFullYear() };
  };

  const eventsToShow = activeTab === "upcoming" ? upcomingEvents : pastEvents;

  return (
    <div className="pt-24 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col items-center justify-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-8 text-center drop-shadow-sm">
          {activeTab === "upcoming" ? "Upcoming Events" : "Past Events"}
        </h1>
        
        {/* Tabs */}
        <div className="flex bg-white rounded-xl shadow-sm border border-gray-100 p-1 w-full max-w-md">
          <button
            className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm transition-all ${activeTab === "upcoming" ? "bg-blue-50 text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming
          </button>
          <button
            className={`flex-1 py-3 px-6 rounded-lg font-bold text-sm transition-all ${activeTab === "past" ? "bg-blue-50 text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"}`}
            onClick={() => setActiveTab("past")}
          >
            Past
          </button>
        </div>
      </div>

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse">
              <div className="w-20 h-20 bg-slate-200 rounded-xl mb-4"></div>
              <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
              <div className="h-4 bg-slate-200 rounded w-2/3 mb-6"></div>
              <div className="h-8 bg-slate-200 rounded-full w-1/3"></div>
            </div>
          ))}
        </div>
      ) : eventsToShow.length === 0 ? (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-6">
            <Calendar size={40} />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">No events found</h3>
          <p className="text-slate-500">There are currently no {activeTab} events to display.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventsToShow.map((event, i) => {
            const { display, year } = formatDate(event.event_date);

            return (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all transform hover:-translate-y-1 group flex flex-col h-full animate-fadeIn"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="bg-gradient-to-br from-teal-500 to-blue-600 p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl transform translate-x-1/3 -translate-y-1/3"></div>
                  <div className="relative z-10 flex justify-between items-start">
                    <div>
                      <div className="text-white text-3xl font-black drop-shadow-md leading-none">{display}</div>
                      <div className="text-white/80 font-bold mt-1 uppercase tracking-widest text-xs">{year}</div>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider w-fit mb-4 border border-blue-100">
                    <Building2 size={12} /> {event.committee_name}
                  </span>
                  
                  <h3 className="text-xl font-extrabold text-slate-800 mb-4 leading-tight group-hover:text-blue-600 transition-colors">
                    {event.event_name}
                  </h3>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-3 text-slate-600 text-sm font-medium bg-slate-50 p-2 rounded-lg">
                      <MapPin size={16} className="text-teal-500" />
                      <span>{event.event_location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-600 text-sm font-medium bg-slate-50 p-2 rounded-lg">
                      <Clock size={16} className="text-blue-500" />
                      <span>{event.event_time}</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-500 text-sm leading-relaxed mt-auto pt-4 border-t border-gray-100">
                    {event.event_description || "No description provided."}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
