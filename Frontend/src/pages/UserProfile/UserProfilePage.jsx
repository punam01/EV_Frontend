import React, { useEffect, useState } from 'react';
import './UserProfilePage.css';

import { useSelector, useDispatch } from 'react-redux';
import { getUserByCustomId, updateUser } from '../../services/userServices';
import { fetchUserHistory, cancelBooking } from '../../services/testRideService';
import { clearUser, selectUser, setUser } from '../../features/user/userSlice';

function UserProfilePage() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('profile');
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(clearUser());
  };

  return (
    <div className="user-profile-page">
      <div className="tabs">
        <button className="tab-btn" onClick={() => setActiveTab('profile')}>Profile Settings</button>
        <button className="tab-btn" onClick={() => setActiveTab('history')}>Purchase History</button>
        <button className='tab-btn' onClick={handleLogout}>Logout</button>
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
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const customId = localStorage.getItem('customId')
  const [userProfile, setUserProfile] = useState({});
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem('customId');
    if (userId) {
      fetchUserProfile(userId);
    }
  }, []);

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
      localStorage.setItem('USER', response._id)
      localStorage.setItem('customId', user.uid)
      localStorage.setItem('phone', user.phoneNumber)
      localStorage.setItem('name', response.first_name)
      localStorage.setItem('email', response.email)
      localStorage.setItem('last_name', response.last_name)
      localStorage.setItem('zip', response.pincode)
      localStorage.setItem('address', response.address)
      console.log("response", response);
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
      dispatch(setUser(updatedUser));
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
  const user = useSelector(selectUser);
  const customId = localStorage.getItem('USER')
  console.log(customId)
  const [purchaseHistory, setPurchaseHistory] = useState([

  ]);

  useEffect(() => {
    if (customId) {
      fetchHistory(customId);
    }
  }, [user]);

  useEffect(() => {
    console.log("purchaseHistory updated:", purchaseHistory);
    setPurchaseHistory(purchaseHistory)
  }, [purchaseHistory]);

  const fetchHistory = async (customId) => {
    try {
      const response = await fetchUserHistory(customId);
      setPurchaseHistory(response);
      console.log("response", purchaseHistory)
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
  console.log(purchaseHistory.length)
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
