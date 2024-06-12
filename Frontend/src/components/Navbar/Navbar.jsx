import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return(
  <nav className={menuOpen ? 'active' : ''}>
    <img src="https://th.bing.com/th?id=OIP.7zE0FSzeF1sz-8_t_IkQIgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" alt="logo" className='logo'/>
    <button class="menu-btn" onClick={toggleMenu}>Menu</button>
    <ul className={`nav-items ${menuOpen ? 'active' : ''}`}>
      <li className='nav-links'><Link className='nav-items' to="/">Home</Link></li>
      <li className='nav-links'><Link className='nav-items' to="/showroom">Digital Showroom</Link></li>
      <li className='nav-links'><Link className='nav-items' to="/products">Products</Link></li>
      <li className='nav-links'><Link className='nav-items' to="">Blog</Link></li>
      <li className='nav-links'><Link className='nav-items' to="">Route Planner</Link></li>
    </ul>
    <div className=''>
      <FaRegUserCircle className='profile'/>
    </div>
  </nav>
  )
};

export default Navbar;
