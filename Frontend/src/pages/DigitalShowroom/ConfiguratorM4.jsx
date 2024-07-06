import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests
import './Configurator.css';

const ConfiguratorM4 = ({ onSelectColor, onSelectIntColor, onSelectWheel, onSelectWinGlass }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const carData = location.state?.car;

  const [selectedOptions, setSelectedOptions] = useState({
    exteriorColor: {
      code: carData?.customizableOptions?.find(option => option.name === "Exterior Color")?.options[0]?.code || null,
      name: carData?.customizableOptions?.find(option => option.name === "Exterior Color")?.options[0]?.name || null,
      price: carData?.customizableOptions?.find(option => option.name === "Exterior Color")?.options[0]?.price || null
    },
    interiorColor: {
      code: carData?.customizableOptions?.find(option => option.name === "Interior Color")?.options[0]?.code || null,
      name: carData?.customizableOptions?.find(option => option.name === "Interior Color")?.options[0]?.name || null,
      price: carData?.customizableOptions?.find(option => option.name === "Interior Color")?.options[0]?.price || null
    },
    wheel: {
      code: carData?.customizableOptions?.find(option => option.name === "Wheels")?.options[0]?.code || null,
      name: carData?.customizableOptions?.find(option => option.name === "Wheels")?.options[0]?.name || null,
      price: carData?.customizableOptions?.find(option => option.name === "Wheels")?.options[0]?.price || null
    },
    glass: {
      code: carData?.customizableOptions?.find(option => option.name === "Glass")?.options[0]?.code || null,
      name: carData?.customizableOptions?.find(option => option.name === "Glass")?.options[0]?.name || null,
      price: carData?.customizableOptions?.find(option => option.name === "Glass")?.options[0]?.price || null
    },
    range: {
      value: 'mr', // Default to a valid range option
      price: 2000 // Example price, update as needed
    },
    chargerType: {
      value: '3.3 kw ac charger box', // Default to a valid charger type
      price: 500 // Example price, update as needed
    }
  });

  const [prices, setPrices] = useState({
    exteriorColors: {},
    interiorColors: {},
    wheels: {},
    glass: {},
    ranges: { 'mr': 0, 'lr': 2000 }, // Example prices, update as needed
    chargerTypes: { '3.3 kw ac charger box': 500, '7.2 kw ac fast charger box': 1000 } // Example prices, update as needed
  });

  useEffect(() => {
    if (carData) {
      const extractPrices = (options) => {
        return options.reduce((acc, opt) => {
          const price = Number(opt.price.$numberInt || opt.price || 0);
          return { ...acc, [opt.code || opt.name]: price };
        }, {});
      };

      setPrices({
        exteriorColors: extractPrices(carData.customizableOptions.find(option => option.name === "Exterior Color")?.options || []),
        interiorColors: extractPrices(carData.customizableOptions.find(option => option.name === "Interior Color")?.options || []),
        wheels: extractPrices(carData.customizableOptions.find(option => option.name === "Wheels")?.options || []),
        glass: extractPrices(carData.customizableOptions.find(option => option.name === "Glass")?.options || []),
        ranges: { 'mr': 0, 'lr': 2000 }, // Example range prices
        chargerTypes: { '3.3 kw ac charger box': 500, '7.2 kw ac fast charger box': 1000 } // Example charger prices
      });
    }
  }, [carData]);

  const calculateTotalPrice = () => {
    const { exteriorColor, interiorColor, wheel, glass, range, chargerType } = selectedOptions;
    const total = (exteriorColor ? exteriorColor.price || 0 : 0) +
      (interiorColor ? interiorColor.price || 0 : 0) +
      (wheel ? wheel.price || 0 : 0) +
      (glass ? glass.price || 0 : 0) +
      (range ? range.price || 0 : 0) +
      (chargerType ? chargerType.price || 0 : 0);
    return total;
  };

  const handleColorClick = (color) => {
    const colorDetails = carData.customizableOptions.find(option => option.name === "Exterior Color")?.options.find(opt => opt.code === color);
    if (onSelectColor) {
      onSelectColor(colorDetails);
    }
    setSelectedOptions(prev => ({ ...prev, exteriorColor: colorDetails }));
  };

  const handleIntColorClick = (color) => {
    const colorDetails = carData.customizableOptions.find(option => option.name === "Interior Color")?.options.find(opt => opt.code === color);
    if (onSelectIntColor) {
      onSelectIntColor(colorDetails);
    }
    setSelectedOptions(prev => ({ ...prev, interiorColor: colorDetails }));
  };

  const handleWheelClick = (wheel) => {
    const wheelDetails = carData.customizableOptions.find(option => option.name === "Wheels")?.options.find(opt => opt.code === wheel);
    if (onSelectWheel) {
      onSelectWheel(wheelDetails);
    }
    setSelectedOptions(prev => ({ ...prev, wheel: wheelDetails }));
  };

  const handleGlassClick = (glass) => {
    const glassDetails = carData.customizableOptions.find(option => option.name === "Glass")?.options.find(opt => opt.code === glass);
    if (onSelectWinGlass) {
      onSelectWinGlass(glassDetails);
    }
    setSelectedOptions(prev => ({ ...prev, glass: glassDetails }));
  };

  const handleRangeChange = (event) => {
    const value = event.target.value;
    const price = prices.ranges[value] || 0;
    setSelectedOptions(prev => ({ ...prev, range: { value, price } }));
  };

  const handleChargerTypeChange = (event) => {
    const value = event.target.value;
    const price = prices.chargerTypes[value] || 0;
    setSelectedOptions(prev => ({ ...prev, chargerType: { value, price } }));
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId'); // Assume userId is stored in localStorage
    const contact = localStorage.getItem('contact'); // Assume contact is stored in localStorage

    const customization = {
      exteriorColor: selectedOptions.exteriorColor,
      interiorColor: selectedOptions.interiorColor,
      wheel: selectedOptions.wheel,
      glass: selectedOptions.glass,
      range: selectedOptions.range,
      chargerType: selectedOptions.chargerType,
      estimatedPrice: calculateTotalPrice()
    };

    const preBookingData = {
      userId,
      carId: carData._id,
      bookingTime: new Date(), // Set the booking time to now
      paymentMade: false, // Default to false, update as needed
      contact,
      customization
    };

    navigate('/prebooking-dets', {
      state: {
        selectedOptions,
        carData,
        totalPrice: calculateTotalPrice()
      }
    });
  };

  return (
    <div className='config-container'>
      <h1 className='car-name-container'>{carData?.name || 'BMW M4 2024'}</h1>
      <div className='configurator'>
        <div className="configurator-content">
          <div className="content-item">
            <h3 className='content-heading'>Power</h3>
            <table>
              <tbody>
                <tr>
                  <td>Max. Power</td>
                  <td style={{ float: 'right' }}>{carData?.power || '379hp'}</td>
                </tr>
                <tr>
                  <td>Top track speed</td>
                  <td style={{ float: 'right' }}>{carData?.topSpeed || '182mph'}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="content-item">
            <h3 className="content-heading">Paint Color</h3>
            <h4 className="content-sub-heading">Exterior Colors</h4>
            <div className="standard-color">
              {Object.keys(prices.exteriorColors).map(color => (
                <div
                  key={color}
                  className={`color-swatch ${color} ${selectedOptions.exteriorColor.code === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleColorClick(color)}
                ></div>
              ))}
            </div>
            <h4 className="content-sub-heading">Interior Colors</h4>
            <div className="standard-color">
              {Object.keys(prices.interiorColors).map(color => (
                <div
                  key={color}
                  className={`color-swatch ${color} ${selectedOptions.interiorColor.code === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleIntColorClick(color)}
                ></div>
              ))}
            </div>
          </div>
          <div className="content-item">
            <h3 className="content-heading">Wheels</h3>
            <div className="standard-wheel">
              {Object.keys(prices.wheels).map(wheel => (
                <div
                  key={wheel}
                  className={`wheel-option ${selectedOptions.wheel.code === wheel ? 'selected' : ''}`}
                  onClick={() => handleWheelClick(wheel)}
                >
                  {wheel}
                </div>
              ))}
            </div>
          </div>
          <div className="content-item">
            <h3 className="content-heading">Glass</h3>
            <div className="standard-glass">
              {Object.keys(prices.glass).map(glass => (
                <div
                  key={glass}
                  className={`glass-option ${selectedOptions.glass.code === glass ? 'selected' : ''}`}
                  onClick={() => handleGlassClick(glass)}
                >
                  {glass}
                </div>
              ))}
            </div>
          </div>
          <div className="content-item">
            <h3 className="content-heading">Range</h3>
            <label>
              <input
                type="radio"
                value="mr"
                checked={selectedOptions.range.value === 'mr'}
                onChange={handleRangeChange}
              />
              Medium Range (MR)
            </label>
            <label>
              <input
                type="radio"
                value="lr"
                checked={selectedOptions.range.value === 'lr'}
                onChange={handleRangeChange}
              />
              Long Range (LR)
            </label>
          </div>
          <div className="content-item">
            <h3 className="content-heading">Charger Type</h3>
            <label>
              <input
                type="radio"
                value="3.3 kw ac charger box"
                checked={selectedOptions.chargerType.value === '3.3 kw ac charger box'}
                onChange={handleChargerTypeChange}
              />
              3.3 KW AC Charger Box
            </label>
            <label>
              <input
                type="radio"
                value="7.2 kw ac fast charger box"
                checked={selectedOptions.chargerType.value === '7.2 kw ac fast charger box'}
                onChange={handleChargerTypeChange}
              />
              7.2 KW AC Fast Charger Box
            </label>
          </div>
          <div className="summary-section">
            <h3 className="summary-heading">Summary</h3>
            <ul className="summary-list">
              <li>Exterior Color: {selectedOptions.exteriorColor.name} - ${selectedOptions.exteriorColor.price}</li>
              <li>Interior Color: {selectedOptions.interiorColor.name} - ${selectedOptions.interiorColor.price}</li>
              <li>Wheels: {selectedOptions.wheel.name} - ${selectedOptions.wheel.price}</li>
              <li>Glass: {selectedOptions.glass.name} - ${selectedOptions.glass.price}</li>
              <li>Range: {selectedOptions.range.value} - ${selectedOptions.range.price}</li>
              <li>Charger Type: {selectedOptions.chargerType.value} - ${selectedOptions.chargerType.price}</li>
            </ul>
            <div className="total-price">
              Total Price: ${calculateTotalPrice()}
            </div>
          </div>
        </div>
        <button className="submit-btn" onClick={handleSubmit}>Proceed to Pre-Booking</button>
      </div>
    </div>
  );
};

export default ConfiguratorM4;
