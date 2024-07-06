import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CarDetailsPage.css';
import useAuth from '../../hooks/useAuth';

const CarDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedColor, setSelectedColor] = useState(null);

  const handleColorSelect = (color) => {
      setSelectedColor(color);
  };
  const isLoggedIn = useAuth();
  const { car } = location.state || {};
  console.log(car)
 
  if (!car) {
    return <p>No car details available.</p>;
  }

  const handleBack = () => {
    if (isLoggedIn || true) {
      navigate('/showroom', { state: { car } });
    } else {
      navigate('/signup');
    }
  };

  return (<>
    <div className="car-details-page">
      <h1>Car Details</h1>
      <div className="car-details">
        <h2>{car.name}</h2>
        <p><strong>Acceleration:</strong> {car.acceleration}</p>
        <p><strong>CargoCapacity:</strong> ${car.cargoCapacity}</p>
        <p><strong>ChargerType:</strong> {car.chargerType}</p>
        <p><strong>Seating Capacity:</strong> {car.seatingCapacity}</p>
        <p><strong>steering:</strong> {car.steering}</p>
        {/* Add more car details as needed */}
        <button onClick={handleBack}>Back to Home</button>
      </div>
    </div>
  </>
  );
};

export default CarDetailsPage;
