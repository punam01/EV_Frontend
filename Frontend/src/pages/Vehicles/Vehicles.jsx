import React from 'react';
import './Vehicles.css';
import Card from '../../components/AdvFilter/Card';

const Vehicles = ({ cars }) => {
  return (
    <section className='vehicles-card-container'>
      <div className="vehicle-item">
        {cars.map((car) => (
          <Card
            key={car._id}
            img={car.images[0]}
            title={car.name}
            star={5} 
            reviews={10} 
            prevPrice={car.basePrice}
            id={car._id}
          />
        ))}
      </div>
    </section>
  );
};

export default Vehicles;
