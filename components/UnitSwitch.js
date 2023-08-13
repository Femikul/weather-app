import React, { useState, useEffect } from 'react';

const UnitSwitch = ({ weatherData, isMetric, setIsMetric }) => {
 
  const handleToggleUnit = () => {
    setIsMetric((prevIsMetric) => !prevIsMetric);
  };

  return (
    <div className="float-end me-5 pb-5">
      <ul className="nav container">
        <li className="nav-item me-3">
          <button
             className='btn btn-success btn-sm'
            onClick={handleToggleUnit}
          >
            Imperial System
          </button>
        </li>
        <li className="nav-item">
          <button
         className='btn btn-success btn-sm'
         onClick={handleToggleUnit}
          >
            Metric System
          </button>
        </li>
      </ul>
    </div>
  );
};
export default UnitSwitch;
