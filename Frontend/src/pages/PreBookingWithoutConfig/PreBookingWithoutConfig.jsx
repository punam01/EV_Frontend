import React, { useEffect, useState } from 'react';
import './PreBookingWithoutConfig.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { bookCar } from '../../services/preBookingService';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Confirmation from '../../components/Confirmation/Confirmation';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import { sendEmail } from '../../services/emailServices';

const PreBookingWithoutConfig = () => {
    const [showPopup, setShowPopup] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [bookingDetails, setBookingDetails] = useState('');
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedIntColor, setSelectedIntColor] = useState("");
    const [selectedWheelColor, setSelectedWheelColor] = useState('');
    const [selectedGlassColor, setSelectedGlassColor] = useState('');
    const [carImage, setCarImage] = useState('/assets/images/bmw_no_config.jpg');
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

    useEffect(() => {
        if (selectedColor) {
            setCarImage(`/assets/images/cars/${selectedColor.toLowerCase()}_left.png`);
        }
    }, [selectedColor]);

    const onClose=()=>{
        setShowPopup(false)

        setTimeout(() => {
            navigate('/profile');
        }, 2000);
    }
    const calculateEstimatedPrice = (customizations) => {
        return Object.values(customizations).reduce((total, option) => {
            if (option && option.price) {
                return total + option.price;
            }
            return total;
        }, 0);
    }

    const handleColorClick = (color, type) => {
        console.log(color);
        const keyMapping = {
            'Exterior Color': 'exteriorColor',
            'Interior Color': 'interiorColor',
            'Wheels': 'wheelColor',
            'Glass': 'glass'
        };
        const customizationKey = keyMapping[type];
        const colorOption = car?.customizableOptions.find(option =>
            option.name === type && option.options.some(opt => opt.name === color)
        );

        if (colorOption) {
            const selectedOption = colorOption.options.find(opt => opt.name === color);
            const price = selectedOption.price;

            setCustomization(prev => ({
                ...prev,
                [customizationKey]: { value: color, price: price }
            }));

            const newEstimatedPrice = calculateEstimatedPrice({
                ...customization,
                [customizationKey]: { value: color, price: price }
            });
            setEstimatedPrice(newEstimatedPrice);

            switch (type) {
                case 'Exterior Color':
                    setSelectedColor(color);
                    break;
                case 'Interior Color':
                    setSelectedIntColor(color);
                    break;
                case 'Wheels':
                    setSelectedWheelColor(color);
                    break;
                case 'Glass':
                    setSelectedGlassColor(color);
                    break;
                default:
                    break;
            }
        } else {
            setCustomization(prev => ({
                ...prev,
                [type.toLowerCase()]: { value: "", price: 0 }
            }));
            console.log(customization)
            setEstimatedPrice(calculateEstimatedPrice({
                ...customization,
                [type.toLowerCase()]: { value: "", price: 0 }
            }));

            switch (type) {
                case 'Exterior Color':
                    setSelectedColor("");
                    break;
                case 'Interior Color':
                    setSelectedIntColor("");
                    break;
                case 'Wheels':
                    setSelectedWheelColor("");
                    break;
                case 'Glass':
                    setSelectedGlassColor("");
                    break;
                default:
                    break;
            }
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
            [selectedColor || 'No Color Selected', selectedIntColor || 'Black', selectedWheelColor || 'Black', selectedGlassColor || 'Tinted', `$${estimatedPrice}`]
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
        console.log(customization)
        const bookingData = {
            userId: localStorage.getItem('USER'),
            carId: car.carId,
            bookingTime: new Date(),
            contact: localStorage.getItem('email') || localStorage.getItem('phone'),
            customization: customization,
            pincode: car.pincode || localStorage.getItem('zip'),
            estimatedPrice: estimatedPrice
        };
        setBookingDetails(bookingData);
        try {
            const response = await bookCar(bookingData);
            console.log('booking data',response)
            const emailResult = await sendEmail(response);
            if (!emailResult.success) {
                alert(emailResult.message);
            }
            else{
                console.log('email sent')
                alert("Email sent successfully!")
            }
        } catch (error) {
            if (error.code === 11000) {
                toast('You have already booked a similar car within the last 24 hours. Please try again later.');
            } else {
                console.error('Error booking car:', error);
                toast('You have already booked a similar car within the last 24 hours. Please try again later.');
            }
        }
    };

    return (
        <div className='pre-book-no-config-page'>
            <div className="pre-book-no-config-page__image__holder">
                <img src={carImage} alt="" />
            </div>
            <div className="pre-book-no-config-page__booking__holder">
                <h2 className='pre-book-no-config-page__booking__holder__title'>Book your {car?.name || "Car"}</h2>
                <div className="important">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 1.64-.287z" />
                        <path d="M8 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                    </svg>
                    <span>Customizations are optional. If you do not select any options, default options will be applied.</span>
                </div>
                <div className="pre-book-no-config-page__color__holder">
                    <div className="pre-book-no-config-page__title__container">
                        <h3 className="pre-book-no-config-page__title">Pick exterior color</h3>
                        <span>{selectedColor || 'None'}</span>
                    </div>
                    <div className="pre-book-no-config-page__title__standard-color">
                        {car?.customizableOptions?.find(option => option.name === "Exterior Color")?.options?.map(color => (
                            <div
                                key={color.name}
                                style={{ backgroundColor: color.code }}
                                data-tooltip={color.name}
                                onClick={() => handleColorClick(color.name, 'Exterior Color')}
                                className={`pre-book-no-config-page__title__color-swatch ${color.name} ${selectedColor === color.name ? 'selected' : ''}`}
                            >
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pre-book-no-config-page__color__holder">
                    <div className="pre-book-no-config-page__title__container">
                        <h3 className="pre-book-no-config-page__title">Pick interior color</h3>
                        <span>{selectedIntColor || 'None'}</span>
                    </div>
                    <div className="pre-book-no-config-page__title__standard-color">
                        {car?.customizableOptions?.find(option => option.name === "Interior Color")?.options?.map(color => (
                            <div
                                key={color.name}
                                style={{ backgroundColor: color.code }}
                                data-tooltip={color.name}
                                onClick={() => handleColorClick(color.name, 'Interior Color')}
                                className={`pre-book-no-config-page__title__color-swatch ${color.name} ${selectedIntColor === color.name ? 'selected' : ''}`}
                            >
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pre-book-no-config-page__color__holder">
                    <div className="pre-book-no-config-page__title__container">
                        <h3 className="pre-book-no-config-page__title">Pick wheel</h3>
                        <span>{selectedWheelColor || 'None'}</span>
                    </div>
                    <div className="pre-book-no-config-page__title__standard-color">
                        {car?.customizableOptions?.find(option => option.name === "Wheels")?.options?.map(color => (
                            <div
                                key={color.name}
                                style={{ backgroundColor: color.code }}
                                data-tooltip={color.name}
                                onClick={() => handleColorClick(color.name, 'Wheels')}
                                className={`pre-book-no-config-page__title__color-swatch ${color.code} ${selectedWheelColor === color.code ? 'selected' : ''}`}
                            >
                            </div>
                        ))}
                    </div>
                </div>
                <div className="pre-book-no-config-page__fixed-bottom">
                    <div className="fixed-bottom-top">
                        <p>Booking Amount <br/><span>$ 999</span></p>
                        <p>Estimated Price <br/><span>$ {estimatedPrice}</span></p>
                    </div>
                </div>
                <div className="pre-book-no-config-page__fixed-bottom__next__btn" onClick={() => setShowPopup(true)}>
                    <span>Book Now</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                    </svg>
                </div>
                {/*<div className="pre-book-no-config-page__color__holder">
                    <div className="pre-book-no-config-page__title__container">
                        <h3 className="pre-book-no-config-page__title">Pick glass type</h3>
                        <span>{selectedGlassColor || 'None'}</span>
                    </div>
                    <div className="pre-book-no-config-page__title__standard-color">
                        {car?.customizableOptions?.find(option => option.name === "Glass")?.options?.map(color => (
                            <div
                                key={color.name}
                                style={{ backgroundColor: color.code }}
                                data-tooltip={color.name}
                                onClick={() => handleColorClick(color.code, 'Glass')}
                                className={`pre-book-no-config-page__title__color-swatch ${color.code} ${selectedGlassColor === color.code ? 'selected' : ''}`}
                            >
                            </div>
                        ))}
                    </div>*/}

            </div>
            {showPopup && (
                <Confirmation
                    handleBooking={handleNextClick}
                    bookingDetails={bookingDetails}
                    onClose={onClose}
                />
            )}
        </div>
    );
}

export default PreBookingWithoutConfig;
