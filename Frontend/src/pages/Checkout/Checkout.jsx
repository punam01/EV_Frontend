import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCarAvailabilityByPincode } from '../../services/locationServices';
import { bookCar } from '../../services/preBookingService';
import './Checkout.css';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import Confetti from 'react-confetti'
import SendEmailComponent from '../../components/SendEmailComponent/SendEmailComponent';
import { sendEmail } from '../../services/emailServices';
import useAuth from '../../hooks/useAuth';
import { Toaster } from 'react-hot-toast';
import PhoneVerification from '../DemoDriveBooking/PhoneVerification';
import OTPVerification from '../DemoDriveBooking/OTPVerification';
import PersonalDetails from '../../components/PersonalDetailsContainer/PersonalDetails';
import { registerUser } from '../../services/userServices';
import { toast } from 'react-toastify';

const Checkout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {isLoggedIn,logout}=useAuth()
    const { selectedOptions, totalPrice, carData } = location.state || {};
    const [step, setStep] = useState(1);
    const [userDetails, setUserDetails] = useState({ pincode: '', name: '', email: '' });
    const [nearbyLocations, setNearbyLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);
    const [phone, setPhone] = useState('');
    const [showOtp, setShowOtp] = useState(false);
    const [otpVerified, setOtpVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [otpSent, setOtpSent] = useState(false);
    const [userData, setUserData] = useState({ first_name: '',last_name:'', email: '', zipCode: '' });
    console.log("selected :", selectedOptions)
    console.log("totalPrice :", totalPrice)
    console.log("carData :", carData)
    const [bookingData, setBookingData] = useState()
    useEffect(() => {
        setUserDetails({
            pincode: localStorage.getItem('zip') || '',
            name: localStorage.getItem('name') || '',
            email: localStorage.getItem('email') || '',
        });
    }, []);
    const handlePincodeChange = (e) => {
        setUserDetails(prev => ({ ...prev, pincode: e.target.value }));
    };

    const fetchNearbyLocations = async () => {
        try {
            const locations = await getCarAvailabilityByPincode(userDetails.pincode);
            setNearbyLocations(locations);
        } catch (error) {
            console.error('Error fetching nearby locations:', error);
        }
    };

    const handleLocationSelect = (location) => {
        setSelectedLocation(location);
    };

    const handleNextStep = () => {
        if (step === 1) {
            fetchNearbyLocations();
            setStep(2);
        } else if (step === 2) {
            if (!selectedLocation) {
                alert('Please select a location.');
                return;
            }
            setStep(3);
        }
        else if (step == 3) {
            if (!bookingConfirmed) {
                alert('Error occured while booking please try again later');
                return;
            }
            setStep(4);
        }
    };

    const handleNavigate = () => {
        navigate('/profile')
    }
    const handleBooking = async () => {
        if (!selectedLocation) {
            alert('Please select a location before booking.');
            return;
        }

        const bookingData = {
            userId: localStorage.getItem('USER'),
            carId: carData.carId,
            bookingTime: new Date(),
            paymentMade: false,
            contact: userDetails.email,
            customization: {
                exteriorColor: {
                    value: selectedOptions.exteriorColor.name,
                    price: selectedOptions.exteriorColor.price
                },
                interiorColor: {
                    value: selectedOptions.interiorColor.name,
                    price: selectedOptions.interiorColor.price
                },
                wheelColor: {
                    value: selectedOptions.wheel.name,
                    price: selectedOptions.wheel.price
                },
                range: {
                    value: selectedOptions.range.value,
                    price: selectedOptions.range.price
                },
                glass: {
                    value: selectedOptions.glass.value,
                    price: selectedOptions.glass.price
                }
            },
            location:
            {
                pincode: selectedLocation.pincode,
                address: selectedLocation.address,
                city: selectedLocation.city,
                state: selectedLocation.state,
                name: selectedLocation.name
            }
            ,
            estimatedPrice: totalPrice
        };
        console.log(bookingData)
        setBookingData(bookingData);
        try {
            const result = await bookCar(bookingData);
            setBookingData(result)
            console.log("Result", result)
            console.log('Booking confirmed:', result);
            setBookingConfirmed(true);
            setStep(4);
            const emailResult = await sendEmail(result);
            if (!emailResult.success) {
                alert(emailResult.message);
            }
            else{
                alert("Email sent successfully!")
            }

        } catch (error) {
            console.error('Error during booking:', error);
            alert('Failed to confirm the booking. Please try again later.');
        }
    };

    const handleStepClick = (stepNumber) => {
        if (stepNumber < step) {
            setStep(stepNumber);
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };
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
            //setShowUserDetails(false);
            toast.success("User details saved");
        } catch (error) {
            console.error('Registration error:', error.message);
            toast.error('User with the same phone number already exists.');
        }
    };
    const handleDownloadInvoice = () => {
        const doc = new jsPDF();
        const title = "Invoice";
        const padding = 20;
        const titleWidth = doc.getTextWidth(title);
        const center = (doc.internal.pageSize.width / 2) - (titleWidth / 2);
        doc.text(title, center, padding);

        const userData = [
            [userDetails.name, userDetails.email]
        ];
        doc.autoTable({
            startY: padding + 10,
            head: [['NAME', 'EMAIL']],
            body: userData,
            theme: 'grid',
            styles: {
                fontSize: 10,
                cellPadding: 4,
                halign: 'left',
                valign: 'middle'
            },
            headStyles: {
                fillColor: [0, 0, 255],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                halign: 'center'
            },
            margin: { top: 10 },
            showHead: 'firstPage',
            columnStyles: {
                0: { cellWidth: 60 },
                1: { cellWidth: 130 }
            }
        });
        // Car Details
        const carData = [
            [selectedOptions.exteriorColor.name, selectedOptions.interiorColor.name, selectedOptions.wheel.name, selectedOptions.glass.name, `$${totalPrice}`]
        ];

        doc.autoTable({
            startY: doc.previousAutoTable.finalY + 10,
            head: [['EXTERIOR COLOR', 'INTERIOR COLOR', 'WHEEL', 'GLASS', "TOTAL PRICE"]],
            body: carData,
            theme: 'grid',
            styles: {
                fontSize: 10,
                cellPadding: 4,
                halign: 'left',
                valign: 'middle'
            },
            headStyles: {
                fillColor: [0, 123, 255], // Different blue
                textColor: [255, 255, 255], // White text
                fontStyle: 'bold',
                halign: 'center'
            },
            margin: { top: 10 },
            showHead: 'firstPage',
            columnStyles: {
                0: { cellWidth: 40 },
                1: { cellWidth: 40 },
                2: { cellWidth: 30 },
                3: { cellWidth: 30 },
                4: { cellWidth: 50 },
            }
        });

        const locationData = [
            [selectedLocation.name, selectedLocation.address, selectedLocation.city, selectedLocation.state, selectedLocation.pincode]
        ];

        doc.autoTable({
            startY: doc.previousAutoTable.finalY + 10,
            head: [['PLACE', 'ADDRESS', 'CITY', 'STATE', 'PINCODE']],
            body: locationData,
            theme: 'grid',
            styles: {
                fontSize: 10,
                cellPadding: 4,
                halign: 'left',
                valign: 'middle'
            },
            headStyles: {
                fillColor: [0, 153, 76],
                textColor: [255, 255, 255],
                fontStyle: 'bold',
                halign: 'center'
            },
            margin: { top: 10 },
            showHead: 'firstPage',
            columnStyles: {
                0: { cellWidth: 40 },
                1: { cellWidth: 40 },
                2: { cellWidth: 40 },
                3: { cellWidth: 20 },
                4: { cellWidth: 40 },
            }
        });
        doc.output('dataurlnewwindow');
        //doc.save(`bmw_invoice_${userDetails.name}.pdf`);
    };
    const [isEditing, setIsEditing] = useState({
        name: false,
        email: false,
        pincode: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        console.log(name, value)
        setUserDetails(prevDetails => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleEditClick = (field) => {
        setIsEditing(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };
    return (
        <div className="checkout-page-container">
            {step != 4 && <section className="step-wizard">
                <ul className="step-wizard-list">
                    <li
                        className={`step-wizard-item ${step === 1 ? 'current-item' : ''}`}
                        onClick={() => handleStepClick(1)}
                    >
                        <span className="progress-count"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#31A93E" class="bi bi-cash-stack" viewBox="0 0 16 16">
                            <path d="M1 3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm7 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4" />
                            <path d="M0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V7a2 2 0 0 1-2-2z" />
                        </svg></span>
                        <span className="progress-label">User details</span>
                    </li>
                    <li
                        className={`step-wizard-item ${step === 2 ? 'current-item' : ''}`}
                        onClick={() => handleStepClick(2)}
                    >
                        <span className="progress-count">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#31A93E" class="bi bi-geo-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411" />
                            </svg>
                        </span>
                        <span className="progress-label">Find Locations</span>
                    </li>
                    <li
                        className={`step-wizard-item ${step === 3 ? 'current-item' : ''}`}
                        onClick={() => handleStepClick(3)}
                    >
                        <span className="progress-count"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#31A93E" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                        </svg></span>
                        <span className="progress-label">Summary</span>
                    </li>
                </ul>
            </section>}

            <div className="checkout-content">
                {step === 1 && (
                    <div>
                        <h2>Confirm your details</h2>
                        <div className="checkout-content__input-container">
                            <span>Name</span>
                            <input
                                className='checkout-content__input-container__input'
                                type="text"
                                name="name"
                                value={userDetails.name}
                                onChange={handleInputChange}
                                disabled={!isEditing.name}
                                required
                            />
                            <button className="checkout-content__button_svg" onClick={() => handleEditClick('name')}>
                                {isEditing.name ?
                                    <svg width="16" height="16" fill="#31A93E" className="bi bi-save" viewBox="0 0 16 16">
                                        <path d="M8 12a.5.5 0 0 0 .5-.5V9a.5.5 0 0 0-1 0v2.5A.5.5 0 0 0 8 12zM7 8a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8z" />
                                        <path d="M13.5 0h-11A1.5 1.5 0 0 0 1 1.5v13A1.5 1.5 0 0 0 2.5 16h11A1.5 1.5 0 0 0 15 14.5V1.5A1.5 1.5 0 0 0 13.5 0zm-11 1h11a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-12a.5.5 0 0 1 .5-.5z" />
                                    </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#31A93E" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>}
                            </button>
                        </div>
                        <div className="checkout-content__input-container">
                            <span>Email</span>
                            <input
                                className='checkout-content__input-container__input'
                                type="email"
                                name="email"
                                value={userDetails.email}
                                onChange={handleInputChange}
                                disabled={!isEditing.email}
                                required
                            />
                            <button className="checkout-content__button_svg" onClick={() => handleEditClick('email')}>
                                {isEditing.email ? <svg width="16" height="16" fill="#31A93E" className="bi bi-save" viewBox="0 0 16 16">
                                    <path d="M8 12a.5.5 0 0 0 .5-.5V9a.5.5 0 0 0-1 0v2.5A.5.5 0 0 0 8 12zM7 8a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8z" />
                                    <path d="M13.5 0h-11A1.5 1.5 0 0 0 1 1.5v13A1.5 1.5 0 0 0 2.5 16h11A1.5 1.5 0 0 0 15 14.5V1.5A1.5 1.5 0 0 0 13.5 0zm-11 1h11a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-12a.5.5 0 0 1 .5-.5z" />
                                </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#31A93E" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>}
                            </button>
                        </div>
                        <div className="checkout-content__input-container">
                            <span>Pincode</span>
                            <input
                                className='checkout-content__input-container__input'
                                type="text"
                                name="pincode"
                                value={userDetails.pincode}
                                onChange={handleInputChange}
                                disabled={!isEditing.pincode}
                                required
                            />
                            <button className="checkout-content__button_svg" onClick={() => handleEditClick('pincode')}>
                                {isEditing.pincode ? <svg width="16" height="16" fill="#31A93E" className="bi bi-save" viewBox="0 0 16 16">
                                    <path d="M8 12a.5.5 0 0 0 .5-.5V9a.5.5 0 0 0-1 0v2.5A.5.5 0 0 0 8 12zM7 8a1 1 0 0 1 1-1h.5a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8z" />
                                    <path d="M13.5 0h-11A1.5 1.5 0 0 0 1 1.5v13A1.5 1.5 0 0 0 2.5 16h11A1.5 1.5 0 0 0 15 14.5V1.5A1.5 1.5 0 0 0 13.5 0zm-11 1h11a.5.5 0 0 1 .5.5v12a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-12a.5.5 0 0 1 .5-.5z" />
                                </svg>
                                    : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#31A93E" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>}
                            </button>
                        </div>
                        <button className='checkout-content__next__button' onClick={handleNextStep}>Next</button>
                    </div>
                )}
                {null && step===1 &&(
                    <div className="demo-user-details">
                    <h1>Book <span>{carData && carData.name}</span> Demo Drive</h1>
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
                )

                }
                {step === 2 && (
                    <div>
                        <h2>Find Nearby Dealer</h2>
                        {nearbyLocations.length > 0 ? (
                            <ul className="location-list">
                                {nearbyLocations.map((location) => (
                                    <li
                                        key={location._id}
                                        className={`location-item ${selectedLocation?._id === location._id ? 'selected' : ''}`}
                                        onClick={() => handleLocationSelect(location)}
                                    >
                                        <div className='location-item__div'>
                                            <div className="location-item__loc_add">
                                                <svg className="location-item__loc__svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin-map" viewBox="0 0 16 16">
                                                    <path fill-rule="evenodd" d="M3.1 11.2a.5.5 0 0 1 .4-.2H6a.5.5 0 0 1 0 1H3.75L1.5 15h13l-2.25-3H10a.5.5 0 0 1 0-1h2.5a.5.5 0 0 1 .4.2l3 4a.5.5 0 0 1-.4.8H.5a.5.5 0 0 1-.4-.8z" />
                                                    <path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999z" />
                                                </svg>
                                                <span>{location.name}, {location.address}</span>
                                            </div>
                                            <div className="location-item__loc_pin">
                                                <span>{location.city}, {location.state}</span>
                                                <strong>{location.pincode}</strong>
                                            </div>

                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No nearby locations found.</p>
                        )}
                        <button className="checkout-content__next__button" onClick={handleNextStep}>Next</button>
                    </div>
                )}
                {step === 3 && (
                    <div className='checkout-content__summary'>
                        <h2>Summary</h2>
                        <>
                            <span className='checkout-content__summary__book-text'>Booking Price</span>
                            <h3 className='checkout-content__summary__book_amount'>$ 999</h3>

                            <div className="checkout-content__summary__cardets">
                                <div className="checkout-content__summary__card">
                                    <h3 className='checkout-content__summary__card__h3'>Exterior Color</h3>
                                    <p className='checkout-content__summary__card__p'>${selectedOptions.exteriorColor.price}</p>
                                    <span className='checkout-content__summary__card__span'>{selectedOptions.exteriorColor.name}</span>
                                </div>
                                <div className="checkout-content__summary__card">
                                    <h3 className='checkout-content__summary__card__h3'>Interior Color</h3>
                                    <p className='checkout-content__summary__card__p'>${selectedOptions.interiorColor.price}</p>
                                    <span className='checkout-content__summary__card__span'>{selectedOptions.interiorColor.name}</span>
                                </div>
                                <div className="checkout-content__summary__card">
                                    <h3 className='checkout-content__summary__card__h3'>Wheel</h3>
                                    <p className='checkout-content__summary__card__p'>${selectedOptions.wheel.price}</p>
                                    <span className='checkout-content__summary__card__span'>{selectedOptions.wheel.name}</span>
                                </div>
                                <div className="checkout-content__summary__card">
                                    <h3 className='checkout-content__summary__card__h3'>Charger Type</h3>
                                    <p className='checkout-content__summary__card__p'>${selectedOptions.chargerType.price}</p>
                                    <span className='checkout-content__summary__card__span'>{selectedOptions.chargerType.value}</span>
                                </div>
                                <div className="checkout-content__summary__card">
                                    <h3 className='checkout-content__summary__card__h3'>Range</h3>
                                    <p className='checkout-content__summary__card__p'>${selectedOptions.range.price}</p>
                                    <span className='checkout-content__summary__card__span'>{selectedOptions.range.value}</span>
                                </div>
                            </div>
                            <div className="checkout-content__summary__userdets">
                                <div className="checkout-content__summary__user">
                                    <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-badge" viewBox="0 0 16 16">
                                        <path d="M6.5 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        <path d="M4.5 0A2.5 2.5 0 0 0 2 2.5V14a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2.5A2.5 2.5 0 0 0 11.5 0zM3 2.5A1.5 1.5 0 0 1 4.5 1h7A1.5 1.5 0 0 1 13 2.5v10.795a4.2 4.2 0 0 0-.776-.492C11.392 12.387 10.063 12 8 12s-3.392.387-4.224.803a4.2 4.2 0 0 0-.776.492z" />
                                    </svg> {userDetails.name}</p>
                                    <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                                    </svg> {userDetails.email}</p>
                                    <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
                                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                    </svg> {userDetails.pincode}</p>
                                </div>
                                <div className="checkout-content__summary__loc">
                                    <p><svg className="checkout-content__summary__loc__svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
                                        <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                                    </svg> {selectedLocation.name}, {selectedLocation.address}</p>
                                    <p>City: {selectedLocation.city},{selectedLocation.state}</p>
                                    <p><svg className="checkout-content__summary__loc__svg" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pin" viewBox="0 0 16 16">
                                        <path d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A6 6 0 0 1 5 6.708V2.277a3 3 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354m1.58 1.408-.002-.001zm-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a5 5 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a5 5 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.8 1.8 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14q.091.15.214.271a1.8 1.8 0 0 0 .37.282" />
                                    </svg> {selectedLocation.pincode}</p>
                                </div>
                            </div>
                            <button className="checkout-content__book__button" onClick={handleBooking}>Book Now</button>
                        </>

                    </div>
                )}
                {step == 4 && bookingConfirmed && (<>

                    <div className="confirmation-message">
                        {/*<SendEmailComponent bookingData={bookingData} />*/}
                        <h2>Congratulations!</h2>
                        <p>Your booking has been confirmed successfully.</p>
                        <p>An email has been sent to {" "}<b>{userDetails.email}</b> {" "}with the booking details.</p>
                        <div className="checkout-content__button__grp">
                            <button className="checkout-content__book__button" onClick={handleDownloadInvoice}>Download Invoice</button>
                            <button className="checkout-content__book__button" onClick={handleNavigate}>Go to Order History</button>
                        </div>
                    </div></>
                )}
            </div>
        </div>
    );
};

export default Checkout;
