import React, { useState } from 'react';
import Card from '../components/common/Card';

const AccountSettings = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSaveProfile = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!fullName.trim()) validationErrors.fullName = 'Full Name is required';
    if (!email.trim()) validationErrors.email = 'Email is required';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert('Profile information saved!');
    }
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!currentPassword.trim()) validationErrors.currentPassword = 'Current Password is required';
    if (!newPassword.trim()) validationErrors.newPassword = 'New Password is required';
    if (newPassword !== confirmPassword) validationErrors.confirmPassword = 'Passwords do not match';

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      alert('Password changed successfully!');
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
          <button className="delete-button btn drk-btn">Delete</button>
        </div>
      </Card>
    </div>
  );
};

export default AccountSettings;
