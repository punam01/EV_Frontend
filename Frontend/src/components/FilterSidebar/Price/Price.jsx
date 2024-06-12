import React from 'react';
import './Prices.css';

const Price = ({ priceRanges, onPriceChange }) => {
  return (
    <>
      <div className="ml">
        <h2 className="sidebar-title price-title">Price</h2>
        {priceRanges.map((range, index) => (
          <label key={index} className="sidebar-label-container">
            <input type="radio" name="price" onChange={() => onPriceChange(range.min, range.max)} />
            <span className="checkmark"></span>{range.label}
          </label>
        ))}
      </div>
    </>
  );
};

export default Price;
