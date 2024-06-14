import React, { useState, useEffect } from 'react';
import './TestRide.css';
import Zipcode from './Zipcode';
import { getCarAvailabilityByPincode } from '../../services/locationServices';
import PhoneInput from 'react-phone-input-2';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const TestRide = () => {
    const auth = getAuth();
    const [popup, setPopup] = useState(false);
    const [zipcode, setZipcode] = useState('Enter zipcode here');
    const [locations, setLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [selectedModel, setSelectedModel] = useState('');
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedDate, setSelectedDate] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [learnAboutEV, setLearnAboutEV] = useState(false);
    const [isPhoneVerified, setIsPhoneVerified] = useState(false);

    const openPopUp = () => {
        setPopup(true);
    };

    const closePopUp = () => {
        setPopup(false);
    };

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
        setSelectedModel('');
        setAvailableTimes([]);
    };

    const handleModelChange = (e) => {
        const selectedModel = e.target.value;
        setSelectedModel(selectedModel);
        const model = selectedLocation.availability.find((model) => model.carModel === selectedModel);
        setAvailableTimes(model ? model.availableTimes : []);
    };

    const handleDateChange = (e) => {
        const selectedDate = e.target.value;
        setSelectedDate(selectedDate);
    };

    const getCurrentDate = () => {
        const today = new Date();
        const yyyy = today.getFullYear();
        let mm = today.getMonth() + 1;
        let dd = today.getDate();
        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;
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
            const dateString = date.toISOString().split('T')[0];
            return dateString === selectedDate;
        });
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setLearnAboutEV(checked);
        } else {
            switch (name) {
                case 'firstName':
                    setFirstName(value);
                    break;
                case 'lastName':
                    setLastName(value);
                    break;
                case 'email':
                    setEmail(value);
                    break;
                case 'phoneNumber':
                    setPhoneNumber(value);
                    break;
                default:
                    break;
            }
        }
    };

    const handleSubmit = () => {
        console.log(firstName, lastName, email, phoneNumber)
    }

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
                'size': 'invisible',
                'callback': (response) => {
                    onSignup();
                }
            }, auth); // Pass auth object here
        }
    }

    function onSignup() {
        onCaptchVerify();
        const appVerifier = window.recaptchaVerifier;
        const formatPh = `+${phoneNumber}`; // Ensure correct formatting
        signInWithPhoneNumber(auth, formatPh, appVerifier)
            .then((confirmationResult) => {
                window.confirmationResult = confirmationResult;
                toast.success("OTP sent successfully!");
            }).catch((error) => {
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
                <span>Zip Code:<button onClick={openPopUp}><u>{zipcode}</u></button></span>
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
                                        <label htmlFor="" className="form-label">Available Models</label>
                                        <div className="form-input">
                                            <select
                                                name="models"
                                                id="models"
                                                className='form-input-text'
                                                onChange={handleModelChange}
                                                value={selectedModel}
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
                                            <label htmlFor="" className="form-label">Date</label>
                                            <div className="form-input">
                                                <input
                                                    type="date"
                                                    className='form-input-text'
                                                    min={getCurrentDate()}
                                                    onChange={handleDateChange}
                                                    disabled={!selectedModel}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-item">
                                            <label htmlFor="" className="form-label">Time</label>
                                            <div className="form-input">
                                                <select
                                                    name="times"
                                                    id="times"
                                                    className='form-input-text'
                                                    disabled={!selectedModel}
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
                            <form action="">
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
                                                    value={firstName}
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
                                                    value={lastName}
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
                                                    value={email}
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
                                                    value={phoneNumber}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="checkbox-group">
                                        <input type="checkbox" name="" id="" checked />
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
