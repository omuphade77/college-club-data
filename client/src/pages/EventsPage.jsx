import { useState, useEffect } from "react";
import { api } from "../api";
import "./EventsPage.css";

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [activeTab, setActiveTab] = useState("upcoming");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getEvents()
      .then((data) => {
        console.log("API RESPONSE:", data);

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
    <div className="container events-page">
      {/* 🔥 Tabs */}
      <div className="tabs">
        <button
          className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
          onClick={() => setActiveTab("upcoming")}
        >
          Upcoming
        </button>

        <button
          className={`tab-btn ${activeTab === "past" ? "active" : ""}`}
          onClick={() => setActiveTab("past")}
        >
          Past
        </button>
      </div>

      {/* 🔹 Title */}
      <h1 className="section-title">
        {activeTab === "upcoming" ? "Upcoming Events" : "Past Events"}
      </h1>

      {/* 🔹 Loading */}
      {loading ? (
        <div className="events-skeleton-grid">
          {[1, 2, 3].map((i) => (
            <div key={i} className="skeleton skeleton-box" />
          ))}
        </div>
      ) : eventsToShow.length === 0 ? (
        <div className="empty-state">
          <p>No {activeTab} events found.</p>
        </div>
      ) : (
        <div className="events-grid">
          {eventsToShow.map((event, i) => {
            const { display, year } = formatDate(event.event_date);

            return (
              <div
                key={i}
                className="event-card"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="event-header">
                  <div className="event-date">{display}</div>
                  <div className="event-year">{year}</div>
                </div>

                <div className="event-body">
                  <div className="event-title">{event.event_name}</div>
                  <div className="event-details">📍 {event.event_location}</div>
                  <div className="event-details">🕐 {event.event_time}</div>
                  <div className="event-details">{event.event_description}</div>

                  <span className="event-committee">
                    {event.committee_name}
                  </span>

                 
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
