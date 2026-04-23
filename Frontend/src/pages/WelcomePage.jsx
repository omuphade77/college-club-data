import React from 'react';
import { Link } from 'react-router-dom';

export default function WelcomePage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-black/60 z-10"></div>
            <video 
              src="/images/quad.mp4" 
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay 
              loop 
              muted 
              playsInline
            />
          </div>

          <div className="relative z-20 container mx-auto px-6 text-center max-w-4xl animate-fadeIn">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 drop-shadow-lg leading-tight">
              Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">VJTI CommitteeHub</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mb-10 drop-shadow-md leading-relaxed max-w-3xl mx-auto font-light">
              The central platform for VJTI students to discover, join, and engage with various college committees. Explore events, announcements, and connect with like-minded peers.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Link to="/login" className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 w-full sm:w-auto text-lg">
                Login as a Student
              </Link>
              <Link to="/admin-login" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 w-full sm:w-auto text-lg">
                Login as an Admin
              </Link>
            </div>
          </div>
        </section>

        {/* About VJTI Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
              
              {/* About VJTI Box */}
              <div className="bg-slate-50 p-10 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full blur-3xl -mr-10 -mt-10 opacity-50 group-hover:opacity-80 transition-opacity"></div>
                <div className="mb-6 flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 relative z-10 p-2">
                  <img src="/images/vjtilogo.jpg" alt="VJTI Logo" className="w-full h-full object-contain" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4 relative z-10">About VJTI</h2>
                <div className="space-y-4 text-slate-600 leading-relaxed relative z-10">
                  <p>
                    VJTI operates as an autonomous institution under the ownership of the Maharashtra State Government. The institute offers a diverse range of programs in engineering and technology spanning diploma, undergraduate, postgraduate, and doctoral levels.
                  </p>
                  <p>
                    Renowned for its excellence in teaching, collaborative research endeavors, robust industry partnerships, and a vibrant alumni network, VJTI stands as a beacon of quality education and innovation.
                  </p>
                </div>
              </div>
              
              {/* About Platform Box */}
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 p-10 rounded-3xl shadow-sm border border-blue-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-teal-200 rounded-full blur-3xl -mr-10 -mb-10 opacity-40 group-hover:opacity-70 transition-opacity"></div>
                <div className="mb-6 flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-sm overflow-hidden border border-blue-100 relative z-10 p-3">
                  <img src="/images/logo.png" alt="CommitteeHub Logo" className="w-full h-full object-contain" />
                </div>
                <h2 className="text-3xl font-bold text-slate-800 mb-4 relative z-10">About CommitteeHub</h2>
                <p className="text-slate-600 leading-relaxed mb-6 relative z-10">
                  We here show about committees of the college. CommitteeHub helps streamline communication, coordinate events, and make joining clubs seamless. From tech fests to cultural galas, never miss out on what's happening on campus.
                </p>
                <div className="space-y-3 font-semibold text-slate-700 relative z-10">
                  <div className="flex items-center gap-3"><span className="text-teal-500 text-xl">✓</span> Event Tracking</div>
                  <div className="flex items-center gap-3"><span className="text-teal-500 text-xl">✓</span> Direct Committee Matching</div>
                  <div className="flex items-center gap-3"><span className="text-teal-500 text-xl">✓</span> Issue Reporting</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Events Gallery Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extrabold text-slate-800 mb-4">Campus Life & Events</h2>
              <p className="text-xl text-slate-500 max-w-2xl mx-auto">Experience the vibrant culture and technical excellence at VJTI.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
              <div className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg hover:shadow-2xl transition-all cursor-pointer">
                <img src="/images/vjtitechno.webp" alt="Tech Event" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white drop-shadow-md">Technovanza</span>
                </div>
              </div>
              
              <div className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg hover:shadow-2xl transition-all cursor-pointer">
                <img src="/images/vjtienthu.webp" alt="Cultural Fest" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white drop-shadow-md">Enthusia</span>
                </div>
              </div>
              
              <div className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-lg hover:shadow-2xl transition-all cursor-pointer">
                <img src="/images/rangavjti.webp" alt="Rangawardhan Fest" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="text-2xl font-bold text-white drop-shadow-md">Rangawardhan</span>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-10">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <img src="/images/vjtilogo.jpg" alt="VJTI Logo" className="w-10 h-10 object-contain rounded-lg border border-gray-200 p-1" />
            <span className="font-semibold text-slate-700">VJTI CommitteeHub © {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
