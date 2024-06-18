import React from 'react';
import { Button } from '@mui/material';
import rightArrow from '../../../Assets/right-arrow.svg';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';

const UndeliveredBatch = ({
  productionDate,
  batchId,
  weight,
  onOpenDeliveryDetails,
}) => {
  return (
    <div className='undelivered-batch-container'>
      <div className='undelivered-batch-upper-section'>
        <div className='undelivered-batch-id-label-and-value'>
          <div className='undelivered-batch-id-label'>Powder Batch ID</div>
          <div className='undelivered-batch-id-value'>{batchId}</div>
        </div>

        <div>
          <img src={rightArrow} alt='next' />
        </div>
      </div>
      <div className='undelivered-batch-lower-section'>
        <div className='undelivered-batch-weight-and-date undelivered-batch-weight'>
          <div>Weight:</div>
          <div style={{ fontWeight: 'bold', marginLeft: '1vw' }}>{`${parseFloat(
            weight
          ).toFixed(1)} Kg`}</div>
        </div>
        <div className='undelivered-batch-weight-and-date'>
          <div>Production date:</div>
          <div style={{ fontWeight: 'bold', marginLeft: '1vw' }}>
            {dayjs(productionDate).format('DD/MM/YYYY')}
          </div>
        </div>
        <div>
          <Button
            variant='contained'
            startIcon={<AddIcon sx={{ marginRight: '3px' }} />}
            sx={{
              borderRadius: '5vw',
              backgroundColor: 'black',
              width: '50vw',
              fontWeight: '600',
              height: '4.6vh',
              marginTop: '2.3vh',
              marginBottom: '3vh',
              fontSize: '3.5vw',
              boxShadow: '0px 4px 7px rgba(0, 0, 0, 0.6)',
              textTransform: 'none',
            }}
            onClick={() => onOpenDeliveryDetails(batchId, weight)}
          >
            Delivery Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UndeliveredBatch;
