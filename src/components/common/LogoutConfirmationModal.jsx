import React from 'react';
import Card from './Card';

const LogoutConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <Card>
        <div className="logout-card">
          <h2>Confirm Logout</h2>
          <p>Are you sure you want to log out?</p>
          <div className="modal-buttons">
            <button onClick={onConfirm} className="btn lgt-btn confirm-button">Yes</button>
            <button onClick={onClose} className="btn drk-btn cancel-button">No</button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LogoutConfirmationModal;
