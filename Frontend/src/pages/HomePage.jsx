import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GraduationCap, Users, Calendar } from 'lucide-react';
import { api } from '../api';

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
    name: 'Swachh VJTI',
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
  const [totalMembers, setTotalMembers] = useState(0);

  const openCommittee = (name) => {
    navigate(`/committee?committeeName=${encodeURIComponent(name)}`);
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await api.getTotalMembers();
        setTotalMembers(Number(res.totalMembers)); 
      } catch (err) {
        console.error(err);
      }
    };
    fetchMembers();
  }, []);

  return (
    <div className="pt-20 pb-12 px-4 max-w-7xl mx-auto min-h-screen">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Banner Section */}
        <div className="bg-gradient-to-r from-teal-500 to-blue-600 px-8 py-16 text-white relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-sm">Welcome to CommitteeHub</h2>
            <p className="text-lg md:text-xl opacity-90 drop-shadow-sm">Discover, explore, and join the best organizations on campus.</p>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-32 w-48 h-48 bg-teal-300 opacity-20 rounded-full blur-2xl transform translate-y-1/2"></div>
        </div>

        {/* Dashboard Content */}
        <div className="p-8">
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-14 relative z-20 mb-12">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex items-center gap-4 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <GraduationCap size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 leading-tight">{committees.length}</h3>
                <p className="text-sm text-slate-500 font-medium">Active Committees</p>
              </div>
            </div>
          
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex items-center gap-4 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">
                <Users size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-800 leading-tight">{totalMembers}</h3>
                <p className="text-sm text-slate-500 font-medium">Total Members</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex items-center gap-4 transition-transform hover:-translate-y-1 cursor-pointer" onClick={() => navigate('/events')}>
              <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Calendar size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 leading-tight">Upcoming</h3>
                <p className="text-sm text-slate-500 font-medium">Campus Events</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-slate-800">Popular Committees</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {committees.map((c) => (
              <div
                key={c.name}
                className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl transition-all cursor-pointer flex flex-col h-full"
                onClick={() => openCommittee(c.name)}
              >
                <div className="h-48 overflow-hidden bg-gray-50 p-6 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <img src={c.img} alt={c.name} className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500 z-0" />
                </div>
                <div className="p-5 flex flex-col flex-grow border-t border-gray-50">
                  <h4 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">{c.name}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed flex-grow">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
