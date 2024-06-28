import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-toastify';
import PhoneVerification from './PhoneVerification';
import OTPVerification from './OTPVerification';
import { getCarAvailabilityByPincode } from '../../services/locationServices';
import { createDemoBooking } from '../../services/testRideService';
import { registerUser } from '../../services/userServices';
import './DemoDriveBooking.css';
import { useNavigate } from 'react-router-dom';
import BookingSuccess from '../../components/BookingSuccess/BookingSuccess';
import TimeContainer from '../../components/TimeContainer/TimeContainer';

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
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState('');
    const [bookingSubmitted, setBookingSubmitted] = useState(false);
    const [userData, setUserData] = useState({ name: '', email: '', zipCode: '' });
    const [bookingDetails, setBookingDetails] = useState(null);
    const [showUserDetails, setShowUserDetails] = useState(true);
    const navigate = useNavigate();
    const userFromLocalStorage = localStorage.getItem('USER');
    const [userId, setUserId] = useState('');
    const [zipCode, setZipCode] = useState('');
    const name = localStorage.getItem("first_name") + ' ' + localStorage.getItem("last_name");

    useEffect(() => {
        if (userFromLocalStorage) {
            const user = userFromLocalStorage;
            setUserId(user);
            if (localStorage.getItem('zip')) {
                fetchLocations(localStorage.getItem('zip'));
            }
        }
    }, [userFromLocalStorage]);

    const handleRegister = async () => {
        try {
            const registeredUser = await registerUser({
                custom_id: localStorage.getItem('customId'),
                first_name: userData.name,
                email: userData.email,
                pincode: userData.zipCode,
                contact: localStorage.getItem('phone').replace('+', '')
            });

            localStorage.setItem('USER', registeredUser._id);
            localStorage.setItem('zip', userData.zipCode);
            setUserId(registeredUser._id);
            fetchLocations(userData.zipCode);
            setShowUserDetails(false);
            toast.success("User details saved");
        } catch (error) {
            console.error('Registration error:', error.message);
            toast.error('User with the same phone number already exists.');
        }
    };

    const fetchLocations = async (zipCode) => {
        try {
            const data = await getCarAvailabilityByPincode(zipCode);
            setLocations(data);
        } catch (error) {
            console.error('Error fetching locations:', error.message);
        }
    };

    const handleModelChange = (model) => {
        setSelectedModel(model);
        const times = selectedLocation.availability.find(a => a.carModel === model)?.availableTimes || [];
        setAvailableTimes(times);
    };
    const handleDateChange = (e) => setSelectedDate(e.target.value);
    const handleTimeChange = (time) => setSelectedTime(time);

    const handleSubmit = async () => {
        try {
            const bookingResponse = await createDemoBooking(
                localStorage.getItem('USER'),
                selectedLocation._id,
                selectedModel,
                selectedTime,
                localStorage.getItem('phone')
            );
            setBookingDetails(bookingResponse);
            setBookingSubmitted(true);
        } catch (error) {
            console.error('Error creating demo booking:', error.message);
            toast.error("Already booked 1 demo", {
                duration: 3000,
                onClose: () => {
                    navigate('/profile');
                },
            });

        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFetchLocations = () => {
        fetchLocations(zipCode);
    };

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
        const models = location.availability.map(item => item.carModel);
        setAvailableModels(models);
        setShowUserDetails(false); // Hide user details after location selection
    };

    const formatTime = (time) => {
        let [hours, minutes] = time.split('T')[1].split(':').slice(0, 2);
        hours = parseInt(hours, 10);
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        return `${hours}:${minutes} ${period}`;
    };

    const homePageRedirect = () => {
        navigate('/')
    }
    return (
        <div className='demo-drive-page'>
            <div className="demo-img-holder">
                <img src="/assets/images/demoimg.jpg" alt="" />
            </div>
            <div className="demo-booking-holder">
                {!bookingSubmitted ? (
                    <>
                        {showUserDetails && !userFromLocalStorage ? (
                            <div className="demo-user-details">

                                <h1>Schedule a DemoDrive</h1>
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
                                        <div className="user-details">
                                            <div className='user-details-item'>
                                                <label>Name:</label>
                                                <input type="text" name="name" value={userData.name} onChange={handleChange} />
                                            </div>
                                            <div className='user-details-item'>
                                                <label>Email:</label>
                                                <input type="email" name="email" value={userData.email} onChange={handleChange} />
                                            </div>
                                            {/*<div className='user-details-item'>
                                                <label>Zip Code:</label>
                                                <input type="text" name="zipCode" value={userData.zipCode} onChange={handleChange} />
                                            </div>-->*/}
                                            <button onClick={handleRegister}>Register and Next</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="demo-booking-details">


                                <h1>Welcome back<br /></h1>
                                <div className="zip-code-input">
                                    <label>Enter Zip Code:</label>
                                    <input type="text" value={zipCode} onChange={(e) => setZipCode(e.target.value)} />
                                    <button onClick={handleFetchLocations}>Find Locations</button>
                                </div>
                                {locations.length > 0 && (
                                    <div className="locations">
                                        <h3>Select Location</h3>
                                        <div className="location-container">
                                            {locations.map(location => (
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
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {selectedLocation && (
                                    <div className="models">
                                        <h3>Select Model</h3>
                                        <div className="model-container">
                                            {availableModels.map((model, index) => (
                                                <div
                                                    key={index}
                                                    className={`model-card ${selectedModel === model ? 'active' : ''}`}
                                                    onClick={() => handleModelChange(model)}
                                                >
                                                    <p>{model}</p>
                                                </div>
                                            ))}
                                        </div>
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
                                {selectedDate && availableTimes.length > 0 && <TimeContainer selectedTime={selectedTime} availableTimes={availableTimes} handleTimeChange={handleTimeChange} />
                                }
                                {selectedTime && (
                                    <div className="book-button">
                                        <button onClick={handleSubmit}>Book Demo Drive</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <BookingSuccess locationName={selectedLocation.name} locationCity={selectedLocation.city} locationState={selectedLocation.state} selectedModel={selectedModel} selectedDate={selectedDate} selectedTime={selectedTime} homePageRedirect={homePageRedirect} />
                )}
            </div>
        </div>
    );
};

export default DemoDriveBooking;
