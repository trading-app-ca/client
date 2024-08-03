import React from 'react';
import Card from '../components/common/Card';
import '../styles/pages/AccountSettings.scss';

const AccountSettings = () => {
  return (
    <div className="content-container">
      <Card title="Account Settings">
        <p>Manage your account details, security settings, and notification preferences.</p>
      </Card>

      <Card title="Profile Information">
        <div className="form-container">
          <form>
            <div>
              <label htmlFor="fullName">Full Name</label>
              <input type="text" name="fullName" id="fullName" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" />
            </div>
            <button type="submit" className="btn lgt-btn">Save</button>
          </form>
        </div>
      </Card>
      
      <Card title="Change Password">
        <div className="form-container">
          <form>
            <div>
              <label htmlFor="currentPassword">Current Password</label>
              <input type="password" name="currentPassword" id="currentPassword" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" name="confirmPassword" id="confirmPassword" />
            </div>
            <button type="submit" className="btn lgt-btn">Save</button>
          </form>
        </div>
      </Card>
    
      <Card title="Delete Account">
        <p>Warning: Deleting your account will permanently remove all your data.</p>
        <button className="delete-button btn drk-btn">Delete</button>
      </Card>
    </div>
  );
};

export default AccountSettings;
