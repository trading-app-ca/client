import React, { useState } from 'react';

const CollapsibleSection = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="collapsible-section">
      <div className="collapsible-header" onClick={toggleOpen}>
        <h3>{title}</h3>
        <button className="lgt-btn btn">
          {isOpen ? 'Collapse' : 'Expand'}
        </button>
      </div>
      <div
        className={`collapsible-content ${isOpen ? 'open' : ''}`}
        style={{
          display: isOpen ? 'block' : 'none',
        }}
      >
        <div className="collapsible-inner">
          {children}
        </div>
      </div>
    </div>
  );
};

export default CollapsibleSection;
