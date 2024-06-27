import React, { useState } from 'react';
import './Configurator.css';

const ConfiguratorM4 = ({ onSelectColor, onSelectIntColor, onSelectWheel, onSelectWinGlass }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    exteriorColor: null,
    interiorColor: null,
    wheel: null,
    glass: null,
  });

  const prices = {
    exteriorColors: {
      '#D9D9D9': 1000,
      '#68736B': 1200,
      '#333333': 1500,
      '#001A4D': 1800,
      '#F1F1F1': 2000,
    },
    interiorColors: {
      '#F5A777': 800,
      '#730721': 900,
      '#070707': 1000,
      '#F1F1F1': 1100,
    },
    wheels: {
      'gray': 2500,
      'black': 2700,
    },
    glass: {
      'tintedGlass': 300,
      'temperedGlass': 400,
      'laminatedGlass': 500,
    },
  };

  const calculateTotalPrice = () => {
    const { exteriorColor, interiorColor, wheel, glass } = selectedOptions;
    return (exteriorColor ? prices.exteriorColors[exteriorColor] : 0) +
           (interiorColor ? prices.interiorColors[interiorColor] : 0) +
           (wheel ? prices.wheels[wheel] : 0) +
           (glass ? prices.glass[glass] : 0);
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

  const handleWheelClick = (color) => {
    if (onSelectWheel) {
      onSelectWheel(color);
    }
    setSelectedOptions(prev => ({ ...prev, wheel: color }));
  };

  const handleGlassClick = (color) => {
    if (onSelectWinGlass) {
      onSelectWinGlass(color);
    }
    setSelectedOptions(prev => ({ ...prev, glass: color }));
  };

  return (
    <div className='config-container'>
      <h1 className='car-name-container'>BMW m4 f82</h1>
      <div className='configurator'>
        <div className="configurator-content">
          <div className="content-item">
            <h3 className='content-heading'>Power</h3>
            <table>
              <tbody>
                <tr>
                  <td>Max. Power</td>
                  <td style={{ float: 'right' }}>379hp</td>
                </tr>
                <tr>
                  <td>0-60mph</td>
                  <td style={{ float: 'right' }}>4.0s</td>
                </tr>
                <tr>
                  <td>Top track speed</td>
                  <td style={{ float: 'right' }}>182mile/h</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="content-item">
            <h3 className="content-heading">Paint Color</h3>
            <h4 className="content-sub-heading">Exterior Colors</h4>
            <div className="standard-color">
              <div className={`color-swatch cream ${selectedOptions.exteriorColor === '#D9D9D9' ? 'selected' : ''}`} onClick={() => handleColorClick('#D9D9D9')}></div>
              <div className={`color-swatch olive ${selectedOptions.exteriorColor === '#68736B' ? 'selected' : ''}`} onClick={() => handleColorClick('#68736B')}></div>
              <div className={`color-swatch gray ${selectedOptions.exteriorColor === '#333333' ? 'selected' : ''}`} onClick={() => handleColorClick('#333333')}></div>
              <div className={`color-swatch blue ${selectedOptions.exteriorColor === '#001A4D' ? 'selected' : ''}`} onClick={() => handleColorClick('#001A4D')}></div>
              <div className={`color-swatch white ${selectedOptions.exteriorColor === '#F1F1F1' ? 'selected' : ''}`} onClick={() => handleColorClick('#F1F1F1')}></div>
            </div>
            <h4 className="content-sub-heading">Interior Colors</h4>
            <div className="standard-color">
              <div className={`color-swatch orange ${selectedOptions.interiorColor === '#F5A777' ? 'selected' : ''}`} onClick={() => handleIntColorClick('#F5A777')}></div>
              <div className={`color-swatch maroon ${selectedOptions.interiorColor === '#730721' ? 'selected' : ''}`} onClick={() => handleIntColorClick('#730721')}></div>
              <div className={`color-swatch black ${selectedOptions.interiorColor === '#070707' ? 'selected' : ''}`} onClick={() => handleIntColorClick('#070707')}></div>
              <div className={`color-swatch whiteint ${selectedOptions.interiorColor === '#F1F1F1' ? 'selected' : ''}`} onClick={() => handleIntColorClick('#F1F1F1')}></div>
            </div>
          </div>
          <div className="content-item">
            <h3 className="content-heading">Wheels</h3>
            <div className="wheel-selection">
              <div className={`wheel-swatch ${selectedOptions.wheel === 'gray' ? 'selected' : ''}`}>
                <img src='assets/images/rim_gray.webp' alt="Wheel 1" onClick={() => handleWheelClick("gray")} />
              </div>
              <div className={`wheel-swatch ${selectedOptions.wheel === 'black' ? 'selected' : ''}`}>
                <img src='assets/images/rim_black.webp' alt="Wheel 2" onClick={() => handleWheelClick("black")} />
              </div>
            </div>
          </div>
          <div className="content-item">
            <h3 className="content-heading">Glass</h3>
            <div className="standard-color">
              <div className={`color-swatch tinted ${selectedOptions.glass === 'tintedGlass' ? 'selected' : ''}`} onClick={() => handleGlassClick('tintedGlass')}></div>
              <div className={`color-swatch tempered ${selectedOptions.glass === 'temperedGlass' ? 'selected' : ''}`} onClick={() => handleGlassClick('temperedGlass')}></div>
              <div className={`color-swatch laminated ${selectedOptions.glass === 'laminatedGlass' ? 'selected' : ''}`} onClick={() => handleGlassClick('laminatedGlass')}></div>
            </div>
          </div>
          <div className="content-item">
            <h3 className="content-heading">Total Price</h3>
            <p className="total-price">${calculateTotalPrice()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfiguratorM4;
