import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [vehiclesMenuOpen, setVehiclesMenuOpen] = useState(false);

  const handleNavClick = (menuName) => {
    if (menuName === 'vehicles') {
      setVehiclesMenuOpen(true);
    } else {
      setVehiclesMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className={`navbar ${menuOpen ? 'navbar--active' : ''}`}>
        <img src="https://th.bing.com/th?id=OIP.7zE0FSzeF1sz-8_t_IkQIgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" alt="logo" className='navbar__logo' />
        <button className="navbar__menu-btn" onClick={toggleMenu}>Menu</button>
        <ul className={`navbar__items ${menuOpen ? 'navbar__items--active' : ''}`}>
          <li className='navbar__item'><Link className='navbar__link' to="/" onClick={() => handleNavClick('home')}>Home</Link></li>
          {        /* <li className='navbar__item'><Link className='navbar__link' to="/showroom" onClick={() => handleNavClick('showroom')}>Digital Showroom</Link></li>*/}
{        /*  <li className='navbar__item'><Link className='navbar__link' to="/cars" onClick={() => handleNavClick('vehicles')}>Vehicles</Link></li>*/}
          <li className='navbar__item'><Link className='navbar__link' to="/blogs" onClick={() => handleNavClick('blog')}>Blog</Link></li>
          <li className='navbar__item'><Link className='navbar__link' to="/demodrive" onClick={() => handleNavClick('demodrive')}>Demo Drive</Link></li>
        </ul>
        <div className='navbar__profile'>
          <Link className='navbar__link' to="/profile">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
            </svg>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
