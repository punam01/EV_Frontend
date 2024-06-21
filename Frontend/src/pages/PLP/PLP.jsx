import React, { useEffect, useState } from 'react';
import transition from '../../transition';
import './PLP.css';
import Vehicles from '../Vehicles/Vehicles';
import Recommended from '../../components/Recommended/Recommended';
import Sidebar from '../../components/Sidebar/Sidebar';
import Card from '../../components/AdvFilter/Card';
import { getAllCars } from '../../services/carServices';

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

    if (selectedSeatingCapacity) {
      filteredCars = filteredCars.filter((car) =>
        car.seatingCapacity >= selectedSeatingCapacity
      );
    }

    console.log("Filtered cars:", filteredCars);

    return filteredCars.map(({ _id, images, name, basePrice }) => (
      <Card
        key={_id}
        img={images[0]}
        title={name}
        star={5}
        reviews={10}
        prevPrice={basePrice}
      />
    ));
  };

  const result = filteredData(cars, selectedModelId, selectedSteering, selectedAutopilot, selectedSeatingCapacity, query);

  return (
    <>
      <h1 className='page-heading'>
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
        <Vehicles result={result} />
      </div>

    </>
  );
};

export default transition(PLP);
