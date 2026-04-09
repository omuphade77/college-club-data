import { useState } from 'react';
import { Link } from 'react-router-dom';
import './ConnectPage.css';

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
    <div className="connect-page">
      <div className="connect-container">
        <h1>Connect With Us</h1>
        <p className="connect-subtitle">Select a committee to view contact details</p>

        <select className="connect-select" value={selected} onChange={(e) => setSelected(e.target.value)}>
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

        <div className="content-box">
          {!data ? (
            <p className="connect-placeholder">Select a committee to view details</p>
          ) : (
            <>
              <h2>{data.label}</h2>
              <div className="info">
                <p><strong>Email:</strong> <a href={`mailto:${data.email}`}>{data.email}</a></p>
                <p><strong>Phone:</strong> {data.phone}</p>
              </div>
              <div className="social">
                <a href={data.instagram} target="_blank" rel="noopener noreferrer">📷 Instagram</a>
              </div>
            </>
          )}
        </div>

        <Link to="/" className="connect-back-link">← Back to Home</Link>
      </div>
    </div>
  );
}
