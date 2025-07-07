import React from 'react';
import './Header.css';

const Header = ({ user, onLogout }) => (
  <header className="app-header">
    <div className="app-title">Heroic Hash Search</div>
    {user ? (
      <div className="user-info">
        <span>{user.email}</span>
        <button onClick={onLogout}>Logout</button>
      </div>
    ) : null}
  </header>
);

export default Header; 