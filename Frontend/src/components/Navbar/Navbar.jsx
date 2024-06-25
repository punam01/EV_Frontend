import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'
import { FaRegUserCircle } from "react-icons/fa";

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
    console.log(menuOpen)
    setMenuOpen(!menuOpen);
  };
  return (
    <>
      <nav className={menuOpen ? 'active' : ''}>
        <img src="https://th.bing.com/th?id=OIP.7zE0FSzeF1sz-8_t_IkQIgHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2" alt="logo" className='logo' />
        <button className="menu-btn" onClick={toggleMenu}>Menu</button>
        <ul className={`nav-items ${menuOpen ? 'active' : ''}`}>
          <li className='nav-links'><Link className='nav-items' to="/" onClick={()=>handleNavClick('home')}>Home</Link></li>
          <li className='nav-links'><Link className='nav-items' to="/showroom" onClick={()=>handleNavClick('showroom')}>Digital Showroom</Link></li>
          <li className='nav-links'><Link className='nav-items' to="/cars" onClick={()=>handleNavClick('vehicles')}>Vehicles</Link></li>
          <li className='nav-links'><Link className='nav-items' to="/blogs" onClick={()=>handleNavClick('blog')}>Blog</Link></li>
          <li className='nav-links'><Link className='nav-items' to="/" onClick={()=>handleNavClick('routePlanner')}>Route Planner</Link></li>
        </ul>
        <div className=''>
        <Link className='nav-items' to="/profile" ><FaRegUserCircle className='profile' /></Link>
          
        </div>
      </nav>
      {vehiclesMenuOpen && <div className='nav-sub-item-list'>
        <div className="vehicle-sub-list">
          <section className="left">
            <ul className="vehicle-list">
              <li>
                <div className="vechicle-list-item">
                  <img src='https://th.bing.com/th?id=OIP.ZsPLFCxDQewrzKRkU-XuJwHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2' alt='' />
                  <h3>ModelA</h3>
                  <div className="vechicle-list-item-links">
                    <Link className='link' to="/">Learn More</Link>
                    <Link className='link' to="/">Demo Drive</Link>
                  </div>
                </div>
              </li>
              <div className="vechicle-list-item">
                <img src='https://th.bing.com/th?id=OIP.ZsPLFCxDQewrzKRkU-XuJwHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2' alt='' />
                <h3>ModelA</h3>
                <div className="vechicle-list-item-links">
                  <Link className='link' to="/">Learn More</Link>
                  <Link className='link' to="/">Demo Drive</Link>
                </div>
              </div><div className="vechicle-list-item">
                <img src='https://th.bing.com/th?id=OIP.ZsPLFCxDQewrzKRkU-XuJwHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2' alt='' />
                <h3>ModelA</h3>
                <div className="vechicle-list-item-links">
                  <Link className='link' to="/">Learn More</Link>
                  <Link className='link' to="/">Demo Drive</Link>
                </div>
              </div><div className="vechicle-list-item">
                <img src='https://th.bing.com/th?id=OIP.ZsPLFCxDQewrzKRkU-XuJwHaFj&w=288&h=216&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2' alt='' />
                <h3>ModelA</h3>
                <div className="vechicle-list-item-links">
                  <Link className='link' to="/">Learn More</Link>
                  <Link className='link' to="/">Demo Drive</Link>
                </div>
              </div>
            </ul>
          </section>
          <section className="right">
            <ul className='vehicle-quick-links'>
              <li><Link className='link' to="/products">Inventory</Link></li>
              <li><Link className='link' to="/">Demo Drive</Link></li>
              <li><Link className='link' to="/">Trade In</Link></li>
              <li><Link className='link' to="/">Compare</Link></li>
            </ul>
          </section>
        </div>
      </div>}
    </>
  )
};

export default Navbar;
