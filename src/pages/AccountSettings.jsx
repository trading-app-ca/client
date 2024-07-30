import React from 'react';
import Card from '../components/common/Card';
const AccountSettings = () => {
  return (
    <div className="grid-container">
      <Card title="Account Settings">
        <p>Manage your account details, security settings, and notification preferences.</p>
      </Card>
      <Card title="Profile Information">
        <form>
          <label>
            Full Name
            <input type="text" name="fullName" />
          </label>
          <label>
            Email
            <input type="email" name="email" />
          </label>
          <button type="submit">Save</button>
        </form>
      </Card>
      <Card title="Change Password">
        <form>
          <label>
            Current Password
            <input type="password" name="currentPassword" />
          </label>
          <label>
            Password
            <input type="password" name="password" />
          </label>
          <label>
            Confirm Password
            <input type="password" name="confirmPassword" />
          </label>
          <button type="submit">Save</button>
        </form>
      </Card>
      <Card title="Delete Account">
        <p>Warning: Deleting your account will permanently remove all your data.</p>
        <button className="delete-button">Delete</button>
      </Card>
    </div>
  );
};

export default AccountSettings;
