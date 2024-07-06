import React, { useState } from 'react';
import "./ZipcodeContainer.css";
import Button from '../Button/Button';

const ZipcodeContainer = ({ zipCode, setZipCode, handleFetchLocations, userData }) => {
    const [isValidPincode, setIsValidPincode] = useState(true);
    const [editZipCode, setEditZipCode] = useState(false);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setZipCode(value);
        localStorage.setItem('zip', value);
        const isValid = /^[0-9]{6}$/.test(value); // Allows only 6 digits
        setIsValidPincode(isValid);
    };

    const handleEditClick = () => {
        setEditZipCode(true);
    };

    const handleSaveClick = () => {
        const isValid = /^[0-9]{6}$/.test(zipCode);
        setIsValidPincode(isValid);
        if (isValid) {
            setEditZipCode(false);
        }
        handleFetchLocations();
    };
    return (
        <div className="zipcode-container">
            <label className="zipcode-container__title">Set your location</label>
            <div className="zipcode-container__input-container">
                <input
                    type="text"
                    className={`zipcode-container__input ${!isValidPincode ? 'zipcode-container__input--invalid' : ''}`}
                    value={zipCode || localStorage.getItem('zip')}
                    placeholder='Enter Pincode'
                    disabled={!editZipCode}
                    onChange={handleInputChange}
                />
                {editZipCode ? (
                    <button
                        onClick={handleSaveClick}
                        className="zipcode-container__button"
                    >

                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-down" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1z" />
                            <path fillRule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z" />
                        </svg>
                    </button>
                ) : (
                    <button
                        onClick={handleEditClick}
                        className="zipcode-container__button"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                        </svg>
                    </button>
                )}
                <button
                    onClick={handleFetchLocations}
                    disabled={!isValidPincode}
                    className="zipcode-container__button"
                >
                </button>
            </div>
        </div>
    );
}

export default ZipcodeContainer;
