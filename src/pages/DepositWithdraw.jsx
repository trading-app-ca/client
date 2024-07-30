import React from 'react';
import Card from '../components/common/Card';

const DepositWithdraw = () => {
  return (
    <div className="grid-container">
      <Card title="Manage Your Funds">
        <p>Deposit or withdraw virtual funds to manage your account balance.</p>
        <p>Current Balance: <span className="highlight">$5,000.00</span></p>
      </Card>
      <Card title="Withdraw Funds">
        <div className="withdraw-funds">
          <div className="toggle-buttons">
            <button className="active">Deposit</button>
            <button>Withdraw</button>
          </div>
          <div className="amount-buttons">
            <button>$100</button>
            <button>$500</button>
            <button>$1,000</button>
            <button>$5,000</button>
            <button>$10,000</button>
          </div>
          <input type="text" placeholder="Enter Amount" />
          <div className="action-buttons">
            <button>Reset</button>
            <button className="confirm-button">Confirm Deposit</button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DepositWithdraw;
