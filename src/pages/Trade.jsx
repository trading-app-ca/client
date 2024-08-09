import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TradeHistory from '../components/trade/TradeHistory';
import NewTrade from '../components/trade/NewTrade';
import TradingChart from '../components/trade/TradingChart';
import { fetchUserData } from '../redux/dashboardSlice';
import { fetchTradeHistory } from '../redux/tradeSlice';
import { fetchPortfolioData } from '../redux/portfolioSlice';
import ApiManager from '../apimanager/ApiManager';

const Trade = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.dashboard);
  const { trades } = useSelector((state) => state.trade);
  const { portfolioData } = useSelector((state) => state.portfolio);

  const [orderType, setOrderType] = useState('Buy');
  const [cryptocurrency, setCryptocurrency] = useState('BTCUSDT');
  const [cryptocurrencies, setCryptocurrencies] = useState([]);
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState(0);
  const [total, setTotal] = useState(0);
  const [balance, setBalance] = useState(0);
  const [assets, setAssets] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(fetchUserData());
    dispatch(fetchPortfolioData());
    dispatch(fetchTradeHistory());
  }, [dispatch]);

  useEffect(() => {
    setBalance(userData?.balance || 0);
    setAssets(portfolioData?.assets || []);
    setTradeHistory(trades || []);
  }, [userData, portfolioData, trades]);

  useEffect(() => {
    const fetchMarketInfo = async () => {
      try {
        const response = await fetch('https://api.binance.com/api/v3/exchangeInfo');
        const data = await response.json();
        const symbols = data.symbols.filter(symbol => symbol.quoteAsset === 'USDT').map(symbol => symbol.symbol);
        setCryptocurrencies(symbols);
        setCryptocurrency(symbols[0] || 'BTCUSDT');
      } catch (error) {
        console.error('Error fetching Binance data:', error);
      }
    };

    fetchMarketInfo();
  }, []);

  useEffect(() => {
    const fetchPrice = async () => {
      if (cryptocurrency) {
        try {
          const response = await ApiManager.getMarketData(cryptocurrency);
          setPrice(parseFloat(response.price));
        } catch (error) {
          console.error('Error fetching price data:', error);
        }
      }
    };

    fetchPrice();
  }, [cryptocurrency]);

  useEffect(() => {
    setTotal(quantity * price);
  }, [quantity, price]);

  const updatePortfolioAssets = (currentAssets, tradeData) => {
    const { type, assetName, quantity } = tradeData;
    const assetIndex = currentAssets.findIndex(asset => asset.asset === assetName);

    if (type === 'buy') {
      if (assetIndex !== -1) {
        currentAssets[assetIndex].quantity += quantity;
      } else {
        currentAssets.push({ asset: assetName, quantity });
      }
    } else if (type === 'sell') {
      if (assetIndex !== -1) {
        currentAssets[assetIndex].quantity -= quantity;
        if (currentAssets[assetIndex].quantity <= 0) {
          currentAssets.splice(assetIndex, 1); 
        }
      }
    }

    return [...currentAssets];
  };

  const handleSubmit = async () => {
    if (quantity && price) {
      const assetName = cryptocurrency.replace('USDT', '');

      const tradeData = {
        type: orderType.toLowerCase(),
        assetName,
        quantity: parseFloat(quantity),
        price: parseFloat(price),
      };

      try {
        const response = await ApiManager.createTrade(tradeData);
        setBalance(response.newBalance);
        setAssets(updatePortfolioAssets(assets, tradeData));
        setTradeHistory([...tradeHistory, response.trade]);
        setQuantity('');
        setTotal(0);
        alert('Order placed successfully');
      } catch (error) {
        console.error('Error placing trade:', error);
        alert('Failed to place trade.');
      }
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
          assets={assets}
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
