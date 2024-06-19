import React from 'react';
import Input from '../../AdvFilter/Input';
import './Category.css';

const Category = ({ handleChange }) => {
  const options = ["Model A", "Model B", "Model C", "Model D"];
  
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
