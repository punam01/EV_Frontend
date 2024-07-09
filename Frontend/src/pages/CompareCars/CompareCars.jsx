import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { compareCars } from '../../services/carServices';
import './CompareCars.css'
import { Link } from 'react-router-dom';
const CompareCars = () => {
  const [models, setModels] = useState([]);
  const [model1, setModel1] = useState('');
  const [model2, setModel2] = useState('');
  const [comparisonData, setComparisonData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/car/models');
        setModels(response.data);
      } catch (err) {
        setError('Error fetching car models');
      }
    };

    fetchModels();
  }, []);

  const handleCompare = async () => {
    if (!model1 || !model2 || model1 === model2) {
      setError('Please select two different car models for comparison.');
      return;
    }

    try {
      const data = await compareCars(model1, model2);
      setComparisonData(data);
      console.log(data)
      setError('');
    } catch (err) {
      setError('Error comparing car models');
      console.error(err);
    }
  };

  return (
    <div className='car-compare-container'>
      <h1 className='car-compare-container__header'>Compare BMW models</h1>
      <div className='car-compare-container__link'>
        <Link className="car-compare-container__link-link" to="/cars">Book Now</Link>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#31A93E" class="bi bi-arrow-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
        </svg>
      </div>
      <div className='car-compare-container__select-models'>
        <div className="car-compare-container__select__left">
          <select className="car-compare-container__select-select" style={{ display: 'block' }} value={model1} onChange={(e) => setModel1(e.target.value)}>
            <option value="">Select Model 1</option>
            {models.map((model) => (
              <option key={model.modelId} value={model.modelId}>{model.name}</option>
            ))}
          </select>
          {comparisonData && (
            <div className='car-compare-container__result'>
              <div className="car-compare-container__result__item">
                <div className="car-compare-container__result__item-item">
                  <img src="/assets/images/car_3d_t.png" alt="Car Model 1" />
                </div>
                <div className="car-compare-container__result__item-item">
                  <div className="car-compare-container__result__item-item">
                    <div className="car-compare-container__standard-color">
                      {comparisonData.customizableOptions1.find(option => option.name === 'Exterior Color')?.options.map(color => (
                        <div
                          key={color.code}
                          className="color-swatch"
                          style={{ backgroundColor: color.code }}
                          onClick={() => handleColorClick(color.name)}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="car-compare-container__result__item-item-col">
                  <p className='car-compare-container__result__item__basePrice'>From ${comparisonData.basePrice1}.00*</p><br />
                  <Link className="car-compare-container__result__item-link" to="/noconfig">Book now</Link>
                  <Link className="car-compare-container__result__item-link-nobg" to="/cars">Learn More</Link>
                </div>
                <div className="car-compare-container__result__item-item-col">
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#000000" class="bi bi-luggage" viewBox="0 0 16 16">
                    <path d="M2.5 1a.5.5 0 0 0-.5.5V5h-.5A1.5 1.5 0 0 0 0 6.5v7a1.5 1.5 0 0 0 1 1.415v.335a.75.75 0 0 0 1.5 0V15H4v-1H1.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5V7h1v-.5A1.5 1.5 0 0 0 6.5 5H6V1.5a.5.5 0 0 0-.5-.5zM5 5H3V2h2z" />
                    <path d="M3 7.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0zM11 6a1.5 1.5 0 0 1 1.5 1.5V8h2A1.5 1.5 0 0 1 16 9.5v5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 14.5v-5A1.5 1.5 0 0 1 6.5 8h2v-.5A1.5 1.5 0 0 1 10 6zM9.5 7.5V8h2v-.5A.5.5 0 0 0 11 7h-1a.5.5 0 0 0-.5.5M6 9.5v5a.5.5 0 0 0 .5.5H7V9h-.5a.5.5 0 0 0-.5.5m7 5.5V9H8v6zm1.5 0a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5H14v6z" />
                  </svg>
                  <p>Spacious cargo capacity of {comparisonData.cargoCapacity1} cu. ft.</p>
                </div>
                <div className="car-compare-container__result__item-item-col">
                  <svg fill="#000000" height="70" width="70" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 353.926 353.926" xml:space="preserve">
                    <path d="M210.286,344.926c0,4.971-4.029,9-9,9h-48.65c-4.971,0-9-4.029-9-9s4.029-9,9-9h48.65
	C206.257,335.926,210.286,339.955,210.286,344.926z M289.677,258.958v25.928c0,19.259-15.67,34.928-34.931,34.928H99.177
	c-19.259,0-34.928-15.668-34.928-34.928v-25.928c0-4.971,4.029-9,9-9h2.394c-0.021-0.258-0.033-0.52-0.033-0.784v-24.118
	c-0.013-0.535,0.023-1.066,0.105-1.588c0.204-1.329,0.699-2.561,1.418-3.631c0.705-1.055,1.639-1.969,2.767-2.659
	c0.457-0.281,0.94-0.522,1.446-0.719c3.564-1.483,7.107-3.016,10.605-4.586V101.909c0-17.877,11.375-33.581,27.599-39.623
	c-0.019-0.492-0.028-0.984-0.028-1.48V38.578C119.521,17.306,136.827,0,158.098,0h37.725C217.095,0,234.4,17.306,234.4,38.578
	v22.229c0,0.495-0.01,0.988-0.028,1.478c6.395,2.378,12.129,6.28,16.702,11.351c0.16-0.3,0.318-0.599,0.478-0.899
	c2.318-4.396,7.761-6.081,12.16-3.76c4.396,2.319,6.079,7.764,3.76,12.16c-16.845,31.926-41.307,61.508-72.707,87.923
	c-25.063,21.083-53.512,39.294-84.813,54.313v26.586h134.02V141.64c0-4.971,4.029-9,9-9s9,4.029,9,9v108.318h18.706
	C285.647,249.958,289.677,253.987,289.677,258.958z M137.521,60.807c0,1.842,0.243,3.629,0.699,5.33
	c0.073,0.22,0.138,0.444,0.193,0.672c2.574,8.428,10.424,14.576,19.684,14.576h37.725c9.259,0,17.109-6.146,19.685-14.573
	c0.057-0.231,0.122-0.458,0.195-0.68c0.455-1.699,0.698-3.484,0.698-5.325V38.578C216.4,27.231,207.169,18,195.822,18h-37.725
	c-11.346,0-20.576,9.231-20.576,20.578V60.807z M109.951,203.272c56.184-28.521,102.335-68.15,131.162-112.739
	c-2.612-4.871-6.75-8.658-11.666-10.83c-6.622,11.738-19.213,19.681-33.625,19.681h-37.725c-14.411,0-27.002-7.944-33.624-19.682
	c-8.604,3.8-14.522,12.438-14.522,22.207V203.272z M271.677,267.958h-18.57c-0.046,0-0.091,0.001-0.136,0.001h-152.02
	c-0.045,0-0.09,0-0.136-0.001H82.249v16.928c0,9.334,7.594,16.928,16.928,16.928h155.569c9.336,0,16.931-7.594,16.931-16.928
	V267.958z"/>
                  </svg>
                  <p>Comfortably accommodates up to {comparisonData.seatingCapacity1} passengers.</p>
                </div>
                <div className="car-compare-container__result__item-item-col">
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#000000" class="bi bi-speedometer2" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z" />
                    <path fill-rule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A8 8 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3" />
                  </svg>
                  <p>Accelerates from 0 to 60 mph in {comparisonData.acceleration1} seconds.</p>
                </div>
                <div className="car-compare-container__result__item-item-col">
                  <svg width="70" height="70" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                    <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M24 44V32" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4 24H16" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M44 24H32" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M32 24C32 28.4183 28.4183 32 24 32C19.5817 32 16 28.4183 16 24C16 19.5817 19.5817 16 24 16C28.4183 16 32 19.5817 32 24Z" fill="#2F88FF" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M32 24C32 28.4183 28.4183 32 24 32C19.5817 32 16 28.4183 16 24C16 19.5817 19.5817 16 24 16C28.4183 16 32 19.5817 32 24Z" fill="#2F88FF" />
                    <path d="M32 24C32 28.4183 28.4183 32 24 32C19.5817 32 16 28.4183 16 24C16 19.5817 19.5817 16 24 16C28.4183 16 32 19.5817 32 24Z" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <p>{comparisonData.steering1}</p>
                </div>
                <div className="car-compare-container__result__item-item-col">
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#000000" class="bi bi-ev-station" viewBox="0 0 16 16">
                    <path d="M3.5 2a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5zm2.131 10.46H4.14v-.893h1.403v-.505H4.14v-.855h1.49v-.54H3.485V13h2.146zm1.316.54h.794l1.106-3.333h-.733l-.74 2.615h-.031l-.747-2.615h-.764z" />
                    <path d="M3 0a2 2 0 0 0-2 2v13H.5a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1H11v-4a1 1 0 0 1 1 1v.5a1.5 1.5 0 0 0 3 0V4a.5.5 0 0 0-.146-.354l-.5-.5a.5.5 0 0 0-.707 0l-.5.5A.5.5 0 0 0 13 4v3c0 .71.38 1.096.636 1.357l.007.008c.253.258.357.377.357.635v3.5a.5.5 0 1 1-1 0V12a2 2 0 0 0-2-2V2a2 2 0 0 0-2-2zm7 2v13H2V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1" />
                  </svg>
                  <p>{comparisonData.chargerType1}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="car-compare-container__select__right">
          <select className="car-compare-container__select-select" style={{ display: 'block' }} value={model2} onChange={(e) => setModel2(e.target.value)}>
            <option value="">Select Model 2</option>
            {models.filter((model) => model.modelId !== model1).map((model) => (
              <option key={model.modelId} value={model.modelId}>{model.name}</option>
            ))}
          </select>
          {comparisonData && (
            <div className='car-compare-container__result'>
              <div className="car-compare-container__result__item">
                <div className="car-compare-container__result__item-item">
                  <img src="/assets/images/car_3d_t.png" alt="Car Model 1" />
                </div>
                <div className="car-compare-container__result__item-item">
                  <div className="car-compare-container__result__item-item">
                    <div className="car-compare-container__standard-color">
                      {comparisonData.customizableOptions1.find(option => option.name === 'Exterior Color')?.options.map(color => (
                        <div
                          key={color.code}
                          className="color-swatch"
                          style={{ backgroundColor: color.code }}
                          onClick={() => handleColorClick(color.name)}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="car-compare-container__result__item-item-col">
                  <p className='car-compare-container__result__item__basePrice'>From ${comparisonData.basePrice1}.00*</p><br />
                  <Link className="car-compare-container__result__item-link" to="/noconfig">Book now</Link>
                  <Link className="car-compare-container__result__item-link-nobg" to="/cars">Learn More</Link>
                </div>
                <div className="car-compare-container__result__item-item-col">
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#000000" class="bi bi-luggage" viewBox="0 0 16 16">
                    <path d="M2.5 1a.5.5 0 0 0-.5.5V5h-.5A1.5 1.5 0 0 0 0 6.5v7a1.5 1.5 0 0 0 1 1.415v.335a.75.75 0 0 0 1.5 0V15H4v-1H1.5a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5V7h1v-.5A1.5 1.5 0 0 0 6.5 5H6V1.5a.5.5 0 0 0-.5-.5zM5 5H3V2h2z" />
                    <path d="M3 7.5a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0zM11 6a1.5 1.5 0 0 1 1.5 1.5V8h2A1.5 1.5 0 0 1 16 9.5v5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 14.5v-5A1.5 1.5 0 0 1 6.5 8h2v-.5A1.5 1.5 0 0 1 10 6zM9.5 7.5V8h2v-.5A.5.5 0 0 0 11 7h-1a.5.5 0 0 0-.5.5M6 9.5v5a.5.5 0 0 0 .5.5H7V9h-.5a.5.5 0 0 0-.5.5m7 5.5V9H8v6zm1.5 0a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5H14v6z" />
                  </svg>
                  <p>Spacious cargo capacity of {comparisonData.cargoCapacity} cu. mt.</p>
                </div>
                <div className="car-compare-container__result__item-item-col">
                  <svg fill="#000000" height="70" width="70" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 353.926 353.926" xml:space="preserve">
                    <path d="M210.286,344.926c0,4.971-4.029,9-9,9h-48.65c-4.971,0-9-4.029-9-9s4.029-9,9-9h48.65
	C206.257,335.926,210.286,339.955,210.286,344.926z M289.677,258.958v25.928c0,19.259-15.67,34.928-34.931,34.928H99.177
	c-19.259,0-34.928-15.668-34.928-34.928v-25.928c0-4.971,4.029-9,9-9h2.394c-0.021-0.258-0.033-0.52-0.033-0.784v-24.118
	c-0.013-0.535,0.023-1.066,0.105-1.588c0.204-1.329,0.699-2.561,1.418-3.631c0.705-1.055,1.639-1.969,2.767-2.659
	c0.457-0.281,0.94-0.522,1.446-0.719c3.564-1.483,7.107-3.016,10.605-4.586V101.909c0-17.877,11.375-33.581,27.599-39.623
	c-0.019-0.492-0.028-0.984-0.028-1.48V38.578C119.521,17.306,136.827,0,158.098,0h37.725C217.095,0,234.4,17.306,234.4,38.578
	v22.229c0,0.495-0.01,0.988-0.028,1.478c6.395,2.378,12.129,6.28,16.702,11.351c0.16-0.3,0.318-0.599,0.478-0.899
	c2.318-4.396,7.761-6.081,12.16-3.76c4.396,2.319,6.079,7.764,3.76,12.16c-16.845,31.926-41.307,61.508-72.707,87.923
	c-25.063,21.083-53.512,39.294-84.813,54.313v26.586h134.02V141.64c0-4.971,4.029-9,9-9s9,4.029,9,9v108.318h18.706
	C285.647,249.958,289.677,253.987,289.677,258.958z M137.521,60.807c0,1.842,0.243,3.629,0.699,5.33
	c0.073,0.22,0.138,0.444,0.193,0.672c2.574,8.428,10.424,14.576,19.684,14.576h37.725c9.259,0,17.109-6.146,19.685-14.573
	c0.057-0.231,0.122-0.458,0.195-0.68c0.455-1.699,0.698-3.484,0.698-5.325V38.578C216.4,27.231,207.169,18,195.822,18h-37.725
	c-11.346,0-20.576,9.231-20.576,20.578V60.807z M109.951,203.272c56.184-28.521,102.335-68.15,131.162-112.739
	c-2.612-4.871-6.75-8.658-11.666-10.83c-6.622,11.738-19.213,19.681-33.625,19.681h-37.725c-14.411,0-27.002-7.944-33.624-19.682
	c-8.604,3.8-14.522,12.438-14.522,22.207V203.272z M271.677,267.958h-18.57c-0.046,0-0.091,0.001-0.136,0.001h-152.02
	c-0.045,0-0.09,0-0.136-0.001H82.249v16.928c0,9.334,7.594,16.928,16.928,16.928h155.569c9.336,0,16.931-7.594,16.931-16.928
	V267.958z"/>
                  </svg>
                  <p>Comfortably accommodates up to {comparisonData.seatingCapacity2} passengers.</p>
                </div>
                <div className="car-compare-container__result__item-item-col">
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#000000" class="bi bi-speedometer2" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4M3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.39.39 0 0 0-.029-.518z" />
                    <path fill-rule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A8 8 0 0 1 0 10m8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3" />
                  </svg>
                  <p>Accelerates from 0 to 60 mph in {comparisonData.acceleration2} seconds.</p>
                </div>
                <div className="car-compare-container__result__item-item-col">
                  <svg width="70" height="70" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="48" height="48" fill="white" fill-opacity="0.01" />
                    <path d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M24 44V32" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M4 24H16" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M44 24H32" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M32 24C32 28.4183 28.4183 32 24 32C19.5817 32 16 28.4183 16 24C16 19.5817 19.5817 16 24 16C28.4183 16 32 19.5817 32 24Z" fill="#2F88FF" />
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M32 24C32 28.4183 28.4183 32 24 32C19.5817 32 16 28.4183 16 24C16 19.5817 19.5817 16 24 16C28.4183 16 32 19.5817 32 24Z" fill="#2F88FF" />
                    <path d="M32 24C32 28.4183 28.4183 32 24 32C19.5817 32 16 28.4183 16 24C16 19.5817 19.5817 16 24 16C28.4183 16 32 19.5817 32 24Z" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  <p>{comparisonData.steering2}</p>
                </div>
                <div className="car-compare-container__result__item-item-col">
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#000000" class="bi bi-ev-station" viewBox="0 0 16 16">
                    <path d="M3.5 2a.5.5 0 0 0-.5.5v5a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-5a.5.5 0 0 0-.5-.5zm2.131 10.46H4.14v-.893h1.403v-.505H4.14v-.855h1.49v-.54H3.485V13h2.146zm1.316.54h.794l1.106-3.333h-.733l-.74 2.615h-.031l-.747-2.615h-.764z" />
                    <path d="M3 0a2 2 0 0 0-2 2v13H.5a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1H11v-4a1 1 0 0 1 1 1v.5a1.5 1.5 0 0 0 3 0V4a.5.5 0 0 0-.146-.354l-.5-.5a.5.5 0 0 0-.707 0l-.5.5A.5.5 0 0 0 13 4v3c0 .71.38 1.096.636 1.357l.007.008c.253.258.357.377.357.635v3.5a.5.5 0 1 1-1 0V12a2 2 0 0 0-2-2V2a2 2 0 0 0-2-2zm7 2v13H2V2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1" />
                  </svg>
                  <p>{comparisonData.chargerType2}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <button className="car-compare-container__select-btn" onClick={handleCompare}>GO</button>
      </div>


      {error && <p style={{ color: 'red' }}>{error}</p>}

    </div>
  );
};

export default CompareCars;
