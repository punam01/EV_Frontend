// src/pages/PLP/PLP.jsx
import React, { useEffect, useState } from 'react';
import transition from '../../transition';
import './PLP.css';
import Recommended from '../../components/Recommended/Recommended';
import Sidebar from '../../components/Sidebar/Sidebar';
import { getAllCars } from '../../services/carServices';
import VariantCard from '../../components/VariantCard/VariantCard';

const PLP = () => {
  const [cars, setCars] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [selectedSteering, setSelectedSteering] = useState(null);
  const [selectedAutopilot, setSelectedAutopilot] = useState(false);
  const [selectedSeatingCapacity, setSelectedSeatingCapacity] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars();
        setCars(data);
        console.log("Fetched cars:", data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleChange = (event) => {
    setSelectedModelId(event.target.value);
    
    console.log(selectedModelId)
  };

  const handleSteeringChange = (event) => {
    setSelectedSteering(event.target.value);
  };

  const handleAutopilotChange = (event) => {
    setSelectedAutopilot(event.target.checked);
  };

  const handleSeatingCapacityChange = (event) => {
    setSelectedSeatingCapacity(parseInt(event.target.value));
  };

  const handleClick = (modelId) => {
    setSelectedModelId(modelId);
    console.log("Selected Model ID:", modelId);
  };

  const filteredData = (cars, selectedModelId, selectedSteering, selectedAutopilot, selectedSeatingCapacity, query) => {
    let filteredCars = cars;

    if (query) {
      filteredCars = filteredCars.filter((car) =>
        car.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedModelId) {
      filteredCars = filteredCars.filter((car) =>
        car.modelId === selectedModelId
      );
      
      console.log(filteredCars,selectedModelId)
    }

    if (selectedSteering) {
      filteredCars = filteredCars.filter((car) =>
        car.steering === selectedSteering
      );
    }

    if (selectedAutopilot) {
      filteredCars = filteredCars.filter((car) =>
        car.autopilot === true
      );
    }

    /*if (selectedSeatingCapacity) {
      filteredCars = filteredCars.filter((car) =>
        car.seatingCapacity == selectedSeatingCapacity
      );
    }
*/
    console.log("Filtered cars:", filteredCars);

    return filteredCars;
  };

  const result = filteredData(cars, selectedModelId, selectedSteering, selectedAutopilot, selectedSeatingCapacity, query);
  console.log("PLP result", result);

  return (
    <div className='plp-page-container'>
      <h1 className='plp-page-container__page-heading'>
        Inventory
      </h1>

      <div className="plp-container">
        <Recommended handleClick={handleClick} />
        {cars.length > 0 && (
          <Sidebar
            handleChange={handleChange}
            handleSteeringChange={handleSteeringChange}
            handleAutopilotChange={handleAutopilotChange}
            handleSeatingCapacityChange={handleSeatingCapacityChange}
            cars={cars}
          />
        )}
        <div className="vehicles-container">
          {result.map((car) => (
            <div key={car._id} className="car-card">
              <ul className='car-card__ul'>
                {car && (
                  <VariantCard key={car._id} variant={car.name} modelId={car.modelId} car={car} id={car._id}/>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default transition(PLP);
