import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import TradeHistory from '../components/trade/TradeHistory';
import NewTrade from '../components/trade/NewTrade';
import TradingChart from '../components/trade/TradingChart';
import { AuthContext } from '../contexts/AuthContext'; // Importing AuthContext to get the user token

const Trade = () => {
  const { auth } = useContext(AuthContext);  // Destructure to get auth state from AuthContext
  const [orderType, setOrderType] = useState('Buy');
  const [cryptocurrency, setCryptocurrency] = useState('BTCUSDT');
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);

  const [balance, setBalance] = useState(0);
  const [holdings, setHoldings] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get('https://crypto-trader-server.onrender.com/api/portfolio', {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        });

        const { user, portfolio, trades } = response.data;
        setBalance(user.balance);
        setHoldings(portfolio.assets);
        setTradeHistory(trades || []);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, [auth.token]);

  useEffect(() => {
    fetch('https://api.binance.com/api/v3/exchangeInfo')
      .then(response => response.json())
      .then(data => {
        const symbols = data.symbols
          .filter(symbol => symbol.quoteAsset === 'USDT')
          .map(symbol => symbol.symbol);
        setCryptocurrencies(symbols);
        setCryptocurrency(symbols[0] || 'BTCUSDT');
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

  const handleSubmit = () => {
    if (quantity && price) {
      const currentDate = new Date().toISOString().split('T')[0];
      const orderTotal = quantity * price;

      const assetSymbol = cryptocurrency.replace('USDT', '');
      const currentHolding = holdings.find(asset => asset.asset === assetSymbol);

      if (orderType === 'Buy' && orderTotal <= balance) {
        setBalance(balance - orderTotal);
        setHoldings(prevHoldings => {
          const updatedHoldings = prevHoldings.map(asset => {
            if (asset.asset === assetSymbol) {
              return {
                ...asset,
                quantity: asset.quantity + parseFloat(quantity)
              };
            }
            return asset;
          });
          return updatedHoldings;
        });
        setTradeHistory(prevHistory => [
          ...prevHistory,
          { date: currentDate, asset: assetSymbol, type: 'buy', quantity: parseFloat(quantity), price, total: orderTotal }
        ]);
      } else if (orderType === 'Sell' && quantity <= (currentHolding ? currentHolding.quantity : 0)) {
        setBalance(balance + orderTotal);
        setHoldings(prevHoldings => {
          const updatedHoldings = prevHoldings.map(asset => {
            if (asset.asset === assetSymbol) {
              return {
                ...asset,
                quantity: asset.quantity - parseFloat(quantity)
              };
            }
            return asset;
          });
          return updatedHoldings;
        });
        setTradeHistory(prevHistory => [
          ...prevHistory,
          { date: currentDate, asset: assetSymbol, type: 'sell', quantity: parseFloat(quantity), price, total: orderTotal }
        ]);
      } else {
        alert('Insufficient balance or holdings');
        return;
      }

      setQuantity(''); 
      setTotal(0);
      alert('Order placed successfully');
    }
  };

  return (
    <div className="trade">
      <TradingChart cryptocurrency={cryptocurrency} />

      <div className="row">
        <NewTrade
          orderType={orderType}
          setOrderType={setOrderType}
          cryptocurrency={cryptocurrency}
          cryptocurrencies={cryptocurrencies}
          setCryptocurrency={setCryptocurrency}
          quantity={quantity}
          setQuantity={setQuantity}
          total={total}
          handleSubmit={handleSubmit}
          balance={balance}
          holdings={holdings}
        />
        <TradeHistory
          trades={tradeHistory}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default Trade;
