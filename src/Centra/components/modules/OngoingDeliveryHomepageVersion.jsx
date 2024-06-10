import React from 'react';

const OngoingDeliveryHomepageVersion = ({
  shipmentId,
  weight,
  noOfPackages,
}) => {
  const formattedWeight = weight.toFixed(1);
  return (
    <div className='ongoing-delivery-homepage-rectangle'>
      <div className='delivery-info first'>{shipmentId}</div>
      <div className='delivery-info second'>{`${formattedWeight} Kg`}</div>
      <div className='delivery-info third'>{`${noOfPackages} Packages`}</div>
    </div>
  );
};

export default OngoingDeliveryHomepageVersion;
