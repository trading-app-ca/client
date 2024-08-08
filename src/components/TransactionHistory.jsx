import React, { useState } from 'react';
import Card from '../components/common/Card';

const TransactionHistory = ({ transactions, currentPage, itemsPerPage, setCurrentPage }) => {
  const [sortOrder, setSortOrder] = useState('newest');
  const [filterType, setFilterType] = useState('all');
  const [itemsPerPageOption, setItemsPerPageOption] = useState(itemsPerPage);

  const sortedTransactions = transactions
    .filter(transaction => filterType === 'all' ? true : transaction.type.toLowerCase() === filterType)
    .sort((a, b) => 
      sortOrder === 'newest' ? new Date(b.date) - new Date(a.date) : new Date(a.date) - new Date(b.date)
    );

  const handleItemsPerPageChange = (e) => {
    const value = e.target.value === 'all' ? sortedTransactions.length : parseInt(e.target.value);
    setItemsPerPageOption(value);
    setCurrentPage(1);
  };

  const currentTransactions = sortedTransactions.slice((currentPage - 1) * itemsPerPageOption, currentPage * itemsPerPageOption);

  return (
    <Card title="Transactions History">
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
            <option value="deposit">Deposit</option>
            <option value="withdraw">Withdraw</option>
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

      {currentTransactions.length > 0 ? (
        <ul className="trade-history-list">
          {currentTransactions.map((transaction, index) => (
            <li key={index} className="trade-history-item">
              {new Date(transaction.date).toLocaleString()}: {transaction.type} ${transaction.amount.toFixed(2)}
            </li>
          ))}
        </ul>
      ) : (
        <p>No transaction history</p>
      )}

      <div className="pagination">
        {currentPage > 1 && (
          <button className="btn lgt-btn" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
        )}
        {(currentPage * itemsPerPageOption < sortedTransactions.length) && (itemsPerPageOption !== sortedTransactions.length) && (
          <button className="btn lgt-btn" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        )}
      </div>
    </Card>
  );
};

export default TransactionHistory;
