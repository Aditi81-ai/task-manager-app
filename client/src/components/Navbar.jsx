import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1>Task Manager</h1>
      <div className="navbar-right">
        <DarkModeToggle />
        <Link to="/profile" style={{ color: 'white', textDecoration: 'none' }}>
          <span className="user-info">Welcome, {user.name}!</span>
        </Link>
        <button onClick={handleLogout} className="btn btn-danger btn-sm">
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
