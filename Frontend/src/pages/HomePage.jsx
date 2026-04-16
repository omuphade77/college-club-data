import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const committees = [
  {
    name: 'Technovanza',
    desc: 'Innovation & Technology',
    img: 'https://th.bing.com/th/id/OIP.zodu7fUw-8PZJPLBXBtmVAAAAA?w=120&h=150&c=7&r=0&o=7&cb=defcachec2&dpr=2.2&pid=1.7&rm=3',
  },
  {
    name: 'Rangwardhan',
    desc: 'Arts & Cultural Expression',
    img: 'https://th.bing.com/th/id/OIP.5O5Y9watdnkliT64muRIJAHaHa?w=194&h=194&c=7&r=0&o=7&cb=defcachec2&dpr=2.2&pid=1.7&rm=3',
  },
  {
    name: 'Enthusia',
    desc: 'Sports & Athletics',
    img: 'https://th.bing.com/th/id/OIP.FcrM-laTgl1GONXKKw0NvAAAAA?w=171&h=180&c=7&r=0&o=7&cb=defcachec2&dpr=2.2&pid=1.7&rm=3',
  },
  {
    name: 'COC (Community of Coders)',
    desc: 'Learning & Excellence',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM7Z5zq5lsj_gZIqCTSB3jQRnT1VvqVq21Bg&s',
  },
  {
    name: 'Swacch VJTI',
    desc: 'Sustainability & Green',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSJkEWQRWdimj4ipAnhhw0ZSjNjKKkcoXqvQ&s',
  },
  {
    name: 'Pratibimb',
    desc: 'Planning & Coordination',
    img: 'https://th.bing.com/th/id/OIP.KqYZLbFCa-6k6jn_90KMfgHaHZ?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    name: 'Digital VJTI',
    desc: 'Communication & Outreach',
    img: 'https://tse3.mm.bing.net/th/id/OIP.DoDGwBmoLAK1h9Val_m4vAHaD4?cb=defcachec2&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    name: 'E-Cell VJTI',
    desc: 'Entrepreneurship development committee',
    img: 'https://tse1.mm.bing.net/th/id/OIP.wOZONRoKs0bc1y_dTcAZnwHaHT?rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    name: 'DLA',
    desc: 'Digital publishing and literary events',
    img: 'https://th.bing.com/th/id/OIP.g582Kyzgbn_6ULoAOEkdOAAAAA?w=176&h=180&c=7&r=0&o=7&cb=defcachec2&dpr=2.2&pid=1.7&rm=3',
  },
];

export default function HomePage() {
  const navigate = useNavigate();

  const openCommittee = (name) => {
    navigate(`/committee?committeeName=${encodeURIComponent(name)}`);
  };

  return (
    <div className="container home-page">
      <div className="home-dashboard">
        
        {/* Banner Section */}
        <div className="dashboard-banner">
          <div className="banner-content">
            <h2>Welcome to CommitteeHub</h2>
            <p>Discover, explore, and join the best organizations on campus.</p>
          </div>
          <div className="banner-decor"></div>
        </div>

        {/* Dashboard Content */}
        <div className="dashboard-content">
          
          {/* Stats Row */}
          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-icon">🎓</div>
              <div className="stat-info">
                <h3>{committees.length}</h3>
                <p>Active Committees</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <h3>Open</h3>
                <p>Registrations</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-info">
                <h3>Upcoming</h3>
                <p>Campus Events</p>
              </div>
            </div>
          </div>

          <h3 className="section-heading">Popular Committees</h3>
          
          <div className="committees-grid">
            {committees.map((c, i) => (
              <div
                key={c.name}
                className="committee-card"
                onClick={() => openCommittee(c.name)}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div className="image-wrapper">
                  <img src={c.img} alt={c.name} />
                </div>
                <h4 className="committee-name">{c.name}</h4>
                <p className="committee-desc">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
