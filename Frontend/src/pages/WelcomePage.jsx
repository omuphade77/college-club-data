import React from 'react';
import { Link } from 'react-router-dom';
import './WelcomePage.css';

export default function WelcomePage() {
  return (
    <div className="welcome-page">
      <main className="welcome-main">
        {/* Hero Section */}
        <section className="welcome-hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Welcome to <span className="highlight">VJTI CommitteeHub</span>
            </h1>
            <p className="hero-description">
              The central platform for VJTI students to discover, join, and engage with various college committees. Explore events, announcements, and connect with like-minded peers.
            </p>
            <div className="hero-actions">
              <Link to="/login" className="btn-primary">Login as a Student</Link>
              <Link to="/admin-login" className="btn-secondary">Login as an Admin</Link>
            </div>
          </div>
          <div className="hero-image-wrapper">
             {/* VJTI Campus Image */}
             <div className="hero-image-overlay"></div>
             <img 
               src="https://vjti.ac.in/wp-content/uploads/2021/08/vjti_main_building.jpg" 
               alt="VJTI Campus" 
               className="hero-image"
             />
             <div className="hero-stats-card">
               <span className="stat-number">30+</span>
               <span className="stat-text">Active Committees</span>
             </div>
          </div>
        </section>

        {/* About VJTI Section */}
        <section className="about-vjti-section">
           <div className="about-content-box">
              <div className="about-icon">🏛️</div>
              <h2>About VJTI</h2>
              <p>
                VJTI operates as an autonomous institution under the ownership of the Maharashtra State Government. The institute offers a diverse range of programs in engineering and technology spanning diploma, undergraduate, postgraduate, and doctoral levels.
              </p>
              <p>
                Renowned for its excellence in teaching, collaborative research endeavors, robust industry partnerships, and a vibrant alumni network, VJTI stands as a beacon of quality education and innovation.
              </p>
           </div>
           
           <div className="about-content-box about-platform-box">
              <div className="about-icon">🚀</div>
              <h2>About CommitteeHub</h2>
              <p>
                 We here show about committees of the college. CommitteeHub helps streamline communication, coordinate events, and make joining clubs seamless. From tech fests to cultural galas, never miss out on what's happening on campus.
              </p>
              <div className="features-list">
                 <span>✓ Event Tracking</span>
                 <span>✓ Direct Committee Matching</span>
                 <span>✓ Issue Reporting</span>
              </div>
           </div>
        </section>

        {/* Events Gallery Section */}
        <section className="events-gallery-section">
          <h2>Campus Life & Events</h2>
          <p className="gallery-subtitle">Experience the vibrant culture and technical excellence at VJTI.</p>
          <div className="gallery-grid">
            <div className="gallery-item">
               <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Tech Event" />
               <div className="gallery-overlay"><span>Technovanza</span></div>
            </div>
            <div className="gallery-item">
               <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Cultural Fest" />
               <div className="gallery-overlay"><span>Enthusia</span></div>
            </div>
            <div className="gallery-item">
               <img src="https://images.unsplash.com/photo-1523580494112-071d44c11a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hackathon" />
               <div className="gallery-overlay"><span>Hackathons & Coding</span></div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="welcome-footer">
        <div className="footer-content">
           <div className="footer-brand">
             <img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cf/VJTI_Logo.svg/1200px-VJTI_Logo.svg.png" alt="VJTI Logo" className="footer-logo" />
             <span>VJTI CommitteeHub © {new Date().getFullYear()}</span>
           </div>
           <div className="footer-links">
             <a href="#">Privacy Policy</a>
             <a href="#">Terms of Service</a>
             <a href="#">Contact Support</a>
           </div>
        </div>
      </footer>
    </div>
  );
}
