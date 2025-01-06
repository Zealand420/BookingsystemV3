import React from 'react';
import { Link } from 'react-router-dom';
import useStore from './store';

const AdminVerticalNavbar = () => {
  const user = useStore((state) => state.user);

  return (
    <div className="vertical-nav">
      <div className="profile-section">
        <img
          src={user?.photoURL || 'default-avatar.png'}
          alt="Profile"
          className="profile-pic"
        />
        <h3>Welcome, {user?.displayName || 'User'}</h3>
      </div>
      <div className="nav-links">
        <Link to="/rooms" className="nav-item">Rooms</Link>
        <Link to="/facilities" className="nav-item">Facilities</Link>
        <Link to="/reservations" className="nav-item">Your Reservations</Link>
        {user?.role === 'admin' && (
          <Link to="/admin" className="nav-item">Admin Overview</Link>
        )}
      </div>
    </div>
  );
};

export default AdminVerticalNavbar;
