import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAllCars } from '../../services/carServices';
import useAuth from '../../hooks/useAuth';
import './HomePage.css';

const HomePage = () => {
  const [cars, setCars] = useState([]);
  const isLoggedIn = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars();
        console.log("Car details:", data);
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  const handleBookCar = (car) => {
    navigate('/cardetails', { state: { car } });
  }
  const handleDemoDrive = (car) => {
    navigate('/demodrive', { state: { car } });
  }
  const handleBookNow = (car) => {
    navigate('/noconfig', { state: { car } });
  }

  return (<>
    <div className="home-page-container">
      <div className="home-page-container__header-section">
        <div className="header-section__name">
          BMW
        </div>
        <div className="header-section__tagline">
          The Ultimate Driving Machine.
        </div>
      </div>
      <div className="home-page-container__video-container">
        <video src="/assets/bmw1_medium.mp4" type="video/mp4" autoPlay loop muted />
      </div>
      <div className="home-page-container__model-list">
        <div className="home-page-container__model-hearder-section">
          <div className='model-list__title'>Explore the line-up.</div>
          <div className="model-list__link-container">
            <Link className='model-list__link' to='/compare'>Compare models</Link>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#039BE7" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
            </svg>
          </div>

        </div>
        <div className="home-page-container__explore-section">
          <div className="home-page-container__explore-model-list">
            {cars.map(car => (
              <div key={car.carId} className="home-page-container__explore-model-item">
                {<img src="/assets/images/car_3d_t.png" alt="Car Image" className="car-image" />}
                <div className="home-page-container__explore-model-item__standard-color">
                  {car.customizableOptions.find(option => option.name === 'Exterior Color').options.map(color => (
                    <div
                      key={color.code}
                      className="color-swatch"
                      style={{ backgroundColor: color.code }}
                      onClick={() => handleColorClick(color.name)}
                    ></div>
                  ))}
                </div>
                <div className="home-page-container__explore-model-item__carName">{car.modelId}</div>
                <div className="home-page-container__explore-model-item__carModel">The ultimate {car.name}.</div>
                <div className="home-page-container__explore-model-item__basePrice">Starting from ₹{car.basePrice}/-* onwards</div>
                <div className="home-page-container__explore-model-item__btnGrp">
                  <button className="home-page-container__learnMore" onClick={()=>handleBookCar(car)}>Learn More</button>
                  <div className="model-list__btn-container">
                    <button className="home-page-container__buyNow" onClick={()=>handleBookNow(car)}>Book Now</button>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#31A93E" class="bi bi-arrow-right-short" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="home-page-container__video-container">
        div
      </div>
      <div className="home-page-container__video-container">
        div
      </div>
      <div className="home-page-container__video-container">
        div
      </div>
      <div className="home-page-container__video-container">
        div
      </div>
      <div className="home-page-container__video-container">
        div
      </div>
    </div>
  </>
  );
};

export default HomePage;


/*{/*<div key={car.id} className="home-page-container__car-info">
        <h2 className='home-page-container__h2'>{car.name === "BMW" ? car.name : ''}</h2>
        <p className='home-page-container__p'>Explore, test drive, configure and book your own BMW EV</p>
        <button className="home-page-container__showroom-button" onClick={() => handleBookCar(car)}>
          Configure and Book
        </button>
        <button className="home-page-container__showroom-button" onClick={() => handleDemoDrive(car)}>
          Demo Drive
        </button>
        <button className="home-page-container__showroom-button" onClick={() => handleBookNow(car)}>
          Book Now
        </button>
      </div*/