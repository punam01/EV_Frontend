// src/pages/HomePage/HomePage.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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


  return (
    <div className="home-page-container">
      {cars.map(car => (<>
        <div className="home-page-container__car-info">
          <h2 className='home-page-container__h2'>{car.name === "BMW" ? car.name : ''}</h2>
          <p className='home-page-container__p'>Explore, test drive, configure and book your own BMW EV
          </p>
          <button className="home-page-container__showroom-button" onClick={() => handleBookCar(car)}>
            Configure and Book
          </button>
          <button className="home-page-container__showroom-button" onClick={() => handleDemoDrive(car)}>
            Demo Drive
          </button>
        </div>
      </>
      ))}
    
    </div>
  );
};

export default HomePage;
