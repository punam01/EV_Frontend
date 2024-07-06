import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { getUserByCustomId, updateUser } from '../../services/userServices';
import { getBookingHistory } from '../../services/preBookingService';
import { getCarById } from '../../services/carServices';

const ProfilePage = () => {
    const [profile, setProfile] = useState(false);
    const [openViewDetails,setOpenViewDetails]=useState(false)
    const [orderHistory, setOrderHistory] = useState(true);
    const [demoDriveHistory, setDemoDriveHistory] = useState(false);
    const [userProfile, setUserProfile] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [carDetails, setCarDetails] = useState({});
    const customId = localStorage.getItem('customId');
    const id = localStorage.getItem('USER');
    const [selectedCarId, setSelectedCarId] = useState(null);

    useEffect(() => {
        if (customId) {
            fetchUserProfile(customId);
        }
    }, [customId]);

    useEffect(() => {
        if (id) {
            fetchBookingHistory(id);
        }
    }, [id]);

    const handleViewDetails = (carId) => {
        setSelectedCarId(carId);
        console.log(selectedCarId)
        setOpenViewDetails(true);
    };
    const fetchUserProfile = async (customId) => {
        try {
            const response = await getUserByCustomId(customId);
            setUserProfile({
                first_name: response.first_name,
                last_name: response.last_name,
                email: response.email,
                contact: response.contact,
                address: response.address,
                pincode: response.pincode,
                custom_id: customId,
            });
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const fetchBookingHistory = async (customId) => {
        try {
            const bookings = await getBookingHistory(customId);
            setBookings(bookings);
            //console.log("Bookings",bookings)
        } catch (error) {
            console.error('Error fetching booking history:', error);
        }
    };

    const fetchCarDetails = async (id) => {
        try {
            const carId = id; // Adjust according to ID format
            const carDets = await getCarById(carId);
            setCarDetails(prevState => ({
                ...prevState,
                [carId]: carDets,
            }));
        } catch (error) {
            console.error('Error fetching car details:', error);
        }
    };

    useEffect(() => {
        bookings.forEach(booking => {
            fetchCarDetails(booking.carId._id);
        });
    }, [bookings]);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = async () => {
        try {
            await updateUser(userProfile.custom_id, userProfile);
            setEditMode(false);
        } catch (error) {
            console.error('Error updating user profile:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className='profile-page-container'>
            <div className="profile-page-container__sidebar-container">
                <ul className='profile-page-container__sidebar-ul'>
                <li className='profile-page-container__sidebar-li'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg>
                        <span className='profile-page-container__sidebar-li-span'>Profile Settings</span>
                    </li>
                    <li className='profile-page-container__sidebar-li'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-ev-front-fill" viewBox="0 0 16 16">
                            <path d="M2.52 3.515A2.5 2.5 0 0 1 4.82 2h6.362c1 0 1.904.596 2.298 1.515l.792 1.848c.075.175.21.319.38.404.5.25.855.715.965 1.262l.335 1.679q.05.242.049.49v.413c0 .814-.39 1.543-1 1.997V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.338c-1.292.048-2.745.088-4 .088s-2.708-.04-4-.088V13.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.892c-.61-.454-1-1.183-1-1.997v-.413a2.5 2.5 0 0 1 .049-.49l.335-1.68c.11-.546.465-1.012.964-1.261a.8.8 0 0 0 .381-.404l.792-1.848Zm6.75.51a.186.186 0 0 0-.23.034L6.05 7.246a.188.188 0 0 0 .137.316h1.241l-.673 2.195a.19.19 0 0 0 .085.218c.075.043.17.03.23-.034l2.88-3.187a.188.188 0 0 0-.137-.316H8.572l.782-2.195a.19.19 0 0 0-.085-.218Z" />
                        </svg>
                        <span className='profile-page-container__sidebar-li-span'>Order History</span>
                    </li>
                    <li className='profile-page-container__sidebar-li'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-card-list" viewBox="0 0 16 16">
                            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                            <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5M3 4.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm1.5 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm1.5 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm1.5 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-5 7a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z" />
                        </svg>
                        <span className='profile-page-container__sidebar-li-span'>Demo Drive History</span>
                    </li>
                </ul>
            </div>
            <div className="profile-page-container__content-container">
            {
                    profile && (
                        <div className='profile-page-container__sub-content-container'>
                            <h1 className='profile-page-container__sub-content__h1'>Profile Settings</h1>
                            <div className="profile-page-container__data">
                                <div className="profile-page-container__data-item">
                                    <label className="profile-page-container__label">First name</label>
                                    <input
                                        type="text"
                                        name="first_name"
                                        value={userProfile.first_name || ''}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className="profile-page-container__data-item">
                                    <label className="profile-page-container__label">Last name</label>
                                    <input
                                        type="text"
                                        className="profile-page-container__input"
                                        name="last_name"
                                        value={userProfile.last_name || ''}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className="profile-page-container__data-item">
                                    <label className="profile-page-container__label">Pincode</label>
                                    <input
                                        type="text"
                                        className="profile-page-container__input"
                                        name="pincode"
                                        value={userProfile.pincode || ''}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className="profile-page-container__data-item">
                                    <label className="profile-page-container__label">Email</label>
                                    <input
                                        type="text"
                                        className="profile-page-container__input"
                                        name="email"
                                        value={userProfile.email || ''}
                                        onChange={handleChange}
                                        disabled={!editMode}
                                    />
                                </div>
                                <div className="profile-page-container__data-item">
                                    <label className="profile-page-container__label">Contact</label>
                                    <input
                                        type="text"
                                        className="profile-page-container__input"
                                        name="contact"
                                        value={userProfile.contact || ''}
                                        disabled={true}
                                    />
                                </div>
                            </div>
                            {!editMode ? (
                                <button className="profile-page-container__button" onClick={handleEditClick}>Edit Profile</button>
                            ) : (
                                <button className="profile-page-container__button" onClick={handleSaveClick}>Save Profile</button>
                            )}
                        </div>
                    )
                }
                {!openViewDetails && orderHistory && (
                    <div className='profile-page-container__order-history'>
                        <div className='profile-page-container__sub-content-container'>
                            <h1 className='profile-page-container__sub-content__h1'>Order History</h1>
                            {bookings.length > 0 ? (
                                <div className="profile-page-container__data">
                                    {bookings.map((booking) => {
                                        const car = carDetails[booking.carId._id];
                                        return (
                                            <div key={booking._id} className="profile-page-container__card-item">
                                                <div className="profile-page-container__card-img">
                                                    <img src='/assets/images/bmw_no_config.jpg' alt="Car" />
                                                </div>
                                                <div className="profile-page-container__card-dets">
                                                    <div className="profile-page-container__card-left">
                                                        <p className='profile-page-container__card__p'>{car?.name || 'Car Name'}</p>
                                                        <span className='profile-page-container__card-span' onClick={()=>handleViewDetails(booking.carId._id)}>View details</span>
                                                    </div>
                                                    <div className="profile-page-container__card-right">
                                                        <p>Download Invoice</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <p>No bookings found</p>
                            )}
                        </div>
                    </div>
                )}
                {openViewDetails && selectedCarId && (
                    <div className="car-details">
                        <h2>Car Details</h2>
                        {carDetails[selectedCarId] ? (
                            <div>
                                <p><strong>Car Name:</strong> {carDetails[selectedCarId].name}</p>
                                <p><strong>Car Model:</strong> {carDetails[selectedCarId].model}</p>
                                <p><strong>Car Color:</strong> {carDetails[selectedCarId].color}</p>
                                {/* Add other car details as needed */}
                            </div>
                        ) : (
                            <p>Loading car details...</p>
                        )}
                        <button onClick={() => setOpenViewDetails(false)}>Close</button>
                    </div>
                )}
                {demoDriveHistory && (
                    <div className='profile-page-container__demo-drive-history'>
                        <h2>Demo Drive History</h2>
                        {/* Display demo drive history here */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;
