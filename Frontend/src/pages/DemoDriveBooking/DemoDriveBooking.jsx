import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-toastify';
import PhoneVerification from './PhoneVerification';
import OTPVerification from './OTPVerification';
import { getCarAvailabilityByPincode } from '../../services/locationServices';
import { createDemoBooking } from '../../services/testRideService';
import { registerUser } from '../../services/userServices';
import './DemoDriveBooking.css';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingSuccess from '../../components/BookingSuccess/BookingSuccess';
import TimeContainer from '../../components/TimeContainer/TimeContainer';
import LocationContainer from '../../components/LocationContainer/LocationContainer';
import ModelContainer from '../../components/ModelContainer/ModelContainer';
import DateContainer from '../../components/DateContainer/DateContainer';
import Button from '../../components/Button/Button';
import ZipcodeContainer from '../../components/ZipcodeContainer/ZipcodeContainer';
import PersonalDetails from '../../components/PersonalDetailsContainer/PersonalDetails';
import BookingSummary from '../../components/BookingSummary/BookingSummary';

const DemoDriveBooking = () => {
    const location = useLocation();
    const { car } = location.state || {};
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
    const [userData, setUserData] = useState({ first_name: '',last_name:'', email: '', zipCode: '' });
    const [bookingDetails, setBookingDetails] = useState(null);
    const [showUserDetails, setShowUserDetails] = useState(true);
    const navigate = useNavigate();
    const userFromLocalStorage = localStorage.getItem('USER');
    const [userId, setUserId] = useState('');
    const [zipCode, setZipCode] = useState('');

    useEffect(() => {
        if (userFromLocalStorage) {
            const user = userFromLocalStorage;
            setUserId(user);
            if (localStorage.getItem('zip')) {
                fetchLocations(localStorage.getItem('zip'));
            }
        }
    }, [userFromLocalStorage]);

    useEffect(() => {
        if (car && selectedLocation) {
            const model = availableModels.find(m => m === car.modelId);
            if (model) {
                setSelectedModel(model);
            }
        }
    }, [car, selectedLocation, availableModels]);

    const handleRegister = async () => {
        try {
            const registeredUser = await registerUser({
                custom_id: localStorage.getItem('customId'),
                first_name: userData.first_name,
                last_name:userData.last_name,
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
            setLocations([]);
        }
    };

    const handleModelChange = (model) => {
        setSelectedModel(model);
        const times = selectedLocation?.availability.find(a => a.carModel === model)?.availableTimes || [];
        setAvailableTimes(times);
    };

    const handleDateChange = (e) => setSelectedDate(e.target.value);
    const handleTimeChange = (time) => setSelectedTime(time);

    const handleSubmit = async () => {
        const user = localStorage.getItem('USER');
        const phone = localStorage.getItem('phone');
    
        if (!user || !selectedLocation?._id || !selectedModel || !selectedTime || !selectedDate || !phone) {
            toast.error("All fields are required", {
                duration: 3000,
            });
            return;
        }
    
        try {
            const bookingResponse = await createDemoBooking(
                user,
                selectedLocation._id,
                selectedModel,
                selectedTime,
                selectedDate,
                phone
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
        console.log("dd:",zipCode)
        fetchLocations(zipCode).then((locations) => {
            if (locations && locations.length === 0) {
                toast.error('No locations found. Please try another ZIP code.');
            }
        });
    };

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
        const models = location.availability.map(item => item.carModel);
        setAvailableModels(models);
        setShowUserDetails(false); 

        if (car) {
            setSelectedModel(car.modelId);
        }
    };

    const isFormValid = () => {
        return selectedLocation && selectedModel && selectedDate && selectedTime;
    };

    const homePageRedirect = () => {
        navigate('/');
    };

    return (
        <div className='demo-drive-page'>
            <div className="demo-img-holder">
                <video src="/assets/images/bmw_video.mp4" autoPlay muted loop></video>
            </div>
            <div className="demo-booking-holder">
                {!bookingSubmitted ? (
                    <>
                        {showUserDetails && !userFromLocalStorage ? (
                            <div className="demo-user-details">
                                <h1>Book <span>{car && car.name}</span> Demo Drive</h1>
                                <div id="recaptcha-container"></div>
                                <Toaster position="top-center" toastOptions={{ success: { duration: 3000 } }} />
                                <PhoneVerification
                                    phone={phone}
                                    setPhone={setPhone}
                                    setShowOtp={setShowOtp}
                                    loading={loading}
                                    setLoading={setLoading}
                                    otpSent={otpSent}
                                    setOtpSent={setOtpSent}
                                    />

                                {showOtp && !otpVerified && (
                                    <OTPVerification
                                        setOtpVerified={setOtpVerified}
                                        setOtpSent={setOtpSent}
                                    />
                                )}
                                <PersonalDetails userData={userData} handleChange={handleChange} handleRegister={handleRegister} disabled={!otpVerified} />
                            </div>
                        ) : (
                            <div className="demo-booking-details">
                                <h1>Book <span>{car && car.name}</span> Demo Drive</h1>
                                <ZipcodeContainer zipCode={zipCode} setZipCode={setZipCode} handleFetchLocations={handleFetchLocations} userData={userData}/>
                                <LocationContainer locations={locations} selectedLocation={selectedLocation} handleLocationSelect={handleLocationSelect} disabled={!zipCode} />
                                {!car && <ModelContainer availableModels={availableModels} selectedModel={selectedModel} handleModelChange={handleModelChange} disabled={!selectedLocation} />}
                                <DateContainer selectedDate={selectedDate} handleDateChange={handleDateChange} disabled={!selectedModel} />
                                <TimeContainer selectedTime={selectedTime} availableTimes={availableTimes} handleTimeChange={handleTimeChange} disabled={!selectedDate} />
                                {isFormValid() && (
                                    <BookingSummary
                                        locationName={selectedLocation.name}
                                        locationCity={selectedLocation.city}
                                        locationState={selectedLocation.state}
                                        selectedModel={selectedModel}
                                        selectedDate={selectedDate}
                                        selectedTime={selectedTime}
                                    />
                                )}
                                <Button handleBtnClick={handleSubmit} btnText={'Book Demo Drive'} disabled={!isFormValid()} />
                            </div>
                        )}
                    </>
                ) : (
                    selectedLocation && selectedDate && selectedTime && selectedModel && (
                        <BookingSuccess
                            locationName={selectedLocation.name}
                            locationCity={selectedLocation.city}
                            locationState={selectedLocation.state}
                            selectedModel={selectedModel}
                            selectedDate={selectedDate}
                            selectedTime={selectedTime}
                            homePageRedirect={homePageRedirect}
                        />
                    )
                )}
            </div>
        </div>
    );
};

export default DemoDriveBooking;
