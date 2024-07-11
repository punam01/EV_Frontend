import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice';
import { getCarByModelId } from '../../services/carServices';
import './PurchaseHistory.css';
import { fetchUserHistory, cancelBooking } from '../../services/testRideService';
import { getLocationById } from '../../services/locationServices';

const PurchaseHistory = () => {
    //const user = useSelector(selectUser);
    const customId = localStorage.getItem('USER');
    const [purchaseHistory, setPurchaseHistory] = useState([]);
    const [carDetails, setCarDetails] = useState({});
    const [locationDetails, setLocationDetails] = useState({});

    useEffect(() => {
        const fetchHistory = async (customId) => {
            try {
                const response = await fetchUserHistory(customId);
                setPurchaseHistory(response);
    
                if (response.length > 0) {
                    fetchCarDetails(response[0].modelName);
                    fetchLocationDetails(response[0].locationId);
                }
            } catch (error) {
                console.error('Error fetching purchase history:', error);
            }
        };
    
        if (customId) {
            fetchHistory(customId);
        }
    }, [customId]);


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
    const fetchLocationDetails = async (locationId) => {
        try {
            const locationDetails = await getLocationById(locationId);
            setLocationDetails(locationDetails);
        } catch (error) {
            console.error('Error fetching location details:', error);
        }
    };
    return (
        <div id="purchase" className="purchase-history-container">
            {purchaseHistory.length === 0 ? (
                <p>No purchase history available.</p>
            ) : (
                <div className="purchase-history-container__found">
                    <div className="purchase-history-container__image-holder">
                        <div className="purchase-history-container__img-container">
                            <img className="purchase-history-container__image-holder__img" src="/assets/images/car_3d_t.png" alt="" />
                        </div>
                        <div>
                            <div  className='purchase-history-container__image-holder__status'>{purchaseHistory[0].bookStatus==='booked'?'Booked':"Cancelled"}</div>
                            {purchaseHistory[0].bookStatus==='booked'?<button className="purchase-history-container__cancel" onClick={()=>handleCancelBooking(purchaseHistory[0]._id)}>
                                Cancel Booking
                            </button>:''}
                        </div>
                    </div>
                    <div className="purchase-history-container__orderid-holder">
                        <h3>Order #{purchaseHistory[0]._id.slice(-6)}</h3>
                        <div className="purchase-history-container__orderid-details">
                            <div className="purchase-history-container__orderid-details__data">
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-car-front" viewBox="0 0 16 16">
                                    <path d="M4 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0m10 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M6 8a1 1 0 0 0 0 2h4a1 1 0 1 0 0-2zM4.862 4.276 3.906 6.19a.51.51 0 0 0 .497.731c.91-.073 2.35-.17 3.597-.17s2.688.097 3.597.17a.51.51 0 0 0 .497-.731l-.956-1.913A.5.5 0 0 0 10.691 4H5.309a.5.5 0 0 0-.447.276" />
                                    <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848ZM4.82 3a1.5 1.5 0 0 0-1.379.91l-.792 1.847a1.8 1.8 0 0 1-.853.904.8.8 0 0 0-.43.564L1.03 8.904a1.5 1.5 0 0 0-.03.294v.413c0 .796.62 1.448 1.408 1.484 1.555.07 3.786.155 5.592.155s4.037-.084 5.592-.155A1.48 1.48 0 0 0 15 9.611v-.413q0-.148-.03-.294l-.335-1.68a.8.8 0 0 0-.43-.563 1.8 1.8 0 0 1-.853-.904l-.792-1.848A1.5 1.5 0 0 0 11.18 3z" />
                                </svg>
                                    <p>Auto3D Model</p></span>
                                <p>{purchaseHistory[0]?.modelName}</p>
                            </div>
                            <div className="purchase-history-container__orderid-details__data">
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8 1a3 3 0 1 0 0 6 3 3 0 0 0 0-6M4 4a4 4 0 1 1 4.5 3.969V13.5a.5.5 0 0 1-1 0V7.97A4 4 0 0 1 4 3.999zm2.493 8.574a.5.5 0 0 1-.411.575c-.712.118-1.28.295-1.655.493a1.3 1.3 0 0 0-.37.265.3.3 0 0 0-.057.09V14l.002.008.016.033a.6.6 0 0 0 .145.15c.165.13.435.27.813.395.751.25 1.82.414 3.024.414s2.273-.163 3.024-.414c.378-.126.648-.265.813-.395a.6.6 0 0 0 .146-.15l.015-.033L12 14v-.004a.3.3 0 0 0-.057-.09 1.3 1.3 0 0 0-.37-.264c-.376-.198-.943-.375-1.655-.493a.5.5 0 1 1 .164-.986c.77.127 1.452.328 1.957.594C12.5 13 13 13.4 13 14c0 .426-.26.752-.544.977-.29.228-.68.413-1.116.558-.878.293-2.059.465-3.34.465s-2.462-.172-3.34-.465c-.436-.145-.826-.33-1.116-.558C3.26 14.752 3 14.426 3 14c0-.599.5-1 .961-1.243.505-.266 1.187-.467 1.957-.594a.5.5 0 0 1 .575.411" />
                                </svg>
                                    <p>Location</p></span>
                                <p>{locationDetails ? locationDetails.address + ", " + locationDetails.city + ", " + locationDetails.state + ", " + locationDetails.pincode : ''}</p>
                            </div>
                        </div>
                        <div className="purchase-history-container__orderid-details">
                            <div className="purchase-history-container__orderid-details__data">
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-calendar" viewBox="0 0 16 16">
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                                </svg>
                                    <p>Date</p></span>
                                <p>{purchaseHistory[0]?.contact}</p>
                            </div>
                            <div className="purchase-history-container__orderid-details__data">
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
                                        <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z" />
                                        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z" />
                                        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5" />
                                    </svg><p>Time</p>
                                </span>
                                <p>{purchaseHistory[0] ? purchaseHistory[0].bookingTime : ''}</p>
                            </div>
                        </div>
                        <div className="purchase-history-container__orderid-details">

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PurchaseHistory;
