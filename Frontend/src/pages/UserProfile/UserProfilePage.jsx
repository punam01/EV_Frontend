import React, { useEffect, useState } from 'react';
import './UserProfilePage.css';

import { getUserByCustomId, updateUser } from '../../services/userServices';
import { fetchUserHistory, cancelBooking } from '../../services/testRideService';
import { useUser } from '../../contexts/UserContext';

function UserProfilePage() {
    const [activeTab, setActiveTab] = useState('profile');
    return (
        <div className="user-profile-page">
            <div className="tabs">
                <button className="tab-btn" onClick={() => setActiveTab('profile')}>Profile Settings</button>
                <button className="tab-btn" onClick={() => setActiveTab('history')}>Purchase History</button>
            </div>
            <div className="content">
                {activeTab === 'profile' ? (
                    <ProfileSettings />
                ) : (
                    <PurchaseHistory />
                )}
            </div>
        </div>
    );
}

function ProfileSettings() {
    const { user, setUser } = useUser();
    console.log(user)
    const [userProfile, setUserProfile] = useState({
        first_name: '',
        last_name: '',
        email: '',
        contact: '',
        address: '',
        pincode: '',
        custom_id: user ? user.uid : ''
    });

    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (user) {
            fetchUserProfile(user.uid);
        }
    }, [user]);

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
                custom_id: customId
            });
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleSaveClick = async () => {
        try {
            const updatedUser = await updateUser(userProfile.custom_id, userProfile);
            setUser(updatedUser);
            setEditMode(false);
            console.log('Profile updated successfully!');
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
        <div className='profile-settings'>
            <div className="group">
                <div className='form-label'>
                    <label>First Name</label>
                    <input
                        type="text"
                        name="first_name"
                        value={userProfile.first_name}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
                <div className='form-label'>
                    <label>Last Name</label>
                    <input
                        type="text"
                        name="last_name"
                        value={userProfile.last_name}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
                <div className='form-label'>
                    <label>Contact</label>
                    <div className='info'>
                    <input
                        type="text"
                        name="contact"
                        value={userProfile.contact}
                        onChange={handleChange}
                        disabled={true}
                    />
                    <div className="info-icon">
                        <i>ℹ️</i>
                        <div className="tooltip">Mobile number is not editable</div>
                    </div>
                    </div>
                </div>
            </div>
            <div className="group">
                <div className='form-label'>
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={userProfile.email}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
                <div className='form-label'>
                    <label>Pincode</label>
                    <input
                        type="text"
                        name="pincode"
                        value={userProfile.pincode}
                        onChange={handleChange}
                        disabled={!editMode}
                    />
                </div>
            </div>
            <div className='form-label'>
                <label>Address</label>
                <textarea
                    name="address"
                    value={userProfile.address}
                    onChange={handleChange}
                    disabled={!editMode}
                    rows={4}
                />
            </div>

            {!editMode ? (
                <button onClick={handleEditClick}>Edit</button>
            ) : (
                <button onClick={handleSaveClick}>Save</button>
            )}
        </div>
    );
}

function PurchaseHistory() {
    const { user } = useUser();
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    useEffect(() => {
        if (user) {
            fetchHistory(user.uid);
        }
    }, [user]);

    const fetchHistory = async (customId) => {
        try {
            const response = await fetchUserHistory(customId);
            setPurchaseHistory(response);
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

    return (
        <div className="purchase-history">
            {purchaseHistory.length === 0 ? (
                <p>No purchase history available.</p>
            ) : (
                <ul>
                    {purchaseHistory.map((history) => (
                        <li key={history._id} className="purchase-item">
                            <div className="purchase-details">
                                <p>Booking ID: {history._id}</p>
                                <p>Location ID: {history.locationId}</p>
                                <p>Model Name: {history.modelName}</p>
                                <p>Booking Time: {history.bookingTime}</p>
                                <p>Contact: {history.contact}</p>
                                <p>Status: {history.bookStatus}</p>
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
}

export default UserProfilePage;
