import React, { useEffect, useState } from 'react';
import transition from '../../animations/transition';
import './PLP.css';
import Sidebar from '../../components/Sidebar/Sidebar';
import { getAllCars } from '../../services/carServices';
import VariantCard from '../../components/VariantCard/VariantCard';

const PLP = () => {
  const [cars, setCars] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [selectedSteering, setSelectedSteering] = useState(null);
  const [selectedAutopilot, setSelectedAutopilot] = useState(false);
  const [selectedSeatingCapacity, setSelectedSeatingCapacity] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const data = await getAllCars();
        setCars(data);
      } catch (error) {
        //console.error("Error fetching cars:", error);
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

  const handlePriceRangeChange = (event) => {
    if (event.target.value === "All") {
      setSelectedPriceRange('300000-5000000');
    } 
    else{
      setSelectedPriceRange(event.target.value);
    }
    console.log(event.target.value)
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


  const filteredData = (cars, selectedModelId, selectedSteering, selectedAutopilot,selectedPriceRange, selectedSeatingCapacity, query) => {
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

    if (selectedPriceRange) {
      const [minPrice, maxPrice] = selectedPriceRange.split('-').map(Number);
      filteredCars = filteredCars.filter((car) =>
        car.basePrice >= minPrice && (maxPrice ? car.basePrice <= maxPrice : true)
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

    return filteredCars;
  };

  const result = filteredData(cars, selectedModelId, selectedSteering, selectedAutopilot,selectedPriceRange, selectedSeatingCapacity, query);

  return (
    <div className='plp-page-container'>
      <div className="plp-page-container__header">
        <h1 className='plp-page-container__page-heading'>
          Inventory
        </h1>
        {cars.length > 0 && (
          <Sidebar
            handleChange={handleChange}
            handleSteeringChange={handleSteeringChange}
            handleAutopilotChange={handleAutopilotChange}
            handleSeatingCapacityChange={handleSeatingCapacityChange}
            handlePriceRangeChange={handlePriceRangeChange}
            cars={cars}
          />)}
      </div>


      <div className="plp-container">
        {/*<Recommended handleClick={handleClick} />*/}
        <div className="vehicles-container">
          {result.map((car) => (
            <div key={car._id} className="car-card">
              <ul className='car-card__ul'>
                {car && (
                  <VariantCard key={car._id} variant={car.name} modelId={car.modelId} car={car} id={car._id} />
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
