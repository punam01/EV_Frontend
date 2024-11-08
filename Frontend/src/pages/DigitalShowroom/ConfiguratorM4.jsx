import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Configurator.css';


const ConfiguratorM4 = ({ onSelectColor, onSelectIntColor, onSelectWheel, onSelectWinGlass,car }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [carData,setCarData]=useState(car);
  //const carData = location.state?.car;
  useEffect(() => {
    if (location.state?.car) {
      console.log(" car set")
      setCarData(location.state.car);
    } else {
      console.log(" default car set")
      setCarData(car);
    }
  }, [location.state?.car]);

  console.log(carData)
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
      console.log(carData)
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
    const colorDetails = carData.customizableOptions.find(option => option.name === "Interior Color")?.options.find(opt => opt.code === color);
    console.log("int col:::::", colorDetails)
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
    //console.log('glss:', glass)
    const glassDetails = carData.customizableOptions.find(option => option.name === "Glass")?.options.find(opt => opt.code === glass);
    if (onSelectWinGlass) {
      //console.log(glassDetails.code)
      onSelectWinGlass(glassDetails.code);
    }
    setSelectedOptions(prev => ({ ...prev, glass: glassDetails }));
    console.log(selectedOptions)
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
    const userId = localStorage.getItem('USER');
    const contact = localStorage.getItem('phone');

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
      <h1 className='car-name-container'>{carData?.name || 'Auto 3D'}</h1>
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
                  data-tooltip={selectedOptions.exteriorColor?.code === color ? selectedOptions.exteriorColor?.name : ''}
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
                  data-tooltip={selectedOptions.interiorColor?.code === color ? selectedOptions.interiorColor?.name : ''}
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
                  data-tooltip={selectedOptions.wheel?.code === wheel ? selectedOptions.wheel.name : ''}
                ></div>
              ))}
            </div>
            <h3 className="content-heading">Glass</h3>
            <div className="standard-color">
              {Object.keys(prices.glass).map(glass => (
                console.log(glass) ||
                <div
                  key={glass}
                  className={`color-swatch ${glass} ${selectedOptions.glass?.code === glass ? 'selected' : ''}`}
                  style={{ backgroundColor: glass }}
                  onClick={() => handleGlassClick(glass)}
                  data-tooltip={selectedOptions.glass?.code === glass ? selectedOptions.glass.name : ''}
                ></div>
              ))}
            </div>
          </div>
          <div className="content-item">
            <h3 className="content-heading">Range</h3>
            <label className='radio-btn-label'>
              <input
                style={{ display: 'block' }}
                type="radio"
                value="mr"
                checked={selectedOptions.range.value === 'mr'}
                onChange={handleRangeChange}
              />
              MR: Standard Range (390 mi)
            </label>
            <label className='radio-btn-label'>
              <input
                className='radio-btn'
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
            <label className='radio-btn-label'>
              <input
                type="radio"
                value="3.3 kw ac charger box"
                checked={selectedOptions.chargerType.value === '3.3 kw ac charger box'}
                onChange={handleChargerTypeChange}
              />
              3.3 KW AC Charger Box
            </label>
            <label className='radio-btn-label'>
              <input
                type="radio"
                value="7.2 kw ac fast charger box"
                checked={selectedOptions.chargerType.value === '7.2 kw ac fast charger box'}
                onChange={handleChargerTypeChange}
              />
              7.2 KW AC Fast Charger Box
            </label>
          </div>
          <div className="content-item-price">
            <h3 className="content-heading">Base price ₹{carData.basePrice}</h3>
            <div className="content-item-price__next" >
              <p>Addon Price <br/>₹{calculateTotalPrice()}</p>
              <button className="content-item-price-button" onClick={handleSubmit}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#000" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
              </svg></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguratorM4;
