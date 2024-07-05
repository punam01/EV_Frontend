import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCarAvailabilityByPincode } from '../../services/locationServices';
import { bookCar } from '../../services/preBookingService';
import './Checkout.css';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';


const Checkout = () => {
    const location = useLocation();
    const { selectedOptions, totalPrice, carData } = location.state || {};
    const [step, setStep] = useState(1);
    const [userDetails, setUserDetails] = useState({ pincode: '', name: '', email: '' });
    const [nearbyLocations, setNearbyLocations] = useState([]);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [bookingConfirmed, setBookingConfirmed] = useState(false);

    useEffect(() => {
        setUserDetails({
            pincode: localStorage.getItem('pin') || '',
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
    };

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
                    value: selectedOptions.exteriorColor,
                    price: selectedOptions.exteriorColorPrice
                },
                interiorColor: {
                    value: selectedOptions.interiorColor,
                    price: selectedOptions.interiorColorPrice
                },
                wheelColor: {
                    value: selectedOptions.wheel,
                    price: selectedOptions.wheelPrice
                },
                range: {
                    value: selectedOptions.range,
                    price: selectedOptions.rangePrice
                },
                glass: {
                    value: selectedOptions.glass,
                    price: selectedOptions.glassPrice
                }
            },
            location: [ // Change from object to array
                {
                    pincode: selectedLocation.pincode,
                    address: selectedLocation.address,
                    city: selectedLocation.city,
                    state: selectedLocation.state,
                    name: selectedLocation.name
                }
            ],
            estimatedPrice: totalPrice
        };
        console.log(bookingData)
        try {
            const result = await bookCar(bookingData);
            console.log('Booking confirmed:', result);
            setBookingConfirmed(true);
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

    const handleDownloadInvoice = () => {
        const doc = new jsPDF();
        const title = "Invoice";
        const padding = 20;
        const titleWidth = doc.getTextWidth(title);
        const center = (doc.internal.pageSize.width / 2) - (titleWidth / 2);
        doc.text(title, center, padding);
    
        // User Details
        const userData = [
            [userDetails.name, userDetails.email]
        ];
        doc.autoTable({
            startY: padding + 10,
            head: [['NAME','EMAIL']],
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
            [ selectedOptions.exteriorColor, selectedOptions.interiorColor, selectedOptions.wheel, selectedOptions.glass, `$${totalPrice}`]
        ];
    
        doc.autoTable({
            startY: doc.previousAutoTable.finalY + 10,
            head: [['EXTERIOR COLOR','INTERIOR COLOR','WHEEL','GLASS',"TOTAL PRICE"]],
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
    
        // Location Details
        const locationData = [
            [selectedLocation.name, selectedLocation.address, selectedLocation.city, selectedLocation.state, selectedLocation.pincode]
        ];
    
        doc.autoTable({
            startY: doc.previousAutoTable.finalY + 10,
            head: [['PLACE','ADDRESS','CITY','STATE','PINCODE']],
            body: locationData,
            theme: 'grid',
            styles: {
                fontSize: 10,
                cellPadding: 4,
                halign: 'left',
                valign: 'middle'
            },
            headStyles: {
                fillColor: [0, 153, 76], // Green color
                textColor: [255, 255, 255], // White text
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
                4: { cellWidth: 40 },           }
        });
    
        doc.save(`bmw_invoice_${userDetails.name}.pdf`);
    };
    
    return (
        <div className="checkout-page">
            <section className="step-wizard">
                <ul className="step-wizard-list">
                    <li
                        className={`step-wizard-item ${step === 1 ? 'current-item' : ''}`}
                        onClick={() => handleStepClick(1)}
                    >
                        <span className="progress-count">1</span>
                        <span className="progress-label">Billing Info</span>
                    </li>
                    <li
                        className={`step-wizard-item ${step === 2 ? 'current-item' : ''}`}
                        onClick={() => handleStepClick(2)}
                    >
                        <span className="progress-count">2</span>
                        <span className="progress-label">Find Locations</span>
                    </li>
                    <li
                        className={`step-wizard-item ${step === 3 ? 'current-item' : ''}`}
                        onClick={() => handleStepClick(3)}
                    >
                        <span className="progress-count">3</span>
                        <span className="progress-label">Summary</span>
                    </li>
                </ul>
            </section>

            <div className="checkout-content">
                <h1>Checkout</h1>
                {step === 1 && (
                    <div>
                        <h2>Step 1: Confirm User Details</h2>
                        <p>Name: {userDetails.name}</p>
                        <p>Email: {userDetails.email}</p>
                        <p>
                            Pincode: <input type="text" value={userDetails.pincode} onChange={handlePincodeChange} />
                        </p>
                        <button onClick={handleNextStep}>Next</button>
                    </div>
                )}
                {step === 2 && (
                    <div>
                        <h2>Step 2: Find Nearby Locations</h2>
                        {nearbyLocations.length > 0 ? (
                            <ul className="location-list">
                                {nearbyLocations.map((location) => (
                                    <li 
                                        key={location._id} 
                                        className={`location-item ${selectedLocation?._id === location._id ? 'selected' : ''}`}
                                        onClick={() => handleLocationSelect(location)}
                                    >
                                        <div>
                                            <strong>{location.name}</strong><br />
                                            Address: {location.address}<br />
                                            City: {location.city}<br />
                                            State: {location.state}<br />
                                            Pincode: {location.pincode}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No nearby locations found.</p>
                        )}
                        <button onClick={handleNextStep}>Next</button>
                    </div>
                )}
                {step === 3 && (
                    <div>
                        <h2>Step 3: Summary and Book</h2>
                        {bookingConfirmed ? (
                            <div className="confirmation-message">
                                <h2>Congratulations!</h2>
                                <p>Your booking has been confirmed successfully. An email has been sent to {userDetails.email} with the booking details.</p>
                                <button onClick={handleDownloadInvoice}>Download Invoice</button>
                            </div>
                        ) : (
                            <>
                                <h3>Selected Options:</h3>
                                <p>Exterior Color: {selectedOptions.exteriorColor}</p>
                                <p>Interior Color: {selectedOptions.interiorColor}</p>
                                <p>Wheel: {selectedOptions.wheel}</p>
                                <p>Glass: {selectedOptions.glass}</p>
                                <p>Total Price: ${totalPrice}</p>
                                <p>User Details:</p>
                                <p>Name: {userDetails.name}</p>
                                <p>Email: {userDetails.email}</p>
                                <p>Pincode: {userDetails.pincode}</p>
                                {selectedLocation && (
                                    <div>
                                        <h3>Selected Location:</h3>
                                        <p>Name: {selectedLocation.name}</p>
                                        <p>Address: {selectedLocation.address}</p>
                                        <p>City: {selectedLocation.city}</p>
                                        <p>State: {selectedLocation.state}</p>
                                        <p>Pincode: {selectedLocation.pincode}</p>
                                    </div>
                                )}
                                <button onClick={handleBooking}>Book Now</button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
