import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CarDetailsPage.css';
import useAuth from '../../hooks/useAuth';
import './CarDetailsPage.css'

import CarouselComponent from '../../components/Carousel/CarouselComponent';
const CarDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const { isLoggedIn } = useAuth();
  const { car } = location.state || {};
  //console.log(car)

  if (!car) {
    return <p>No car details available.</p>;
  }

  const handleNextPage = () => {
    //if (isLoggedIn && localStorage.getItem('USER')) {
    navigate('/showroom', { state: { car } });
    //} else {
    //  navigate('/signup');
    //}
  };
  const handleBookNow = () => {
    if (isLoggedIn && localStorage.getItem('USER')) {
      navigate('/noconfig', { state: { car } });
    } else {
      navigate('/signup',{state: { 
        from: window.location.pathname,
        selectedOptions, 
        totalPrice, 
        carData 
      }});
    }
  };
  return (<>
    <div className="car-details-page__container">
      <div className="car-details">
        <div className="car-details-page__car-reels">
          <video src='/assets/videos/reel1.mp4' autoPlay
            loop
            muted></video>
          <div className="overlay-text">
            <h1 className='car-details-page__container-h1'>{car.name}</h1>
            <p className='car-details-page__container-h1'>₹{car.basePrice}/-*</p>
          </div>
        </div>
        <div className="car-details-page__next-pg-btn-grp">
          {console.log(car.isConfig,car)&&car.isConfig ? (<>
          <button className="car-details-page__next-pg-btn" onClick={handleNextPage}>Configure & Book</button>
          <button className="car-details-page__next-pg-btn" onClick={handleBookNow}>Book Without configuration</button></>
        ) :
            <button className="car-details-page__next-pg-btn" onClick={handleBookNow}>Book Now</button>}
        </div>
        <div className="car-details-page__car-performance">
          <div className="car-details-page__car-performance__item">
            <div className="car-details-page__car-performance__item-label">
              Range up to (EPA)*
            </div>
            <h1 className="car-details-page__car-performance__item-content">
              {car.range === 'LR' ? "Long Range" : "Medium Range"}
            </h1>
          </div>
          <div className="car-details-page__car-performance__item">
            <div className="car-details-page__car-performance__item-label">
              Charging Time
            </div>
            <h1 className="car-details-page__car-performance__item-content">
              30 mins
            </h1>
          </div>
          <div className="car-details-page__car-performance__item">
            <div className="car-details-page__car-performance__item-label">
              0-60mph*
            </div>
            <h1 className="car-details-page__car-performance__item-content">
              {car.acceleration} sec
            </h1>
          </div>
          <div className="car-details-page__car-performance__item">
            <div className="car-details-page__car-performance__item-label">
              Top Speed
            </div>
            <h1 className="car-details-page__car-performance__item-content">
              {car.topSpeed} mph
            </h1>
          </div>
        </div>
        <div className="car-details-page__closer-look">
          <img src="/assets/images/bmw_front.jpg"></img>
          <div className="car-details-page__logo-content">
            <h2 className='car-details-page__logo-content__h2'>The Iconic Auto3D Logo</h2>
            <p className='car-details-page__logo-content__p'>A symbol of performance, luxury, and German engineering excellence.</p>
          </div>
        </div>
        <div className="car-details-page__closer-look">
          <div className="car-details-page__logo-content">
            <h2 className='car-details-page__logo-content__h2'>Unleash Precision</h2>
            <p className='car-details-page__logo-content__p'>Engineered for ultimate control, delivering unmatched driving performance.</p>
          </div>
          <img src="/assets/images/bmw_steering.jpg"></img>
        </div>
        <div className="car-details-page__closer-look">

          <img src="/assets/images/bmw_interior.jpg"></img>
          <div className="car-details-page__logo-content">
            <h2 className='car-details-page__logo-content__h2'>The Ultimate Auto3D Interior</h2>
            <p className='car-details-page__logo-content__p'>Experience luxury, comfort, and cutting-edge technology in every drive.</p>
          </div>
        </div>
      </div>
    </div>
  </>
  );
};

export default CarDetailsPage;
