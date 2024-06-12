import React, { useEffect, useState } from 'react';
import { getAllCars } from '../services/carServices';

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars();
        setCars(data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCars();
  }, []);
  console.log(cars)
  return (
    <div>
      <h1>Car List</h1>
      <ul>
        {cars.map(car => (
          <li key={car._id}>
            <h2>{car.name}</h2>
            <p>Manufacturer: {car.manufacturer}</p>
            <p>Base Price: {car.basePrice}</p>
            <p>Range: {car.range}</p>
            <p>Top Speed: {car.topSpeed}</p>
            <p>Seating Capacity: {car.seatingCapacity}</p>
            <p>Cargo Capacity: {car.cargoCapacity}</p>
            <p>Acceleration: {car.acceleration}</p>
            <img src={car.images} alt={car.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
