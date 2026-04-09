import { useState, useEffect } from 'react';
import { api } from '../api';
import './EventsPage.css';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getEvents()
      .then(data => { setEvents(data); setLoading(false); })
      .catch(err => { console.error('Error fetching events:', err); setLoading(false); });
  }, []);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const month = d.toLocaleString('en-US', { month: 'short' });
    const day = d.getDate();
    return { display: `${month} ${day}`, year: d.getFullYear() };
  };

  return (
    <div className="container events-page">
      <h1 className="section-title">Upcoming Events</h1>
      {loading ? (
        <div className="events-skeleton-grid">
          {[1, 2, 3].map(i => (
            <div key={i} className="skeleton skeleton-box" />
          ))}
        </div>
      ) : events.length === 0 ? (
        <div className="empty-state"><p>No events yet. Check back soon!</p></div>
      ) : (
        <div className="events-grid">
          {events.map((event, i) => {
            const { display, year } = formatDate(event.event_date);
            return (
              <div key={i} className="event-card" style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="event-header">
                  <div className="event-date">{display}</div>
                  <div className="event-year">{year}</div>
                </div>
                <div className="event-body">
                  <div className="event-title">{event.event_name}</div>
                  <div className="event-details">📍 {event.event_location}</div>
                  <div className="event-details">🕐 {event.event_time}</div>
                  <div className="event-details">{event.event_description}</div>
                  <span className="event-committee">{event.committee_name}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
