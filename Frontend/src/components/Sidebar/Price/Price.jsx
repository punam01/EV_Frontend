import React from 'react'
import './Price.css'
import Input from '../../AdvFilter/Input';
const Price = ({handlePriceRangeChange}) => {
  const options = [
    "300000-500000",
    "500001-1500000",
    "1500001-2500000",
    "2500001-3500000"
  ];  
  return (
    <Input
      handleChange={handlePriceRangeChange}
      name="cars"
      title="Price Range"
      options={options}
    />
  )
}

export default Price
