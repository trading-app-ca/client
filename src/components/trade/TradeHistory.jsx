import React, { useState, useEffect } from 'react';
import Card from '../common/Card';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTradeHistory } from '../../redux/tradeSlice';

const TradeHistory = ({ currentPage, itemsPerPage, setCurrentPage }) => {
  const dispatch = useDispatch();
  const trades = useSelector(state => state.trade.trades);
  const [sortOrder, setSortOrder] = useState('newest');
  const [filterType, setFilterType] = useState('all');
  const [itemsPerPageOption, setItemsPerPageOption] = useState(itemsPerPage);

  useEffect(() => {
    dispatch(fetchTradeHistory());
  }, [dispatch]);

  const parseDate = (dateStr) => new Date(dateStr);

  // Display a message if there are no trades
  if (!trades || trades.length === 0) {
    return <Card title="Trade History"><p>No trade history to display.</p></Card>;
  }

  // Filter trades based on selected filterType
  const filteredTrades = trades.filter(trade =>
    filterType === 'all' ? true : trade.type.toLowerCase() === filterType
  );

  // Sort trades based on selected sortOrder
  const sortedTrades = filteredTrades.sort((a, b) => 
    sortOrder === 'newest' ? parseDate(b.date) - parseDate(a.date) : parseDate(a.date) - parseDate(b.date)
  );

  const handleItemsPerPageChange = (e) => {
    const value = e.target.value === 'all' ? sortedTrades.length : parseInt(e.target.value, 10);
    setItemsPerPageOption(value);
    setCurrentPage(1);
  };
  
  // Get current trades to display based on pagination
  const currentTrades = sortedTrades.slice((currentPage - 1) * itemsPerPageOption, currentPage * itemsPerPageOption);

  return (
    <Card title="Trade History">
      <div className="trade-history-controls">
        <div className="sort-dropdown">
          <label htmlFor="sortOrder">Sort by: </label>
          <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="select-input drk-btn">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div className="filter-dropdown">
          <label htmlFor="filterType">Filter by: </label>
          <select id="filterType" value={filterType} onChange={(e) => setFilterType(e.target.value)} className="select-input drk-btn">
            <option value="all">All</option>
            <option value="buy">Buy</option>
            <option value="sell">Sell</option>
          </select>
        </div>
        <div className="items-per-page-dropdown">
          <label htmlFor="itemsPerPage">Items per page: </label>
          <select id="itemsPerPage" value={itemsPerPageOption} onChange={handleItemsPerPageChange} className="select-input drk-btn">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="all">View All</option>
          </select>
        </div>
      </div>

      <ul className="trade-history-list">
        {currentTrades.map((trade, index) => {
          const tradeDate = trade.date ? new Date(trade.date).toLocaleDateString('en-AU') : 'Unknown date';
          const tradeType = trade.type || 'Unknown type';
          const tradeQuantity = trade.quantity !== undefined ? trade.quantity : 'Unknown quantity';
          const tradePrice = trade.price !== undefined ? trade.price.toFixed(2) : 'Unknown price';

          return (
            <li key={index} className="trade-history-item">
              {tradeDate}: {tradeType} {tradeQuantity} {trade.asset || 'Unknown asset'} at 
              <span className="highlight trade-price"> ${tradePrice}</span>
            </li>
          );
        })}
      </ul>

      <div className="pagination">
        {currentPage > 1 && (
          <button className="btn lgt-btn" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        )}
        {(currentPage * itemsPerPageOption < sortedTrades.length) && (itemsPerPageOption !== sortedTrades.length) && (
          <button className="btn lgt-btn" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        )}
      </div>
    </Card>
  );
};

export default TradeHistory;
