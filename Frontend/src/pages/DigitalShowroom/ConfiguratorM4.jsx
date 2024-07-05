import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making API requests
import './Configurator.css';

const ConfiguratorM4 = ({ onSelectColor, onSelectIntColor, onSelectWheel, onSelectWinGlass }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const carData = location.state?.car;

  const [selectedOptions, setSelectedOptions] = useState({
    exteriorColor: carData?.customizableOptions?.find(option => option.name === "Exterior Color")?.options[0]?.code || null,
    interiorColor: carData?.customizableOptions?.find(option => option.name === "Interior Color")?.options[0]?.code || null,
    wheel: carData?.customizableOptions?.find(option => option.name === "Wheels")?.options[0]?.code || null,
    glass: carData?.customizableOptions?.find(option => option.name === "Glass")?.options[0]?.code || null,
    range: 'mr', // Default to a valid range option
    chargerType: '3.3 kw ac charger box' // Default to a valid charger type
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
    const total = (exteriorColor ? prices.exteriorColors[exteriorColor] || 0 : 0) +
      (interiorColor ? prices.interiorColors[interiorColor] || 0 : 0) +
      (wheel ? prices.wheels[wheel] || 0 : 0) +
      (glass ? prices.glass[glass] || 0 : 0) +
      (range ? prices.ranges[range] || 0 : 0) +
      (chargerType ? prices.chargerTypes[chargerType] || 0 : 0);
    return total;
  };

  const handleColorClick = (color) => {
    if (onSelectColor) {
      onSelectColor(color);
    }
    setSelectedOptions(prev => ({ ...prev, exteriorColor: color }));
  };

  const handleIntColorClick = (color) => {
    if (onSelectIntColor) {
      onSelectIntColor(color);
    }
    setSelectedOptions(prev => ({ ...prev, interiorColor: color }));
  };

  const handleWheelClick = (wheel) => {
    if (onSelectWheel) {
      onSelectWheel(wheel);
    }
    setSelectedOptions(prev => ({ ...prev, wheel }));
  };

  const handleGlassClick = (glass) => {
    if (onSelectWinGlass) {
      onSelectWinGlass(glass);
    }
    setSelectedOptions(prev => ({ ...prev, glass }));
  };

  const handleRangeChange = (event) => {
    setSelectedOptions(prev => ({ ...prev, range: event.target.value }));
  };

  const handleChargerTypeChange = (event) => {
    const { value } = event.target;
    setSelectedOptions(prev => ({ ...prev, chargerType: value }));
  };

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId'); // Assume userId is stored in localStorage
    const contact = localStorage.getItem('contact'); // Assume contact is stored in localStorage

    const customization = {
      exteriorColor: {
        value: selectedOptions.exteriorColor,
        price: prices.exteriorColors[selectedOptions.exteriorColor] || 0
      },
      interiorColor: {
        value: selectedOptions.interiorColor,
        price: prices.interiorColors[selectedOptions.interiorColor] || 0
      },
      wheelColor: {
        value: selectedOptions.wheel,
        price: prices.wheels[selectedOptions.wheel] || 0
      },
      range: {
        value: selectedOptions.range,
        price: prices.ranges[selectedOptions.range] || 0
      },
      glass: {
        value: selectedOptions.glass,
        price: prices.glass[selectedOptions.glass] || 0
      },
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
                className={`color-swatch ${color} ${selectedOptions.exteriorColor === color ? 'selected' : ''}`}
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
                className={`color-swatch ${color} ${selectedOptions.interiorColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleIntColorClick(color)}
              ></div>
            ))}
          </div>
        </div>
        <div className="content-item">
          <h3 className="content-heading">Wheels</h3>
          <div className="wheel-selection">
            {Object.keys(prices.wheels).map(wheel => (
              <div
                key={wheel}
                className={`wheel-swatch ${selectedOptions.wheel === wheel ? 'selected' : ''}`}
              >
                <img
                  src={`assets/images/rim_${wheel}.webp`}
                  alt={`Wheel ${wheel}`}
                  onClick={() => handleWheelClick(wheel)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="content-item">
          <h3 className="content-heading">Glass</h3>
          <div className="standard-color">
            {Object.keys(prices.glass).map(glass => (
              <div
                key={glass}
                className={`color-swatch ${glass} ${selectedOptions.glass === glass ? 'selected' : ''}`}
                style={{ backgroundColor: glass }}
                onClick={() => handleGlassClick(glass)}
              ></div>
            ))}
          </div>
        </div>
        <div className="content-item">
          <h3 className="content-heading">Range</h3>
          <div className="range-selection">
            <label>
              <input
                type="radio"
                name="range"
                value="mr"
                checked={selectedOptions.range === 'mr'}
                onChange={handleRangeChange}
              />
              MR
            </label>
            <label>
              <input
                type="radio"
                name="range"
                value="lr"
                checked={selectedOptions.range === 'lr'}
                onChange={handleRangeChange}
              />
              LR
            </label>
          </div>
        </div>
        <div className="content-item">
          <h3 className="content-heading">Charger</h3>
          <div className="charger-selection">
            <label>
              <input
                type="radio"
                name="charger"
                value="3.3 kw ac charger box"
                checked={selectedOptions.chargerType === '3.3 kw ac charger box'}
                onChange={handleChargerTypeChange}
              />
              3.3 KW AC Charger Box
            </label>
            <label>
              <input
                type="radio"
                name="charger"
                value="7.2 kw ac fast charger box"
                checked={selectedOptions.chargerType === '7.2 kw ac fast charger box'}
                onChange={handleChargerTypeChange}
              />
              7.2 KW AC Fast Charger Box
            </label>
          </div>
        </div>
        <div className="summary">
          <h3>Summary</h3>
          <p>Total Price: ${calculateTotalPrice()}</p>
        </div>
        <button className='config-button' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  </div>
);
};

export default ConfiguratorM4;
