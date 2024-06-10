import React from 'react';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import ShipmentProgressDotOngoing from '../../../Assets/shipment-progress-dot-ongoing.svg';
import ShipmentProgressDotArrived from '../../../Assets/shipment-progress-dot-arrived.svg';

const UndeliveredBatch = ({
  shipmentId,
  weight,
  shipmentDate,
  packageCount,
  expeditionTeam,
  sender,
  receiver,
  barcode,
  arrived,
  onOpenShipmentDetails,
  testingMove,
}) => {
  return (
    <div className='shipment-container'>
      <div className='shipment-upper-section'>
        <div className='undelivered-batch-id-label-and-value'>
          <div className='shipment-id-label'>Shipment ID</div>
          <div className='undelivered-batch-id-value'>{shipmentId}</div>
        </div>
        <div
          className='shipment-status-upper'
          onClick={arrived ? undefined : () => testingMove(shipmentId)}
        >
          <img
            src={
              arrived ? ShipmentProgressDotArrived : ShipmentProgressDotOngoing
            }
            alt='on the way'
            style={{ width: '3.7vw' }}
          />
          <div>{arrived ? 'Arrived' : 'On The Way'}</div>
        </div>
      </div>
      <div className='shipment-lower-section'>
        <div className='shipment-all-data undelivered-batch-weight'>
          <div>Weight:</div>
          <div style={{ fontWeight: 'bold', marginLeft: '1vw' }}>{`${parseFloat(
            weight
          ).toFixed(1)} Kg`}</div>
        </div>
        <div className='shipment-all-data'>
          <div>Shipment date:</div>
          <div style={{ fontWeight: 'bold', marginLeft: '1vw' }}>
            {dayjs(shipmentDate).format('DD/MM/YYYY')}
          </div>
        </div>
        <div className='shipment-all-data'>
          <div>Package Count</div>
          <div style={{ fontWeight: 'bold', marginLeft: '1vw' }}>
            {packageCount}
          </div>
        </div>
        <div className='shipment-all-data'>
          <div>Expedition Team</div>
          <div style={{ fontWeight: 'bold', marginLeft: '1vw' }}>
            {expeditionTeam}
          </div>
        </div>
        <div>
          <Button
            variant='contained'
            sx={{
              borderRadius: '5vw',
              backgroundColor: 'white',
              width: '50vw',
              color: 'black',
              fontWeight: '600',
              height: '4.6vh',
              marginTop: '2.3vh',
              marginBottom: '3vh',
              fontSize: '4vw',
              boxShadow: '0px 4px 7px rgba(0, 0, 0, 0.6)',
              textTransform: 'none',
            }}
            onClick={() =>
              onOpenShipmentDetails(
                shipmentId,
                weight,
                shipmentDate,
                packageCount,
                expeditionTeam,
                sender,
                receiver,
                barcode
              )
            }
          >
            Shipment Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UndeliveredBatch;
