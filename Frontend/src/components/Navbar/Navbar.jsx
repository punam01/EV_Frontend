import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path ? 'navbar__item navbar__item--active' : 'navbar__item';
  };

  return (
    <nav className={`navbar ${menuOpen ? 'navbar--active' : ''}`}>
      <img src="/assets/images/car_logo.png" alt="logo" className='navbar__logo' onClick={() => navigate('/')} />
      <button className="navbar__menu-btn" onClick={toggleMenu}>Menu</button>
      <ul className={`navbar__items ${menuOpen ? 'navbar__items--active' : ''}`}>
        <li className={isActive('/')}>
          <Link to="/" className='navbar__link' onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li className={isActive('/demodrive')}>
          <Link to="/demodrive" className='navbar__link' onClick={() => setMenuOpen(false)}>Demo Drive</Link>
        </li>
        <li className={isActive('/cars')}>
          <Link to="/cars" className='navbar__link' onClick={() => setMenuOpen(false)}>Book Now</Link>
        </li>
      </ul>
      <div className='navbar__profile'>
        <Link className='navbar__link' to="/profile">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
          </svg>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
