import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCarById } from '../services/carServices'

const PDP = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const carData = await getCarById(id);
        setCar(carData);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };

    fetchCar();
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pdp-container">
      <h1>{car.name}</h1>
      <img src={car.images[0]} alt={car.name} />
      <p>Price: ${car.basePrice}</p>
      <p>Range: {car.range} miles</p>
      <p>Top Speed: {car.topSpeed} mph</p>
      <p>Seating Capacity: {car.seatingCapacity}</p>
      <p>Cargo Capacity: {car.cargoCapacity} cu ft</p>
      <p>Acceleration: {car.acceleration} sec (0-60 mph)</p>
      <p>Steering: {car.steering}</p>
      <p>Autopilot: {car.autopilot ? 'Yes' : 'No'}</p>
      <button className="book-now">Book now</button>
    </div>
  );
};

export default PDP;
