import React, { useState } from 'react';
import "./ZipcodeContainer.css";
import Button from '../Button/Button';

const ZipcodeContainer = ({ zipCode, setZipCode, handleFetchLocations }) => {
    const [isValidPincode, setIsValidPincode] = useState(true);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setZipCode(value);
        // Validate the pincode length and format
        const isValid = /^[0-9]{6}$/.test(value); // Allows only 6 digits
        setIsValidPincode(isValid);
    };

    return (
        <div className="zipcode-container">
            <label className="zipcode-container__title">Set your location</label>
            <div className="zipcode-container__input-container">
                <input
                    type="text"
                    className={`zipcode-container__input ${!isValidPincode ? 'zipcode-container__input--invalid' : ''}`}
                    value={zipCode}
                    placeholder='Enter Pincode'
                    onChange={handleInputChange}
                />
                <button 
                    onClick={handleFetchLocations}
                    disabled={!isValidPincode} // Disable button if pincode is invalid
                    className="zipcode-container__button"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-crosshair" viewBox="0 0 16 16">
                        <path d="M8.5.5a.5.5 0 0 0-1 0v.518A7 7 0 0 0 1.018 7.5H.5a.5.5 0 0 0 0 1h.518A7 7 0 0 0 7.5 14.982v.518a.5.5 0 0 0 1 0v-.518A7 7 0 0 0 14.982 8.5h.518a.5.5 0 0 0 0-1h-.518A7 7 0 0 0 8.5 1.018zm-6.48 7A6 6 0 0 1 7.5 2.02v.48a.5.5 0 0 0 1 0v-.48a6 6 0 0 1 5.48 5.48h-.48a.5.5 0 0 0 0 1h.48a6 6 0 0 1-5.48 5.48v-.48a.5.5 0 0 0-1 0v.48A6 6 0 0 1 2.02 8.5h.48a.5.5 0 0 0 0-1zM8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default ZipcodeContainer;
