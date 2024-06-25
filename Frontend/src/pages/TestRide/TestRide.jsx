import React, { useState, useEffect } from 'react';
import './TestRide.css';
import Zipcode from './Zipcode';
import { getCarAvailabilityByPincode, updateTimeSlot } from '../../services/locationServices';
import { createDemoBooking } from '../../services/testRideService';
import { verifyUserDetails } from '../../services/userServices';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const TestRide = () => {
    const navigate = useNavigate();
    const auth = getAuth();

    const [popup, setPopup] = useState(false);
    const [zipcode, setZipcode] = useState('Enter zipcode here');
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);

    const [formDetails, setFormDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        learnAboutEV: false,
        selectedModel: '',
        selectedDate: null,
        selectedTime: null,
    });

    const [isPhoneVerified, setIsPhoneVerified] = useState(false);

    useEffect(() => {
        if (selectedLocation && formDetails.selectedModel) {
            const model = selectedLocation.availability.find(
                (model) => model.carModel === formDetails.selectedModel
            );
            if (model) {
                setAvailableTimes(model.availableTimes);
            }
        }
    }, [selectedLocation, formDetails.selectedModel]);

    const openPopUp = () => setPopup(true);
    const closePopUp = () => setPopup(false);

    const handleZipcodeChange = async (newZipcode) => {
        setZipcode(newZipcode);
        closePopUp();
        try {
            const data = await getCarAvailabilityByPincode(newZipcode);
            setLocations(data);
        } catch (error) {
            console.error('Error fetching locations:', error.message);
        }
    };

    const handleLocationCardClick = (location) => {
        setSelectedLocation(location);
        setFormDetails({ ...formDetails, selectedModel: '', selectedDate: null, selectedTime: null });
    };

    const handleModelChange = (e) => {
        setFormDetails({ ...formDetails, selectedModel: e.target.value });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormDetails({ ...formDetails, [name]: type === 'checkbox' ? checked : value });
    };

    const getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    };

    const formatTime = (timeString) => {
        const date = new Date(timeString);
        const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'UTC' };
        return date.toLocaleString('en-US', options);
    };

    const getAvailableTimesForSelectedDate = () => {
        return availableTimes.filter((time) => {
            const date = new Date(time);
            return date.toISOString().split('T')[0] === formDetails.selectedDate;
        });
    };

    const handleSubmit = async () => {
        try {
            const verificationResult = await verifyUserDetails(
                formDetails.firstName,
                formDetails.lastName,
                formDetails.email,
                formDetails.phoneNumber
            );
            console.log(verificationResult)
            if (verificationResult) {
                const combinedDateTime = `${formDetails.selectedTime}`;
                const action = 'remove';
                const updateResponse = await updateTimeSlot(
                    selectedLocation._id,
                    formDetails.selectedModel,
                    combinedDateTime,
                    action
                );

                if (updateResponse.msg === 'Time slot updated successfully') {
                    toast.success('Date/time updated successfully');
                } else {
                    toast.error(updateResponse.msg);
                }

                const demoBookingCreated = await createDemoBooking(
                    verificationResult.userId,
                    selectedLocation._id,
                    formDetails.selectedModel,
                    combinedDateTime,
                    formDetails.phoneNumber
                );

                if (demoBookingCreated) {
                    toast.success('Demo booking created successfully');
                    navigate('/profile');
                } else {
                    toast.error('Failed to create demo booking');
                }
            } else {
                toast.error('User not found. Redirecting to signup...');
                navigate('/signup');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error processing request');
        }
    };

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                'recaptcha-container',
                { size: 'invisible', callback: onSignup },
                auth
            );
        }
    }

    function onSignup() {
        onCaptchVerify();
        const appVerifier = window.recaptchaVerifier;
        const formatPh = `+${formDetails.phoneNumber}`;
        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                toast.success("OTP sent successfully!");
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to send OTP. Please try again.");
            });
    }

    return (
        <div className='test-drive-container'>
            <h2 className='page-heading'>Demo Drive</h2>
            <p>Experience Full Self-Driving (Supervised), Learn About Charging and Get All Your Questions Answered</p>
            <div className='zipcode-container'>
                <h3>Find Location and Time</h3>
                <span>
                    Zip Code:<button onClick={openPopUp}><u>{zipcode}</u></button>
                </span>
            </div>
            {popup ? (
                <Zipcode closePopUp={closePopUp} handleZipcodeChange={handleZipcodeChange} />
            ) : (
                <>
                    <div className='schedule-content'>
                        <div className="schedule-data">
                            <div className="location-container">
                                <span>Select Location</span>
                                <div className="location-card-container">
                                    {locations.length > 0 ? (
                                        locations.map((location, index) => (
                                            <div
                                                key={index}
                                                className={`location-card ${selectedLocation === location ? 'active' : ''}`}
                                                onClick={() => handleLocationCardClick(location)}
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
                                <form>
                                    <div className="form-item">
                                        <label htmlFor="models" className="form-label">Available Models</label>
                                        <div className="form-input">
                                            <select
                                                style={{display:'block'}}
                                                name="selectedModel"
                                                id="models"
                                                className='form-input-text'
                                                onChange={handleModelChange}
                                                value={formDetails.selectedModel}
                                            >
                                                <option value="">Select a model</option>
                                                {selectedLocation.availability.map((model, index) => (
                                                    <option key={index} value={model.carModel}>{model.carModel}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-layout">
                                        <div className="form-item">
                                            <label htmlFor="date" className="form-label">Date</label>
                                            <div className="form-input">
                                                <input
                                                    type="date"
                                                    className='form-input-text'
                                                    name="selectedDate"
                                                    id="date"
                                                    min={getCurrentDate()}
                                                    onChange={handleChange}
                                                    value={formDetails.selectedDate}
                                                    disabled={!formDetails.selectedModel}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="times" className="form-label">Time</label>
                                            <div className="form-input">
                                                <select
                                                    style={{display:'block'}}
                                                    name="selectedTime"
                                                    id="times"
                                                    className='form-input-text'
                                                    onChange={handleChange}
                                                    value={formDetails.selectedTime}
                                                    disabled={!formDetails.selectedModel}
                                                >
                                                    <option value="">Select a time</option>
                                                    {getAvailableTimesForSelectedDate().map((time, index) => (
                                                        <option key={index} value={time}>
                                                            {formatTime(time)}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                    <div className="content-container">
                        <h3>Contact Information</h3>
                        <div className="forms-inner-container">
                            <form>
                                <div className="form-container">
                                    <div className="form-layout">
                                        <div className="form-item">
                                            <label htmlFor="firstName" className="form-label">First name</label>
                                            <div className="form-input">
                                                <input
                                                    type="text"
                                                    className='form-input-text'
                                                    id="firstName"
                                                    name="firstName"
                                                    value={formDetails.firstName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="lastName" className="form-label">Last name</label>
                                            <div className="form-input">
                                                <input
                                                    type="text"
                                                    className='form-input-text'
                                                    id="lastName"
                                                    name="lastName"
                                                    value={formDetails.lastName}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-layout">
                                        <div className="form-item">
                                            <label htmlFor="email" className="form-label">Email address</label>
                                            <div className="form-input">
                                                <input
                                                    type="email"
                                                    className='form-input-text'
                                                    id="email"
                                                    name="email"
                                                    value={formDetails.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                                            <div className="form-input">
                                                <input
                                                    type="tel"
                                                    className='form-input-text'
                                                    id="phoneNumber"
                                                    name="phoneNumber"
                                                    value={formDetails.phoneNumber}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="checkbox-group">
                                        <input
                                            type="checkbox"
                                            id="learnAboutEV"
                                            name="learnAboutEV"
                                            checked={formDetails.learnAboutEV}
                                            onChange={handleChange}
                                        />
                                        <span>Learn about Electric Vehicles</span>
                                    </div>
                                </div>
                                <p className='disclaimer-txt'>
                                    <span>By continuing, I agree to the{" "}</span>
                                    <a href=''>Terms and Conditions</a>
                                </p>
                            </form>
                            <div className='btn-conatiner'>
                                <button onClick={handleSubmit}>Schedule Test Drive</button>
                            </div>
                        </div>
                        <div id="recaptcha-container"></div>
                    </div>
                </>
            )}
        </div>
    );
};

export default TestRide;

