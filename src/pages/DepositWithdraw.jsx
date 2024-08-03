import React, { useState } from 'react';
import Card from '../components/common/Card';
import '../styles/pages/DepositWithdraw.scss';

const DepositWithdraw = () => {
  const [mode, setMode] = useState('Deposit'); 

  const handleModeChange = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className="content-container">
      <Card title="Manage Your Funds">
        <p>Deposit or withdraw virtual funds to manage your account balance.</p>
        <p className="balance">Current Balance: <span className="highlight">$5,000.00</span></p>
      </Card>

      <Card title={`${mode} Funds`} className="transition-card">
        <div className={`withdraw-funds ${mode.toLowerCase()}-mode`}>
          <div className="toggle-buttons">
            <button
              className={`btn dw-btn ${mode === 'Deposit' ? 'lgt-btn active' : 'faded'}`}
              onClick={() => handleModeChange('Deposit')}
            >
              Deposit
            </button>
            <button
              className={`btn dw-btn ${mode === 'Withdraw' ? 'lgt-btn active' : 'faded'}`}
              onClick={() => handleModeChange('Withdraw')}
            >
              Withdraw
            </button>
          </div>

          <div className="amount-select">
            <label htmlFor="amount">Select Amount:</label>
            <select id="amount" name="amount" className="select-input">
              <option value="">-- Select an amount --</option>
              <option value="100">$100</option>
              <option value="500">$500</option>
              <option value="1000">$1,000</option>
              <option value="5000">$5,000</option>
              <option value="10000">$10,000</option>
            </select>
          </div>

          <div className="amount-input">
            <label htmlFor="customAmount">Enter Amount:</label>
            <input
              type="number"
              id="customAmount"
              placeholder="Enter Amount"
              step="0.01"
            />
          </div>

          <div className="action-buttons">
            <button className="btn confirm-button">
              Confirm {mode}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DepositWithdraw;
