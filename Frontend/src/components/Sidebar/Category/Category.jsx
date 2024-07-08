import React from 'react';
import Input from '../../AdvFilter/Input';
import './Category.css';

const Category = ({ handleChange,cars }) => {
  const options = cars.map(car => car.modelId);
  return (
    <Input 
      handleChange={handleChange}
      name="cars"
      title="Car Model"
      options={options}
    />
  );
}

export default Category;
