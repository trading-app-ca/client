import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, logout } from '../redux/authSlice'; 
import Card from '../components/common/Card';
import ApiManager from '../apimanager/ApiManager'; 

const AccountSettings = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFullName(`${user.firstName} ${user.lastName}`);
      setEmail(user.email);
    }
  }, [user]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!fullName.trim()) validationErrors.fullName = 'Full Name is required';
    if (!email.trim()) validationErrors.email = 'Email is required';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const [firstName, lastName] = fullName.split(' ');

      try {
        await ApiManager.updateUserInfo({ firstName, lastName, email });
        alert('Profile information saved!');
        dispatch(fetchUserData());
      } catch (error) {
        alert('Error saving profile information.');
        console.error(error);
      }
    }
  };

  const handleSavePassword = async (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!currentPassword.trim()) validationErrors.currentPassword = 'Current Password is required';
    if (!newPassword.trim()) validationErrors.newPassword = 'New Password is required';
    if (newPassword !== confirmPassword) validationErrors.confirmPassword = 'Passwords do not match';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        await ApiManager.verifyPassword(currentPassword);
        await ApiManager.updateUserInfo({ password: newPassword });
        alert('Password changed successfully!');
      } catch (error) {
        alert('Error changing password or incorrect current password.');
        console.error(error);
      }
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        await ApiManager.deleteUser();
        alert('Account deleted successfully.');
        dispatch(logout()); 
      } catch (error) {
        alert('Error deleting account.');
        console.error(error);
      }
    }
  };

  return (
    <div className="content-container">
      <Card title="Account Settings">
        <p>Manage your account details, security settings, and notification preferences.</p>
      </Card>

      <div className="row">
        <Card title="Profile Information">
          <div className="form-container">
            <form onSubmit={handleSaveProfile}>
              <div className="form-input">
                <label htmlFor="fullName">Full Name</label>
                <input className="drk-btn"
                  type="text" 
                  name="fullName" 
                  id="fullName" 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)} 
                />
                {errors.fullName && <p className="error-text">{errors.fullName}</p>}
              </div>
              <div className="form-input">
                <label htmlFor="email">Email</label>
                <input className="drk-btn"
                  type="email" 
                  name="email" 
                  id="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>
              <div className="action-buttons">
                <button type="submit" className="btn confirm-button">Save</button>
              </div>
            </form>
          </div>
        </Card>
        
        <Card title="Change Password">
          <div className="form-container">
            <form onSubmit={handleSavePassword}>
              <div className="form-input">
                <label htmlFor="currentPassword">Current Password</label>
                <input className="drk-btn"
                  type="password" 
                  name="currentPassword" 
                  id="currentPassword" 
                  value={currentPassword} 
                  onChange={(e) => setCurrentPassword(e.target.value)} 
                />
                {errors.currentPassword && <p className="error-text">{errors.currentPassword}</p>}
              </div>
              <div className="form-input">
                <label htmlFor="password">New Password</label>
                <input className="drk-btn"
                  type="password" 
                  name="password" 
                  id="password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                />
                {errors.newPassword && <p className="error-text">{errors.newPassword}</p>}
              </div>
              <div className="form-input">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input className="drk-btn"
                  type="password" 
                  name="confirmPassword" 
                  id="confirmPassword" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                />
                {errors.confirmPassword && <p className="error-text">{errors.confirmPassword}</p>}
              </div>
              <div className="action-buttons">
                <button type="submit" className="btn confirm-button">Save</button>
              </div>
            </form>
          </div>
        </Card>
      </div>

      <Card title="Delete Account">
        <p>Warning: Deleting your account will permanently remove all your data.</p>
        <div className="delete-button">
          <button onClick={handleDeleteAccount} className="delete-button btn drk-btn">Delete</button>
        </div>
      </Card>
    </div>
  );
};

export default AccountSettings;
