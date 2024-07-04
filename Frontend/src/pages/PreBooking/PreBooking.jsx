// src/pages/PreBookingPage/PreBookingPage.js

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PreBooking.css';
import CarouselComponent from '../../components/Carousel/CarouselComponent';

const PreBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedOptions, totalPrice, carData } = location.state || {};

  const handleCheckout = () => {
    navigate('/checkout', { state: { selectedOptions, totalPrice, carData } });
  };

  return (
    <div className="pre-booking-page">
      {selectedOptions ? (
        <>
          <div className='pre-booking-page__left'>
            <CarouselComponent />
          </div>
          <div className='pre-booking-page__right'>
            <div className="pre-booking-page__right__carname">
              <h2>Your Configured {carData.name}</h2>
              <p>${totalPrice}</p>
            </div>
            <div className="pre-booking-page__right__cardetails">
              <div className="pre-booking-page__right__cardetails__item">
                <p>Exterior Color: {selectedOptions.exteriorColor}</p>
              </div>
              <div className="pre-booking-page__right__cardetails__item">
                <p>Interior Color: {selectedOptions.interiorColor}</p>
              </div>
              <div className="pre-booking-page__right__cardetails__item">
                <p>Wheel: {selectedOptions.wheel}</p>
              </div>
              <div className="pre-booking-page__right__cardetails__item">
                <p>Glass: {selectedOptions.glass}</p>
              </div>
              <div className="pre-booking-page__right__cardetails__item">
                <p>Range: {selectedOptions.range}</p>
              </div>


            </div>


            <button onClick={handleCheckout} className="pre-booking-page__right__cardetails__checkout">Checkout</button>
          </div>
        </>
      ) : (
        <p>No options selected.</p>
      )}

    </div>
  );
};

export default PreBooking;
