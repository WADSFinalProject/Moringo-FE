import React from 'react';
import CountdownTimer from './CountdownTimer.jsx';

const BatchTimer = ({ leaves, hours, minutes, seconds }) => {
  return (
    <div className='batch-timer-rectangle'>
      <span className='batch-timer-title'>
        {leaves ? 'Leaves Production' : 'Powder Production'}
      </span>
      <div className='batch-timer-right'>
        <CountdownTimer hours={hours} minutes={minutes} seconds={seconds} />
      </div>
    </div>
  );
};

export default BatchTimer;
