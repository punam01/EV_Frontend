import React, { useState } from 'react'
import './PreBookingWithoutConfig.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { bookCar } from '../../services/preBookingService';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Confirmation from '../../components/Confirmation/Confirmation';

const PreBookingWithoutConfig = () => {
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = useState('')
    const [selectedColor, setSelectedColor] = useState("");
    const [customization, setCustomization] = useState({
        interiorColor: {
            price: 1500,
            value: 'Black'
        },
        wheelColor: {
            price: 2700,
            value: 'Black Wheels'
        },
        glass: {
            price: 300,
            value: 'Tinted Glass'
        },
        exteriorColor: {}
    });
    const [estimatedPrice, setEstimatedPrice] = useState(0);
    const { car } = location.state || {};

    const calculateEstimatedPrice = (customizations) => {
        return Object.values(customizations).reduce((total, option) => {
            if (option && option.price) {
                return total + option.price;
            }
            return total;
        }, 0);
    }

    const handleColorClick = (color) => {
        const colorOption = car.customizableOptions.find(option =>
            option.name === 'Exterior Color' && option.options.some(opt => opt.name === color)
        );

        if (colorOption) {
            const selectedOption = colorOption.options.find(opt => opt.name === color);
            const price = selectedOption.price;

            setCustomization(prev => ({
                ...prev,
                exteriorColor: { value: color, price: price }
            }));

            const newEstimatedPrice = calculateEstimatedPrice({
                ...customization,
                exteriorColor: { value: color, price: price }
            });
            setEstimatedPrice(newEstimatedPrice);
            setSelectedColor(color);
        } else {
            setCustomization(prev => ({
                ...prev,
                exteriorColor: { value: "", price: 0 }
            }));
            setEstimatedPrice(calculateEstimatedPrice({
                ...customization,
                exteriorColor: { value: "", price: 0 }
            }));
            setSelectedColor("");
        }
    }

    const handleDownloadInvoice = () => {
        const doc = new jsPDF();
        const title = "Invoice";
        const padding = 20;
        const titleWidth = doc.getTextWidth(title);
        const center = (doc.internal.pageSize.width / 2) - (titleWidth / 2);
        doc.text(title, center, padding);

        const userData = [
            [localStorage.getItem("name"), localStorage.getItem("email"), localStorage.getItem("zip")]
        ];
        doc.autoTable({
            startY: padding + 10,
            head: [['NAME', 'EMAIL', 'PINCODE']],
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
                0: { cellWidth: 40 },
                1: { cellWidth: 40 },
                2: { cellWidth: 40 }
            }
        });

        const carData = [
            [selectedColor || 'No Color Selected', 'Black', 'Black', 'Tinted', `$${estimatedPrice}`]
        ];
        doc.autoTable({
            startY: doc.previousAutoTable.finalY + 10,
            head: [['EXTERIOR COLOR', 'INTERIOR COLOR', 'WHEEL', 'GLASS', 'TOTAL PRICE']],
            body: carData,
            theme: 'grid',
            styles: {
                fontSize: 10,
                cellPadding: 4,
                halign: 'left',
                valign: 'middle'
            },
            headStyles: {
                fillColor: [0, 123, 255],
                textColor: [255, 255, 255],
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

        doc.save(`bmw_invoice_${localStorage.getItem("name") || 'user'}.pdf`);
    };

    const handleNextClick = async () => {
        const user = localStorage.getItem('USER');
        if (!user) {
            navigate('/signup');
            return;
        }

        const bookingData = {
            userId: localStorage.getItem('USER'),
            carId: car.carId,
            bookingTime: new Date(),
            contact: localStorage.getItem('email') || localStorage.getItem('phone'),
            customization: customization,
            pincode: car.pincode || localStorage.getItem('zip'),
            estimatedPrice: estimatedPrice
        };
        setBookingDetails(bookingData)
        try {
            const response = await bookCar(bookingData);
            handleDownloadInvoice();
            setConfirmationMessage('Booking Confirmed! 🚗💨');
            setTimeout(() => {
                navigate('/profile');
            }, 2000);
        } catch (error) {
            console.error('Error booking car:', error);
        }
    };

    return (
        <div className='pre-book-no-config-page'>
            <div className="pre-book-no-config-page__image__holder">
                <img src="/assets/images/bmw_no_config.jpg" alt="" />
            </div>
            <div className="pre-book-no-config-page__booking__holder">
                <h2 className='pre-book-no-config-page__booking__holder__title'>Book your {car?.name || "Car"}</h2>
                <div className="important">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                    </svg>
                    <span>Change the colour and variant any time before completing your purchase at the Experience Centre.</span>
                </div>

                <div className="pre-book-no-config-page__booking__holder__cardets">
                    <div className="pre-book-no-config-page__booking__label">
                        <h3 className="pre-book-no-config-page__title" style={{display:'inline-flex',padding:'1rem 0'}}>Selected Model</h3>
                        <Link className="pre-book-no-config-page__link" to="/cars">Choose another model</Link>
                    </div>
                    <div className="pre-book-no-config-page__selected_car">
                        <div className="pre-book-no-config-page__selected_car__left">
                            <h3>{car.modelId}</h3>
                            <div className="car-info">
                                <p>{car.topSpeed} mph . </p>
                                <span>{" " + car.seatingCapacity} Seating Interior</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pre-book-no-config-page__color__holder">
                    <div className="pre-book-no-config-page__title__container">
                        <h3 className="pre-book-no-config-page__title">Pick your color</h3>
                        <span>{selectedColor}</span>
                    </div>
                    <div className="pre-book-no-config-page__title__standard-color">
                        {car.customizableOptions[0].options.map(color => (
                            <div
                                key={color.name}
                                className={`pre-book-no-config-page__title__color-swatch ${color.name} ${selectedColor === color.name ? 'selected' : ''}`}
                                style={{ backgroundColor: color.code }}
                                onClick={() => handleColorClick(color.name)}
                                data-tooltip={color.name}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="pre-book-no-config-page__fixed-bottom">
                <div className="fixed-bottom-top">
                    <p>Booking Amount <span>₹ 999</span></p>
                    <p>Estimated Price <span>₹ {estimatedPrice}</span></p>
                    <div className="fixed-bottom-right">
                        <span>Fully refundable</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
                        </svg>
                    </div>
                </div>
                <div className="pre-book-no-config-page__fixed-bottom__next__btn" onClick={() => setShowPopup(true)}>
                    <span>Book Now</span>
                </div>
                {showPopup && (
                    <Confirmation
                        confirmationMessage={confirmationMessage}
                        handleBooking={handleNextClick}
                        bookingDetails={bookingDetails}
                        onClose={() => setShowPopup(false)}
                    />
                )}
            </div>
        </div>
    );
}

export default PreBookingWithoutConfig;
