import React from 'react';

const DryLeafBatch = ({
  date,
  time,
  batchId,
  weight,
  isSelected,
  isDisabled,
  onClick,
}) => {
  const formattedWeight = weight.toFixed(1);

  const batchClass = isDisabled
    ? 'batch-disabled'
    : isSelected
    ? 'batch-selected'
    : 'batch-default';

  return (
    <div
      className={`leaves-batches-rectangle ${batchClass}`}
      onClick={isDisabled ? undefined : onClick}
    >
      <div className='date-and-time-leaf-batch'>
        <div className='batch-info'>{time}</div>
        <div className='batch-date-info'>{date}</div>
      </div>
      <div className='batch-info'>{batchId}</div>
      <div className='batch-info'>{`${formattedWeight} kg`}</div>
    </div>
  );
};

export default DryLeafBatch;
