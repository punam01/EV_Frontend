import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import { getCarByModelId } from '../../services/carServices';
import './PurchaseHistory.css';
import { fetchUserHistory,cancelBooking } from '../../services/testRideService';

const PurchaseHistory = () => {
    const user = useSelector(selectUser);
    const customId = localStorage.getItem('USER');
    console.log(customId)
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    console.log(user,customId)
    const [carDetails, setCarDetails] = useState({});

    useEffect(() => {
        if (customId) {
            fetchHistory(customId);
        }
    }, [user]);

    useEffect(() => {
        setPurchaseHistory(purchaseHistory);
    }, [purchaseHistory]);

    const fetchHistory = async (customId) => {
        try {
            const response = await fetchUserHistory(customId);
            setPurchaseHistory(response);
            console.log(response[0].modelName)
            fetchCarDetails(response[0].modelName);
        } catch (error) {
            console.error('Error fetching purchase history:', error);
        }
    };

    const handleCancelBooking = async (bookId) => {
        try {
            await cancelBooking(bookId);
            setPurchaseHistory((prevHistory) =>
                prevHistory.map((booking) =>
                    booking._id === bookId ? { ...booking, bookStatus: 'cancelled' } : booking
                )
            );
        } catch (error) {
            console.error('Error canceling booking:', error);
        }
    };

    const fetchCarDetails = async (history) => {
        console.log(history)
        try {
                const carDetails = await getCarByModelId(history);          
                setCarDetails(carDetails);
        } catch (error) {
            console.error('Error fetching car details:', error);
        }
    };
    return (
        <div id="purchase" className="purchase-history">
            {purchaseHistory.length === 0 ? (
                <p>No purchase history available.</p>
            ) : (
                <ul style={{ display: 'block' }}>
                    {purchaseHistory.map((history) => (
                        <li key={history._id} className="purchase-item">
                            <div className="purchase-details">
                                <p>Booking ID: {history._id}</p>
                                <p>Location ID: {history.locationId}</p>
                                <p>Model Name: {history.modelName}</p>
                                <p>Booking Time: {history.bookingTime}</p>
                                <p>Contact: {history.contact}</p>
                                <p>Status: {history.bookStatus}</p>
                                {carDetails && (
                                    <>
                                        <p>Car Name: {carDetails.name}</p>
                                        <p>Base Price: ${carDetails.basePrice}</p>
                                        <p>Range: {carDetails.range}</p>
                                        <p>Top Speed: {carDetails.topSpeed} mph</p>
                                        <p>Seating Capacity: {carDetails.seatingCapacity}</p>
                                        <p>Cargo Capacity: {carDetails.cargoCapacity} cubic feet</p>
                                        <p>Acceleration: {carDetails.acceleration} seconds (0-60 mph)</p>
                                    </>
                                )}
                            </div>
                            {history.bookStatus !== 'cancelled' && (
                                <button
                                    className="cancel-btn"
                                    onClick={() => handleCancelBooking(history._id)}
                                >
                                    Cancel Booking
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PurchaseHistory;
