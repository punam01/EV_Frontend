import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <h1>Hello</h1>
    <ul >
      <li className='nav-links'><Link className='nav-items' to="/">Home</Link></li>
      <li className='nav-links'><Link className='nav-items' to="/showroom">Digital Showroom</Link></li>
      <li className='nav-links'><Link className='nav-items' to="/products">Products</Link></li>
      <li className='nav-links'><Link className='nav-items' to="">Blog</Link></li>
      <li className='nav-links'><Link className='nav-items' to="">Route Planner</Link></li>
    </ul>
  </nav>
);

export default Navbar;
