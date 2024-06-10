import React from 'react';

const LeafBatch = ({ date, time, batchId, weight, onClick, isDrying }) => {
  const formattedWeight = weight.toFixed(1);
  return (
    <div
      className={`leaves-batches-rectangle ${
        isDrying ? 'progress-uncompleted3' : 'progress-uncompleted2'
      }`}
    >
      <div className='date-and-time-leaf-batch'>
        <div
          className={`batch-info ${
            isDrying ? 'batch-info-drying' : 'batch-info-not-drying'
          }`}
        >
          {time}
        </div>
        <div
          className={`batch-date-info ${
            isDrying ? 'batch-info-drying' : 'batch-info-not-drying'
          }`}
        >
          {date}
        </div>
      </div>
      <div
        className={`batch-info ${
          isDrying ? 'batch-info-drying' : 'batch-info-not-drying'
        }`}
      >
        {batchId}
      </div>
      <div
        className={`batch-info ${
          isDrying ? 'batch-info-drying' : 'batch-info-not-drying'
        }`}
      >{`${formattedWeight} kg`}</div>
      <div
        className={`batch-edit ${
          isDrying ? 'batch-info-drying' : 'batch-edit-not-drying'
        }`}
        onClick={isDrying ? undefined : onClick}
      >
        EDIT
      </div>
    </div>
  );
};

export default LeafBatch;
