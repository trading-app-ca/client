import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../common/Card';
import { fetchPortfolioData } from '../../redux/portfolioSlice';
import { fetchUserData } from '../../redux/authSlice';
import { createTrade } from '../../redux/tradeSlice'; 

// Component to handle creating new trades (buy/sell cryptocurrency)
const NewTrade = ({ orderType, setOrderType, cryptocurrency, setCryptocurrency, quantity, setQuantity }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { assets } = useSelector((state) => state.portfolio);
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [localPrice, setLocalPrice] = useState(0);
  const [localTotal, setLocalTotal] = useState(0);

  // Fetch user data and portfolio data when the component mounts
  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchPortfolioData());

    fetch('https://api.binance.com/api/v3/exchangeInfo')
      .then((response) => response.json())
      .then((data) => {
        const symbols = data.symbols
          .filter((symbol) => symbol.quoteAsset === 'USDT')
          .map((symbol) => symbol.symbol);
        setCryptocurrencies(symbols);

        if (orderType === 'Sell' && assets.length > 0 && !cryptocurrency) {
          setCryptocurrency(`${assets[0].asset}USDT`);
        } else if (orderType === 'Buy' && !cryptocurrency) {
          setCryptocurrency(symbols[0] || 'BTCUSDT');
        }
      })
      .catch((error) => console.error('Error fetching Binance data:', error));
  }, [dispatch, orderType, cryptocurrency, setCryptocurrency, assets]);

  // Fetch current price of the selected cryptocurrency
  useEffect(() => {
    if (cryptocurrency) {
      fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${cryptocurrency}`)
        .then((response) => response.json())
        .then((data) => {
          setLocalPrice(parseFloat(data.price));
        })
        .catch((error) => console.error('Error fetching price data:', error));
    }
  }, [cryptocurrency]);

  // Update total cost based on quantity and current price
  useEffect(() => {
    if (quantity && localPrice) {
      setLocalTotal(quantity * localPrice);
    }
  }, [quantity, localPrice]);

  const handleOrderTypeChange = (e) => {
    const newOrderType = e.target.value;
    setOrderType(newOrderType);
    setQuantity('');

    if (newOrderType === 'Sell' && assets.length > 0) {
      setCryptocurrency(`${assets[0].asset}USDT`);
    } else if (newOrderType === 'Buy' && cryptocurrencies.length > 0) {
      setCryptocurrency(cryptocurrencies[0] || 'BTCUSDT');
    }
  };

  const handleCryptocurrencyChange = (e) => {
    setCryptocurrency(e.target.value);
    setLocalPrice(0);
    setQuantity('');
    setLocalTotal(0);
  };

  const handleQuantityChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setQuantity(value);

    if (orderType === 'Sell') {
      const selectedAsset = assets.find(asset => asset.asset === cryptocurrency.replace('USDT', ''));
      if (selectedAsset && value > selectedAsset.quantity) {
        setQuantity(selectedAsset.quantity);
      }
    }
  };

  // Submit the trade order and update portfolio data
  const handleSubmit = async () => {
    if (quantity && localTotal) {
      const tradeData = {
        type: orderType.toLowerCase(),
        assetName: cryptocurrency.replace('USDT', ''), 
        quantity: parseFloat(quantity),
        price: localPrice,
      };

      try {
        await dispatch(createTrade(tradeData)).unwrap();
        alert('Order placed successfully');
        dispatch(fetchPortfolioData()); 
        setQuantity(''); 
        setCryptocurrency('');
        setLocalTotal(0);
      } catch (error) {
        console.error('Error placing trade:', error);
        alert('Failed to place trade.');
      }
    }
  };

  const availableCryptocurrencies = orderType === 'Sell'
    ? assets.map(asset => `${asset.asset}USDT`)
    : cryptocurrencies;

  return (
    <Card title="Place Your Order">
      <div className="withdraw-funds">
        <div className="toggle-buttons">
          <label>
            <input
              type="radio"
              value="Buy"
              checked={orderType === 'Buy'}
              onChange={handleOrderTypeChange}
            />{' '}
            Buy
          </label>
          <label>
            <input
              type="radio"
              value="Sell"
              checked={orderType === 'Sell'}
              onChange={handleOrderTypeChange}
            />{' '}
            Sell
          </label>
        </div>

        <div className="amount-select">
          <label htmlFor="cryptocurrency">Select Cryptocurrency:</label>
          <select
            id="cryptocurrency"
            name="cryptocurrency"
            className="select-input"
            value={cryptocurrency}
            onChange={handleCryptocurrencyChange}
          >
            {availableCryptocurrencies.map((symbol) => (
              <option key={symbol} value={symbol}>
                {symbol.replace('USDT', '')}
              </option>
            ))}
          </select>
        </div>

        <div className="amount-input">
          <label>
            Quantity:
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              max={orderType === 'Sell' ? assets.find(asset => asset.asset === cryptocurrency.replace('USDT', ''))?.quantity || '' : ''}
            />
          </label>
        </div>

        <p className="total">
          Total: <span className="highlight">${localTotal.toFixed(2)}</span>
        </p>

        <button className="btn lgt-btn confirm-button" onClick={handleSubmit} disabled={!cryptocurrency || quantity <= 0}>
          Submit
        </button>

        <p className="balance">
          Balance: <span className="highlight">${user?.balance?.toFixed(2) || '0.00'}</span>
        </p>

        <div className="assets">
          <p className="assets-title">
            <strong>Assets:</strong>
          </p>
          {assets.length > 0 ? (
            assets.map((asset) => (
              <p key={asset._id}>
                {asset.asset}: <span className="highlight">{asset.quantity}</span>
              </p>
            ))
          ) : (
            <p>No assets available.</p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default NewTrade;
