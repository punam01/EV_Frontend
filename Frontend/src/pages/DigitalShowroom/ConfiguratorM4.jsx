import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
      value: 'mr',
      price: 2000
    },
    chargerType: {
      value: '3.3 kw ac charger box',
      price: 500
    }
  });

  const [prices, setPrices] = useState({
    exteriorColors: {},
    interiorColors: {},
    wheels: {},
    glass: {},
    ranges: { 'mr': 0, 'lr': 2000 },
    chargerTypes: { '3.3 kw ac charger box': 500, '7.2 kw ac fast charger box': 1000 }
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
        ranges: { 'mr': 0, 'lr': 2000 },
        chargerTypes: { '3.3 kw ac charger box': 500, '7.2 kw ac fast charger box': 1000 }
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
    console.log(color)
    const colorDetails = carData.customizableOptions.find(option => option.name === "Exterior Color")?.options.find(opt => opt.code === color);
    if (onSelectColor) {
      console.log(colorDetails)
      onSelectColor(colorDetails.code);
    }
    setSelectedOptions(prev => ({ ...prev, exteriorColor: colorDetails }));
  };

  const handleIntColorClick = (color) => {
    const colorDetails = carData.customizableOptions.find(option => option.name === "Interior Color")?.options.find(opt => opt.name === color);
    console.log(colorDetails)
    if (onSelectIntColor) {
      onSelectIntColor(colorDetails.code);
    }
    setSelectedOptions(prev => ({ ...prev, interiorColor: colorDetails }));
  };

  const handleWheelClick = (wheel) => {
    console.log(wheel)
    const wheelDetails = carData.customizableOptions.find(option => option.name === "Wheels")?.options.find(opt => opt.code === wheel);
    if (onSelectWheel) {
      console.log(wheelDetails)
      onSelectWheel(wheelDetails.code);
    }
    setSelectedOptions(prev => ({ ...prev, wheel: wheelDetails }));
  };

  const handleGlassClick = (glass) => {
    console.log('glss',glass)
    const glassDetails = carData.customizableOptions.find(option => option.name === "Glass")?.options.find(opt => opt.code === glass);
    if (onSelectWinGlass) {
      onSelectWinGlass(glassDetails.code);
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
    const userId = localStorage.getItem('userId');
    const contact = localStorage.getItem('contact');

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
      bookingTime: new Date(),
      paymentMade: false,
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
                  className={`color-swatch ${selectedOptions.exteriorColor?.code === color ? 'selected' : ''}`}
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
                  className={`color-swatch ${selectedOptions.interiorColor?.code === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleIntColorClick(color)}
                ></div>
              ))}
            </div>
          </div>
          <div className="content-item">
            <h3 className="content-heading">Wheels</h3>
            <div className="standard-color">
              {Object.keys(prices.wheels).map(wheel => (
                <div
                  key={wheel}
                  className={`color-swatch ${selectedOptions.wheel?.code === wheel ? 'selected' : ''}`}
                  style={{ backgroundColor: wheel }}
                  onClick={() => handleWheelClick(wheel)}
                ></div>
              ))}
            </div>
          </div>
          <div className="content-item">
            <h3 className="content-heading">Glass</h3>
            <div className="standard-color">
              {Object.keys(prices.glass).map(glass => (
                console.log(glass) ||
                <div
                  key={glass}
                  className={`color-swatch ${glass} ${selectedOptions.glass?.code === glass ? 'selected' : ''}`}
                  style={{ backgroundColor: glass }}
                  onClick={() => handleGlassClick(glass)}
                ></div>
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
              MR: Standard Range (390 mi)
            </label>
            <label>
              <input
                type="radio"
                value="lr"
                checked={selectedOptions.range.value === 'lr'}
                onChange={handleRangeChange}
              />
              LR: Long Range (520 mi)
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
          <div className="content-item">
            <h3 className="content-heading">Total price</h3>
            <label htmlFor="content-heading">${calculateTotalPrice()}</label>
            <button onClick={handleSubmit}>Continue with Pre-Booking</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguratorM4;
