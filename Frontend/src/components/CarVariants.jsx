import React, { useEffect, useState } from 'react';
import { getAllVariants } from '../services/carServices';

const CarVariants = ({ modelName }) => {
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const data = await getAllVariants(modelName);
        setVariants(data);
      } catch (error) {
        console.error("Error fetching variants:", error);
      }
    };

    fetchVariants();
  }, [modelName]);

  return (
    <div>
      <h1>Variants for {modelName}</h1>
      <ul>
        {variants.map(variant => (
          <li key={variant.name}>
            <h2>{variant.name}</h2>
            <p>Price: {variant.price}</p>
            <p>Features: {variant.features}</p>
            <ul>
              {Array.isArray(variant.customizableOptions) ? variant.customizableOptions.map(option => (
                <li key={option.name}>
                  <p>Option: {option.name}</p>
                  <p>Price: {option.price}</p>
                </li>
              )) : <p>No customizable options available</p>}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarVariants;
