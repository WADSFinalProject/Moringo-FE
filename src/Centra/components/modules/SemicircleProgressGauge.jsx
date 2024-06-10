import React from 'react';

const SemiCircleProgressGauge = ({
  currentWeight,
  backgroundGaugeColor,
  maxWeight = 30,
}) => {
  const percentage = (currentWeight / maxWeight) * 100;
  const displayWeight = currentWeight.toFixed(1);
  const displayMaxWeight = maxWeight.toFixed(1);

  // Calculate the end coordinates of the arc
  const radius = 40;
  const endX = 50 + radius * Math.cos(Math.PI * (1 - percentage / 100));
  const endY = 50 - radius * Math.sin(Math.PI * (1 - percentage / 100));

  return (
    <div className={`semi-circle-gauge-container ${backgroundGaugeColor}`}>
      <svg viewBox='0 0 100 50' className='semi-circle-gauge'>
        <defs>
          <linearGradient id='gradient' x1='0%' y1='0%' x2='100%' y2='0%'>
            <stop
              offset='0%'
              style={{ stopColor: '#1C2916', stopOpacity: 1 }}
            />
            <stop
              offset='100%'
              style={{ stopColor: '#9FAF75', stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path className='background-arc' d='M 10,50 A 40,40 0 0,1 90,50' />
        <path
          className='foreground-arc'
          d={`M 10,50 A 40,40 0 0,1 ${endX},${endY}`}
          style={{
            stroke: 'url(#gradient)',
            strokeWidth: 10,
          }}
        />
      </svg>
      <div className='gauge-info'>
        <div className='gauge-percentage'>{percentage.toFixed(1)}%</div>
        <div className='gauge-weight'>
          {displayWeight}kg / {displayMaxWeight}kg
        </div>
        <div className='total-weight-label'>Total Weight</div>
      </div>
      <div className='gauge-labels'>
        <span>0kg</span>
        <span>30kg</span>
      </div>
    </div>
  );
};

export default SemiCircleProgressGauge;
