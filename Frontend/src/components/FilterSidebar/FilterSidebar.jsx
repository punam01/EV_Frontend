import React, { useEffect, useState } from 'react';
import './FilterSidebar.css';
import Category from './Category/Category';
import Price from './Price/Price';
import ExteriorPaint from './ExteriorPaint/ExteriorPaint';
import { getAllCars, getAllVariants, getDesiredVariant } from '../../services/carServices';
import Steering from './Steering/Steering';

const FilterSidebar = ({ onVariantsUpdate, onError }) => {
  const [cars, setCars] = useState([]);
  const [priceRanges, setPriceRanges] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState({});
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSteering, setSelectedSteering] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsData = await getAllCars();
        setCars(carsData);
        console.log(carsData)
        const prices = carsData.map(car => car.basePrice);
        generatePriceRanges(prices);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };
    fetchCars();
  }, []);

  const generatePriceRanges = (prices) => {
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const rangeSize = Math.ceil((maxPrice - minPrice) / 4); // 4 ranges

    const ranges = [];
    for (let i = 0; i < 4; i++) {
      ranges.push({
        label: `$${minPrice + rangeSize * i}-${minPrice + rangeSize * (i + 1)}`,
        min: minPrice + rangeSize * i,
        max: minPrice + rangeSize * (i + 1),
      });
    }

    setPriceRanges(ranges);
  };

  const handlePriceChange = (min, max) => {
    setSelectedPriceRange({ min, max });
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const handleSteeringChange = (steering) => {
    setSelectedSteering(steering)
  };

  const handleCategoryChange = async (modelName) => {
    try {
      const variants = await getAllVariants(modelName);
      onVariantsUpdate(variants);
    } catch (error) {
      console.error('Error fetching variants:', error);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [selectedModel, selectedPriceRange, selectedColor]);

  const applyFilters = async () => {
    try {
      const queryParams = {
        modelName: selectedModel,
        minPrice: selectedPriceRange.min,
        maxPrice: selectedPriceRange.max,
        color: selectedColor,
      };
      const filteredVariant = await getDesiredVariant(queryParams);
      if (filteredVariant) {
        onVariantsUpdate([filteredVariant]);
        onError(null); 
      } else {
        onVariantsUpdate([]);
        onError('No variants found.'); 
      }
    } catch (error) {
      console.error('Error fetching desired variant:', error);
      onError('Error fetching desired variant.');
    }
  };

  return (
    <>
      <section className="sidebar">
        <Category cars={cars} onCategoryChange={handleCategoryChange} />
        <Price priceRanges={priceRanges} onPriceChange={handlePriceChange} />
        <ExteriorPaint onColorChange={handleColorChange} />
        <Steering onSteeringChange={handleSteeringChange}/>
      </section>
    </>
  );
};

export default FilterSidebar;
