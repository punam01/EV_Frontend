import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PreBookingPage.css';
import PhoneVerification from '../DemoDriveBooking/PhoneVerification';
import PersonalDetails from '../../components/PersonalDetailsContainer/PersonalDetails';
import OTPVerification from '../DemoDriveBooking/OTPVerification';
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-toastify';
import { registerUser } from '../../services/userServices';

const PreBookingPage = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [locations, setLocations] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loadingg, setLoadingg] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '', zipCode: '' });
  const [step, setStep] = useState(1);
  const [selectedModel, setSelectedModel] = useState(''); // Selected model
  const [availableLocations, setAvailableLocations] = useState([]); // Available locations

  // Check if USER is in localStorage and directly set step to 2 if found
  useEffect(() => {
    if (localStorage.getItem('USER')) {
      setStep(2);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prevState => ({ ...prevState, [name]: value }));
  };

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
      localStorage.setItem('name', userData.name);
      toast.success("User details saved");
      setStep(2);
    } catch (error) {
      console.error('Registration error:', error.message);
      toast.error('User with the same phone number already exists.');
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLoading(true);
      console.log('Searching');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
          fetchNearestLocations(latitude, longitude);
        },
        (error) => {
          setLoading(false);
          setError(`Error getting location: ${error.message}`);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const fetchNearestLocations = async (lat, lon) => {
    console.log(lon, lat);
    try {
      const response = await axios.get('http://localhost:5000/api/location/locations', {
        params: {
          latitude: lat,
          longitude: lon,
          modelId: selectedModel // Use the selected model ID
        }
      });
      console.log(response);
      const locationsWithKm = response.data.map(location => ({
        ...location,
        distance: location.distance / 1000
      }));
      setAvailableLocations(locationsWithKm);
      console.log(response.data);
    } catch (err) {
      setError('Error fetching locations');
    } finally {
      setLoading(false);
    }
  };

  const handleModelClick = (modelName) => {
    setSelectedModel(modelName);
    console.log(`Selected model: ${modelName}`);
  };

  const handleNextStep = () => {
    if (!selectedModel) {
      toast.error('Please choose a car model.');
      return;
    }
    setStep(3);
  };

  const renderStep1 = () => (
    <div className="pre-booking-page__step__1">
      <span className='pre-booking-page__step__1__span'>Step 1 of 3</span>
      <h1 className='pre-booking-page__step__1__h1'>Personal Details</h1>
      <p className='pre-booking-page__step__1__p'>This data will be used for communication, purchase receipts, and RTO registration</p>
      <div id="recaptcha-container"></div>
      <Toaster position="top-center" toastOptions={{ success: { duration: 3000 } }} />
      {!otpVerified && !showOtp && (
        <PhoneVerification
          phone={phone}
          setPhone={setPhone}
          setShowOtp={setShowOtp}
          loading={loadingg}
          setLoading={setLoadingg}
          otpSent={otpSent}
        />
      )}
      {showOtp && !otpVerified && (
        <OTPVerification
          setOtpVerified={setOtpVerified}
          setOtpSent={setOtpSent}
        />
      )}
      {otpVerified && (
        <PersonalDetails
          userData={userData}
          handleChange={handleChange}
          handleRegister={handleRegister}
        />
      )}
    </div>
  );

  const renderStep2 = () => (
    <div className="pre-booking-page__step__2">
      <span className='pre-booking-page__step__1__span'>Step 2 of 3</span>
      <h1 className='pre-booking-page__step__1__h1'>
        Hello Welcome back, <span style={{ color: '#FF5919' }}>{" "}{localStorage.getItem('name')}</span>
      </h1>
      <div className="form-group">
        <label className="pre-booking-page__step__1__label" htmlFor="location">Reserve for Pincode</label>
        <input
          placeholder="Location"
          type="text"
          id="location"
          className="form-control"
          value={latitude && longitude ? `${latitude}, ${longitude}` : ''}
          disabled
        />
        <button className="pre-booking-page__step__1__btn" onClick={handleGetLocation} disabled={loading}>
          {loading ? 'Finding...' : 'Find Nearest Locations'}
        </button>
        {error && <p className="text-danger">{error}</p>}
      </div>
      <div className="available-locations">
        {availableLocations.length > 0 && (
          <ul>
            {availableLocations.map(location => (
              <li key={location._id}>
                <p><strong>{location.name}</strong></p>
                <p>{location.address}</p>
                <p>{location.city}, {location.state} - {location.pincode}</p>
                <p>Distance: {Math.round(location.distance)} meters</p>
              </li>
            ))}
          </ul>
        )}
      </div>
      {availableLocations.length > 0 && <button
        className="pre-booking-page__step__1__btn"
        onClick={handleNextStep}
        disabled={availableLocations.length === 0}
      >
        Next
      </button>}
    </div>
  );

  const renderStep3 = () => (
    <div className="pre-booking-page__step__3">
      <span className='pre-booking-page__step__1__span'>Step 3 of 3</span>
      <h1>Review and Confirm</h1>
      {/* Render the review and confirmation details here */}
      <button onClick={() => toast.success('Booking confirmed!')}>Confirm Booking</button>
    </div>
  );

  return (
    <div className="pre-booking-page">
      <div className="pre-booking-page__model-list">
        <div className={`pre-booking-page__model-item ${selectedModel === 'ModelX' ? 'active' : ''}`} onClick={() => handleModelClick('ModelX')}>
          <div className="pre-booking-page__model-img">
            <img src="/assets/images/car_3d_t.png" alt="model" />
          </div>
          <div className="pre-booking-page__model-details">
            <div className="pre-booking-page__model-name">
              <h2>Model 1</h2>

              <div className="pre-booking-page__price">
                <h3>$ 8,000</h3>
                <p>Starting price</p>
              </div>
            </div>
            <div className="pre-booking-page__model-color-swatch">
              <div className={`color-swatch cream `}></div>
              <div className={`color-swatch olive `}></div>
              <div className={`color-swatch gray `}></div>
              <div className={`color-swatch blue `}></div>
              <div className={`color-swatch white `}></div>
            </div>
            <div className="pre-booking-page__model__info">
              <div className='pre-booking-page__model__data'>
                <p className="pre-booking-page__label">Range</p>
                <h5 className="pre-booking-page__value">85<sup>KMS</sup></h5>
              </div>
              <div className='pre-booking-page__model__data'>
                <p className="pre-booking-page__label">Power</p>
                <h5 className="pre-booking-page__value">140 HP</h5>
              </div>
              <div className='pre-booking-page__model__data'>
                <p className="pre-booking-page__label">Acceleration</p>
                <h5 className="pre-booking-page__value">5 sec</h5>
              </div>
            </div>
          </div>
        </div>
        <div className={`pre-booking-page__model-item ${selectedModel === 'Model_Y' ? 'active' : ''}`} onClick={() => handleModelClick('Model_Y')}>
          <div className="pre-booking-page__model-img">
            <img src="/assets/images/car_3d_t.png" alt="model" />
          </div>
          <div className="pre-booking-page__model-details">
            <div className="pre-booking-page__model-name">
              <h2>Model 2</h2>
              <div className="pre-booking-page__price">
                <h3>$ 8,500</h3>
                <p>Starting price</p>
              </div>
            </div>
            <div className="pre-booking-page__model-color-swatch">
              <div className={`color-swatch cream `}></div>
              <div className={`color-swatch olive `}></div>
              <div className={`color-swatch gray `}></div>
              <div className={`color-swatch blue `}></div>
              <div className={`color-swatch white `}></div>
            </div>
            <div className="pre-booking-page__model__info">
              <div className='pre-booking-page__model__data'>
                <p className="pre-booking-page__label">Range</p>
                <h5 className="pre-booking-page__value">90<sup>KMS</sup></h5>
              </div>
              <div className='pre-booking-page__model__data'>
                <p className="pre-booking-page__label">Power</p>
                <h5 className="pre-booking-page__value">150 HP</h5>
              </div>
              <div className='pre-booking-page__model__data'>
                <p className="pre-booking-page__label">Acceleration</p>
                <h5 className="pre-booking-page__value">4.5 sec</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pre-booking-page__booking-steps">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
};

export default PreBookingPage;
