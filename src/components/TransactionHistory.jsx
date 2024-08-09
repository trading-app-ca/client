import React, { useState } from 'react';
import Card from '../components/common/Card';

const TransactionHistory = ({ transactions, currentPage, itemsPerPage, setCurrentPage }) => {
  const [sortOrder, setSortOrder] = useState('newest');
  const [filterType, setFilterType] = useState('all');
  const [itemsPerPageOption, setItemsPerPageOption] = useState(itemsPerPage);

  const parseDate = (dateStr) => new Date(dateStr); // Use the actual date string directly

  // Error handling: Display a message if transactions data is empty
  if (!transactions || transactions.length === 0) {
    return <Card title="Transaction History"><p>No transaction history to display.</p></Card>;
  }

  const filteredTransactions = transactions.filter(transaction =>
    filterType === 'all' ? true : transaction.type.toLowerCase() === filterType
  );

  if (filteredTransactions.length === 0) {
    return <Card title="Transaction History"><p>No transactions match the selected filter.</p></Card>;
  }

  const sortedTransactions = filteredTransactions.sort((a, b) => 
    sortOrder === 'newest' ? parseDate(b.date) - parseDate(a.date) : parseDate(a.date) - parseDate(b.date)
  );

  const handleItemsPerPageChange = (e) => {
    const value = e.target.value === 'all' ? sortedTransactions.length : parseInt(e.target.value);
    setItemsPerPageOption(value);
    setCurrentPage(1);
  };

  const currentTransactions = sortedTransactions.slice((currentPage - 1) * itemsPerPageOption, currentPage * itemsPerPageOption);

  return (
    <Card title="Transaction History">
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

      <ul className="trade-history-list">
        {currentTransactions.map((transaction, index) => (
          <li key={index} className="trade-history-item">
            {new Date(transaction.date).toLocaleDateString('en-AU')}: {transaction.type} ${transaction.amount.toFixed(2)}
          </li>
        ))}
      </ul>

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
