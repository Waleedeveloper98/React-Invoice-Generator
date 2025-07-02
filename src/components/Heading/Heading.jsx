import React from 'react';
import './Heading.css'; // Import the CSS file

const Heading = ({ text, icon, itemPlace = "items-start" }) => {
  return (
    <div className={`heading-container ${itemPlace}`}>
      <div className="heading-icon">
        {icon}
      </div>
      <h2 className="heading-text">{text}</h2>
    </div>
  );
};

export default Heading;
