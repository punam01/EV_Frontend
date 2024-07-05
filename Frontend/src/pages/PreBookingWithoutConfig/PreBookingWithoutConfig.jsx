import React, { useState } from 'react'
import './PreBookingWithoutConfig.css'
import { useLocation, useNavigate } from 'react-router-dom';
import PersonalDetails from '../../components/PersonalDetailsContainer/PersonalDetails';
const PreBookingWithoutConfig = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedColor, setSelectedColor] = useState("");

    const { car } = location.state || {};
    const handleColorClick = (color) => {
        setSelectedColor(color);
    }
    return (
        <div className='pre-book-no-config-page'>
            <div className="pre-book-no-config-page__image__holder">
                <img src="/assets/images/bmw_no_config.jpg" alt="" />
            </div>
            <div className="pre-book-no-config-page__booking__holder">
                <h2 className='pre-book-no-config-page__booking__holder__title'>Book your {car?car.name:"Car"}</h2>
                <div className="important">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                    </svg>
                    <span>Change the colour and variant any time before completing your purchase at the Experience Centre.</span>
                </div>

                <div className="pre-book-no-config-page__booking__holder__cardets">
                    <h3     className="pre-book-no-config-page__title">Pick your variant</h3>
                    <div className="pre-book-no-config-page__selected_car">
                        <div className="pre-book-no-config-page__selected_car__left">
                            <h3>{car.modelId}</h3>
                            <div className="car-info">
                                <p>{car.topSpeed} mph . </p>
                                <span>{" " +car.seatingCapacity} Seating Interior</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pre-book-no-config-page__color__holder">
                    <div className="pre-book-no-config-page__title__container">
                        <h3 className="pre-book-no-config-page__title">Pick your variant</h3>
                        <span>{selectedColor}</span>
                    </div>
                    <div className="pre-book-no-config-page__title__standard-color">
                        {car.customizableOptions[0].options.map(color => (
                            <div
                                key={color.name}
                                className={`pre-book-no-config-page__title__color-swatch ${color.name} ${selectedColor === color.name ? 'selected' : ''}`}
                                style={{ backgroundColor: color.code }}
                                onClick={() => handleColorClick(color.name)}
                                data-tooltip={selectedColor}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
            {<div className="pre-book-no-config-page__fixed-bottom">
                        <div className="fixed-bottom-top">
                            <p>Booking amount</p>
                            <div className="fixed-bottom-right">
                                <span>Fully refundable
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                                </svg>
                                <p>$100</p>
                            </div>
                        </div>
                        <div className="fixed-bottom-bottom">
                            <button className='fixed-bottom-bottom__btn'>NEXT</button>
                        </div>
            </div>}
        </div>
    )
}

export default PreBookingWithoutConfig
