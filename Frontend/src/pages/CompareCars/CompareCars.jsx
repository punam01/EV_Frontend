import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { compareCars } from '../../services/carServices'; // Import your compareCars service

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
      const data = await compareCars(model1, model2); // Call the compareCars service
      setComparisonData(data);
      setError('');
    } catch (err) {
      setError('Error comparing car models');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Car Comparison</h1>
      <div>
        <select style={{display:'block'}} value={model1} onChange={(e) => setModel1(e.target.value)}>
          <option value="">Select Model 1</option>
          {models.map((model) => (
            <option key={model.modelId} value={model.modelId}>{model.name}</option>
          ))}
        </select>
        <select style={{display:'block'}} value={model2} onChange={(e) => setModel2(e.target.value)}>
          <option value="">Select Model 2</option>
          {models.filter((model) => model.modelId !== model1).map((model) => (
            <option key={model.modelId} value={model.modelId}>{model.name}</option>
          ))}
        </select>
        <button onClick={handleCompare}>Compare</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {comparisonData && (
        <div>
          <h2>Comparison Results</h2>
          <p>Base Price of Model 1: ${comparisonData.basePrice1}</p>
          <p>Base Price of Model 2: ${comparisonData.basePrice2}</p>
          <p>Range of Model 1: {comparisonData.range1} miles</p>
          <p>Range of Model 2: {comparisonData.range2} miles</p>
          <p>Top Speed of Model 1: {comparisonData.topSpeed1} mph</p>
          <p>Top Speed of Model 2: {comparisonData.topSpeed2} mph</p>
          <p>Seating Capacity of Model 1: {comparisonData.seatingCapacity1}</p>
          <p>Seating Capacity of Model 2: {comparisonData.seatingCapacity2}</p>
        </div>
      )}
    </div>
  );
};

export default CompareCars;
