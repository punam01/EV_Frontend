import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import {toast} from 'react-toastify'
import PhoneVerification from './PhoneVerification';
import OTPVerification from './OTPVerification';
import UserData from './UserData';
import { getCarAvailabilityByPincode } from '../../services/locationServices';
import { createDemoBooking } from '../../services/testRideService';
import './DemoDriveBooking.css';
import { useNavigate } from 'react-router-dom';

const DemoDriveBooking = () => {
    const [phone, setPhone] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [availableModels, setAvailableModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [bookingSubmitted, setBookingSubmitted] = useState(false);
    const [userData, setUserData] = useState(null); // Updated to check localStorage
    const [bookingDetails, setBookingDetails] = useState(null);
    const [showBooking, setShowBooking] = useState(false);
    const [showLocationSelection, setShowLocationSelection] = useState(false);
    const navigate=useNavigate()
    useEffect(() => {
        const userFromLocalStorage = localStorage.getItem('USER');
        if (userFromLocalStorage) {
            // User is logged in, fetch only zipcode
            const zip=localStorage.getItem('zip')
            setUserData(zip);
            fetchLocations(zip);
        }
    }, []);

    const fetchLocations = async (zipCode) => {
        try {
            const data = await getCarAvailabilityByPincode(zipCode);
            setLocations(data);
            setShowLocationSelection(true);
        } catch (error) {
            console.error('Error fetching locations:', error.message);
        }
    };

    const handleModelChange = (e) => setSelectedModel(e.target.value);
    const handleDateChange = (e) => setSelectedDate(e.target.value);
    const handleTimeChange = (e) => setSelectedTime(e.target.value);

    const handleSubmit = async () => {
    try {
        const bookingResponse = await createDemoBooking(
            localStorage.getItem('email'),
            selectedLocation._id,
            selectedModel,
            selectedTime,
            localStorage.getItem('phone')
        );
        setBookingDetails(bookingResponse);
        setBookingSubmitted(true);
    } catch (error) {
        console.error('Error creating demo booking:', error.message);
        
            toast.error('You can only book one test drive.');
            navigate('/profile')
        
    }
};


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFetchLocations = async () => {
        await fetchLocations(userData.zipCode);
    };

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
        const models = location.availability.map(item => item.carModel);
        setAvailableModels(models);
    };

    return (
        <div className='demo-drive-page'>
            <div className="demo-img-holder"></div>
            <div className="demo-booking-holder">
                {!bookingSubmitted ? (
                    <>
                        {!userData ? ( // Show initial user details if not logged in
                            <div className="demo-user-details">
                                <div id="recaptcha-container"></div>
                                <Toaster position="top-center" toastOptions={{ success: { duration: 3000 } }} />
                                <PhoneVerification
                                    phone={phone}
                                    setPhone={setPhone}
                                    setShowOtp={setShowOtp}
                                    loading={loading}
                                    setLoading={setLoading}
                                    otpSent={otpSent}
                                />
                                {showOtp && !otpVerified && (
                                    <OTPVerification
                                        setOtpVerified={setOtpVerified}
                                        setOtpSent={setOtpSent}
                                    />
                                )}
                                {otpVerified && (
                                    <>
                                        <div className="zip-code">
                                            <label>Zip Code:</label>
                                            <input type="text" name="zipCode" value={userData?.zipCode || ''} onChange={handleChange} />
                                        </div>
                                        <button onClick={handleFetchLocations}>Find Locations</button>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="demo-booking-details">
                                <div className="locations">
                                    <h3>Select Location</h3>
                                    <div className="location-container">
                                        {locations.length > 0 ? (
                                            locations.map(location => (
                                                <div
                                                    key={location._id}
                                                    className={`location-card ${selectedLocation === location ? 'active' : ''}`}
                                                    onClick={() => handleLocationSelect(location)}
                                                >
                                                    <p className="location-name">
                                                        {location.name}, {location.city}, {location.state}
                                                    </p>
                                                    <span className="location-address">
                                                        {location.address}, {location.contact}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <div>No locations found</div>
                                        )}
                                    </div>
                                </div>
                                {selectedLocation && (
                                    <div className="models">
                                        <h3>Select Model</h3>
                                        <select
                                            name="models"
                                            id="models"
                                            value={selectedModel}
                                            onChange={handleModelChange}
                                            style={{display:"block"}}
                                        >
                                            <option value="">Select a model</option>
                                            {availableModels.map((model, index) => (
                                                <option key={index} value={model}>{model}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                {selectedModel && (
                                    <div className="date">
                                        <h3>Select Date</h3>
                                        <input
                                            type="date"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                        />
                                    </div>
                                )}
                                {selectedDate && (
                                    <div className="time">
                                        <h3>Select Time</h3>
                                        <select
                                            name="times"
                                            id="times"
                                            value={selectedTime}
                                            onChange={handleTimeChange}
                                            style={{display:"block"}}
                                        >
                                            <option value="">Select a time</option>
                                            {selectedLocation.availability.find(a => a.carModel === selectedModel)?.availableTimes.map((time, index) => (
                                                <option key={index} value={time}>{time}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                                {selectedTime && (
                                    <div className="book-button">
                                        <button onClick={handleSubmit}>Book Demo Drive</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="congratulations-message">
                        <h2>Congratulations!</h2>
                        <p>Your test drive has been booked successfully.</p>
                        <div className="booking-details">
                            <p><strong>Location:</strong> {selectedLocation.name}, {selectedLocation.city}, {selectedLocation.state}</p>
                            <p><strong>Model:</strong> {selectedModel}</p>
                            <p><strong>Date:</strong> {selectedDate}</p>
                            <p><strong>Time:</strong> {selectedTime}</p>
                            <p><strong>Contact:</strong> {phone}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DemoDriveBooking;
