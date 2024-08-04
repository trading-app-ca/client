import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import { fakeCustomerData } from '../../data'; 

const NewTrade = () => {
  const [orderType, setOrderType] = useState('Buy');
  const [cryptocurrency, setCryptocurrency] = useState('BTCUSDT');
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [balance, setBalance] = useState(fakeCustomerData.balance);
  const [holdings, setHoldings] = useState(
    fakeCustomerData.assets.reduce((acc, asset) => {
      acc[`${asset.symbol}USDT`] = asset.quantityHeld;
      return acc;
    }, {})
  );
  const [tradeHistory, setTradeHistory] = useState(fakeCustomerData.recentTrades);

  useEffect(() => {
    fetch('https://api.binance.com/api/v3/exchangeInfo')
      .then(response => response.json())
      .then(data => {
        const symbols = data.symbols
          .filter(symbol => symbol.quoteAsset === 'USDT')
          .map(symbol => symbol.symbol);
        setCryptocurrencies(symbols);
        setCryptocurrency(symbols[0]);
      })
      .catch(error => console.error('Error fetching Binance data:', error));
  }, []);

  useEffect(() => {
    if (cryptocurrency) {
      fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${cryptocurrency}`)
        .then(response => response.json())
        .then(data => {
          setPrice(parseFloat(data.price));
        })
        .catch(error => console.error('Error fetching price data:', error));
    }
  }, [cryptocurrency]);

  useEffect(() => {
    if (quantity && price) {
      setTotal(quantity * price);
    }
  }, [quantity, price]);

  const handleOrderTypeChange = (e) => setOrderType(e.target.value);

  const handleCryptocurrencyChange = (e) => {
    setCryptocurrency(e.target.value);
    setPrice(0); 
    setQuantity(''); 
    setTotal(0); 
  };

  const handleQuantityChange = (e) => setQuantity(e.target.value);

  const handleSubmit = () => {
    if (quantity && price) {
      const currentDate = new Date().toISOString().split('T')[0];
      const orderTotal = quantity * price;

      if (orderType === 'Buy' && orderTotal <= balance) {
        setBalance(balance - orderTotal);
        setHoldings(prevHoldings => ({
          ...prevHoldings,
          [cryptocurrency]: (prevHoldings[cryptocurrency] || 0) + parseFloat(quantity)
        }));
        setTradeHistory(prevHistory => [
          ...prevHistory,
          { date: currentDate, type: 'Buy', symbol: cryptocurrency, quantity: parseFloat(quantity), price, total: orderTotal }
        ]);
        alert('Order placed successfully');
      } else if (orderType === 'Sell' && quantity <= (holdings[cryptocurrency] || 0)) {
        setBalance(balance + orderTotal);
        setHoldings(prevHoldings => ({
          ...prevHoldings,
          [cryptocurrency]: (prevHoldings[cryptocurrency] || 0) - parseFloat(quantity)
        }));
        setTradeHistory(prevHistory => [
          ...prevHistory,
          { date: currentDate, type: 'Sell', symbol: cryptocurrency, quantity: parseFloat(quantity), price, total: orderTotal }
        ]);
        alert('Order placed successfully');
      } else {
        alert('Insufficient balance or holdings');
        return;
      }

      setQuantity(''); 
      setTotal(0); 
    }
  };

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
            /> Buy
          </label>
          <label>
            <input 
              type="radio" 
              value="Sell" 
              checked={orderType === 'Sell'} 
              onChange={handleOrderTypeChange}
            /> Sell
          </label>
        </div>
        <div className="amount-select">
            <label htmlFor="cryptocurrency">Select Cryptocurrency:</label>
                <select id="cryptocurrency" name="cryptocurrency" className="select-input" value={cryptocurrency} onChange={handleCryptocurrencyChange}>
                    {cryptocurrencies.map(symbol => (
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
        
        <p className="total">Total: <span className="highlight">${total.toFixed(2)}</span></p>
        <button className="btn lgt-btn confirm-button" onClick={handleSubmit}>
          Submit
        </button>
        <p className="balance">Balance: <span className="highlight">${balance.toFixed(2)}</span></p>
        <p className="holdings">Holdings: <span className="highlight">{holdings[cryptocurrency] || 0} {cryptocurrency.replace('USDT', '')}</span></p>
      </div>
    </Card>
  );
};

export default NewTrade;
