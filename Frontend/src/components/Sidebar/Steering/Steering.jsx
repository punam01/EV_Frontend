import React from 'react';
import Input from '../../AdvFilter/Input';

const Steering = ({ handleChange }) => {
  const options = ["wheel", "yoke"];

  return (
    <Input 
      handleChange={handleChange}
      name="steering"
      title="Steering"
      options={options} // Mapping options to expected format
    />
  );
}

export default Steering;
