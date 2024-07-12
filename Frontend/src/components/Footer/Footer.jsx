import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer-container'>
      <div className="footer-container__links">
        <div className="footer-container__logo">
            <img src="/assets/images/car_logo.png" alt="" />
        </div>
        <ul className="footer-container__link-holder">
            <Link className="footer-container__link-holder_li" to="/">Home</Link>
            <Link className="footer-container__link-holder_li" to="/demodrive">Demo Drive</Link>
            <Link className="footer-container__link-holder_li" to="/cars">Models</Link>
        </ul>
      </div>
      <div className="footer-container__lines"></div>
      <div className="footer-container__contact">
        
      </div>
    </div>
  )
}

export default Footer
