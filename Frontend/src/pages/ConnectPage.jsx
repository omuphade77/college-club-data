import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const committeeData = {
  enthusia: {
    label: 'Enthusia',
    email: 'enthusia@vjti.ac.in',
    phone: '+91 11111 11111',
    instagram: 'https://www.instagram.com/enthusiavjti',
  },
  technovanza: {
    label: 'Technovanza',
    email: 'technovanza@vjti.ac.in',
    phone: '+91 22222 22222',
    instagram: 'https://www.instagram.com/technovanza',
  },
  swachh: {
    label: 'Swachh VJTI',
    email: 'swachh@vjti.ac.in',
    phone: '+91 33333 33333',
    instagram: 'https://www.instagram.com/swachhvjti',
  },
  ecell: {
    label: 'E-Cell',
    email: 'ecell@vjti.ac.in',
    phone: '+91 44444 44444',
    instagram: 'https://www.instagram.com/ecellvjti',
  },
  digital: {
    label: 'Digital VJTI',
    email: 'digital@vjti.ac.in',
    phone: '+91 55555 55555',
    instagram: 'https://www.instagram.com/digital.vjti',
  },
  rangawardhan: {
    label: 'Rangawardhan',
    email: 'rangawardhan@vjti.ac.in',
    phone: '+91 66666 66666',
    instagram: 'https://www.instagram.com/rangawardhan',
  },
  pratibimb: {
    label: 'Pratibimb',
    email: 'pratibimb@vjti.ac.in',
    phone: '+91 77777 77777',
    instagram: 'https://www.instagram.com/pratibimbvjti',
  },
  dla: {
    label: 'Digital Literary Activities',
    email: 'dla@vjti.ac.in',
    phone: '+91 88888 88888',
    instagram: 'https://www.instagram.com/dla_vjti',
  },
  coc: {
    label: 'Community of Coders',
    email: 'coc@vjti.ac.in',
    phone: '+91 99999 99999',
    instagram: 'https://www.instagram.com/coc_vjti',
  },
};

export default function ConnectPage() {
  const [selected, setSelected] = useState('');
  const data = selected ? committeeData[selected] : null;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex items-center justify-center">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl border border-gray-100 p-8">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2 text-center">Connect With Us</h1>
        <p className="text-slate-500 text-center mb-8">Select a committee to view contact details</p>

        <div className="mb-8">
          <select 
            className="w-full bg-slate-50 border border-gray-200 text-slate-800 text-lg rounded-xl focus:ring-blue-500 focus:border-blue-500 block p-3.5 transition-colors cursor-pointer"
            value={selected} 
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Select Committee</option>
            <option value="enthusia">Enthusia</option>
            <option value="technovanza">Technovanza</option>
            <option value="swachh">Swachh VJTI</option>
            <option value="ecell">E-Cell</option>
            <option value="digital">Digital VJTI</option>
            <option value="rangawardhan">Rangawardhan</option>
            <option value="pratibimb">Pratibimb</option>
            <option value="dla">Digital Literary Activities</option>
            <option value="coc">Community of Coders</option>
          </select>
        </div>

        <div className="bg-slate-50 rounded-xl p-6 min-h-[220px] flex flex-col justify-center border border-gray-100">
          {!data ? (
            <p className="text-slate-400 text-center italic">Select a committee to view details</p>
          ) : (
            <div className="animate-fadeIn">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 pb-4 border-b border-gray-200">{data.label}</h2>
              <div className="space-y-4 mb-6">
                <p className="flex items-center gap-3 text-slate-700">
                  <FontAwesomeIcon icon={faEnvelope} className="text-blue-500 w-5" />
                  <a href={`mailto:${data.email}`} className="hover:text-blue-600 transition-colors">{data.email}</a>
                </p>
                <p className="flex items-center gap-3 text-slate-700">
                  <FontAwesomeIcon icon={faPhone} className="text-blue-500 w-5" />
                  <span>{data.phone}</span>
                </p>
              </div>
              <div>
                <a 
                  href={data.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity shadow-md"
                >
                  <FontAwesomeIcon icon={faInstagram} className="text-xl" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <Link to="/home" className="text-blue-600 font-medium hover:text-blue-800 transition-colors inline-flex items-center gap-2">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
