import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/common/Card';
import { fetchUserBalance, depositFunds, withdrawFunds } from '../redux/depositWithdrawSlice';

const DepositWithdraw = () => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.depositWithdraw.balance);

  // State to manage deposit/withdraw mode and input amounts
  const [mode, setMode] = useState('Deposit');
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');

  // Fetch user balance when component mounts
  useEffect(() => {
    dispatch(fetchUserBalance());
  }, [dispatch]);

  // Switch between Deposit and Withdraw modes
  const handleModeChange = (newMode) => setMode(newMode);

  // Update selected amount from dropdown
  const handleDropdownChange = (e) => {
    setSelectedAmount(e.target.value);
    setCustomAmount('');
  };

  // Update custom amount from input field
  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount('');
  };

  // Handle the confirm action based on the current mode
  const handleConfirm = () => {
    const amount = selectedAmount || customAmount;
    
    // Validate the entered amount
    if (!amount || amount <= 0) {
      alert('Please select or enter a valid amount.');
      return;
    }

    const numericAmount = parseFloat(amount);

    // Handle deposit action
    if (mode === 'Deposit') {
      dispatch(depositFunds(numericAmount));
    } else if (mode === 'Withdraw') {
      if (numericAmount > balance) {
        alert('Insufficient balance.');
        return;
      }
      dispatch(withdrawFunds(numericAmount));
    }

    alert(`${mode} of $${numericAmount.toFixed(2)} successful!`);
    setSelectedAmount('');
    setCustomAmount('');
  };

  return (
    <div className="content-container">
      <Card title="Manage Your Funds">
        <p>Deposit or withdraw virtual funds to manage your account balance.</p>
        <p className="balance">Current Balance: <span className="highlight">${balance.toFixed(2)}</span></p>
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
            <select 
              id="amount" 
              name="amount" 
              className="select-input" 
              value={selectedAmount} 
              onChange={handleDropdownChange} 
              disabled={customAmount !== ''} 
            >
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
              value={customAmount}
              onChange={handleCustomAmountChange}
              disabled={selectedAmount !== ''} 
            />
          </div>

          <div className="action-buttons">
            <button className="btn confirm-button" onClick={handleConfirm}>
              Confirm {mode}
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DepositWithdraw;
