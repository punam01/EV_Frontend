import React from 'react';
import './Configurator.css';

const ConfiguratorM4 = ({ onSelectColor, onSelectIntColor, onSelectWheel, onSelectWinGlass }) => {

  const handleColorClick = (color) => {
    console.log('onSelectColor prop:', onSelectColor);
    if (onSelectColor) {
      onSelectColor(color);
      console.log("Selected exterior color:", color);
    } else {
      console.error("onSelectColor is not a function or is undefined.");
    }
  };

  const handleIntColorClick = (color) => {
    if (onSelectIntColor) {
      onSelectIntColor(color);
      console.log("Selected interior color:", color);
    } else {
      console.error("onSelectIntColor is not a function or is undefined.");
    }
  };

  const handleWheelClick = (color) => {
    if (onSelectWheel) {
      onSelectWheel(color);
      console.log("Selected interior color:", color);
    } else {
      console.error("onSelectIntColor is not a function or is undefined.");
    }
  };

  const handleGlassClick = (color) => {
    if (onSelectWinGlass) {
      onSelectWinGlass(color);
      console.log("Selected interior color:", color);
    } else {
      console.error("onSelectIntColor is not a function or is undefined.");
    }
  };
  return (
    <>
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
              <div className="color-swatch cream" onClick={() => handleColorClick('#D9D9D9')}></div>
              <div className="color-swatch olive" onClick={() => handleColorClick('#68736B')}></div>
              <div className="color-swatch gray" onClick={() => handleColorClick('#333333')}></div>
              <div className="color-swatch blue" onClick={() => handleColorClick('#001A4D')}></div>
              <div className="color-swatch white" onClick={() => handleColorClick('#F1F1F1')}></div>
            </div>
            <h4 className="content-sub-heading">Interior Colors</h4>
            <div className="standard-color">
              <div className="color-swatch orange" onClick={() => handleIntColorClick('#F5A777')}></div>
              <div className="color-swatch maroon" onClick={() => handleIntColorClick('#730721')}></div>
              <div className="color-swatch black" onClick={() => handleIntColorClick('#070707')}></div>
              <div className="color-swatch whiteint" onClick={() => handleIntColorClick('#F1F1F1')}></div>
            </div>
          </div>
          <div className="content-item">
            <h3 className="content-heading">Wheels</h3>
            <div className="wheel-selection">
              <div className="wheel-swatch">
                <img src='assets/images/rim_gray.webp' alt="Wheel 1" onClick={() => handleWheelClick("gray")} />
              </div>
              <div className="wheel-swatch" >
                <img src='assets/images/rim_black.webp' alt="Wheel 2" onClick={() => handleWheelClick("black")} />
              </div>
            </div>
          </div>
          <div className="content-item">
            <h3 className="content-heading">Glass</h3>
            <div className="standard-color">
              <div className="color-swatch tinted" onClick={() => handleGlassClick('tintedGlass')}></div>
              <div className="color-swatch tempered" onClick={() => handleGlassClick('temperedGlass')}></div>
              <div className="color-swatch laminated" onClick={() => handleGlassClick('laminatedGlass')}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfiguratorM4;
