import React, { useState, useEffect } from 'react';
import Card from '../common/Card';

const NewTrade = ({
  orderType,
  setOrderType,
  cryptocurrency,
  setCryptocurrency,
  quantity,
  setQuantity,
  handleSubmit,
  balance,
  assets,
}) => {
  const [localCryptocurrencies, setLocalCryptocurrencies] = useState([]);
  const [localPrice, setLocalPrice] = useState(0);
  const [localTotal, setLocalTotal] = useState(0);

  useEffect(() => {
    fetch('https://api.binance.com/api/v3/exchangeInfo')
      .then((response) => response.json())
      .then((data) => {
        const symbols = data.symbols
          .filter((symbol) => symbol.quoteAsset === 'USDT')
          .map((symbol) => symbol.symbol);
        setLocalCryptocurrencies(symbols);
        setCryptocurrency(symbols[0] || 'BTCUSDT');
      })
      .catch((error) => console.error('Error fetching Binance data:', error));
  }, [setCryptocurrency]);

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

  useEffect(() => {
    if (quantity && localPrice) {
      setLocalTotal(quantity * localPrice);
    }
  }, [quantity, localPrice]);

  const handleOrderTypeChange = (e) => setOrderType(e.target.value);

  const handleCryptocurrencyChange = (e) => {
    setCryptocurrency(e.target.value);
    setLocalPrice(0);
    setQuantity('');
    setLocalTotal(0);
  };

  const handleQuantityChange = (e) => setQuantity(e.target.value);

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
            {localCryptocurrencies.map((symbol) => (
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
            />
          </label>
        </div>

        <p className="total">
          Total: <span className="highlight">${localTotal.toFixed(2)}</span>
        </p>
        <button className="btn lgt-btn confirm-button" onClick={handleSubmit}>
          Submit
        </button>
        <p className="balance">
          Balance: <span className="highlight">${balance.toFixed(2)}</span>
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
