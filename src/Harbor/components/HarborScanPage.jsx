import '../styles/HarborScanPage.css';
import Header2 from '../../Assets/centra-main-header.svg';
import arrow from '../../Assets/Arrow.svg';
import bell from '../../Assets/BellTemp.svg';
import gallery from '../../Assets/gallery.svg';
import flash from '../../Assets/flash.svg';
import QrScanner from 'react-qr-scanner';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePictureMini from '../../Assets/modules/ProfilePictureMini.jsx';
import { Button, TextField } from '@mui/material';

const ScanPage = () => {
  const [data, setData] = useState('No result');
  const [id, setId] = useState('');

  const navigate = useNavigate();

  const handleScan = (result) => {
    if (result) {
      setData(result);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const handleInputtedId = () => {
    localStorage.setItem('id', id);
    navigate('/harbor/detail');
  };

  return (
    <div className='harbor-page-container'>
      <div className='harbor-top-section'>
        <img className='harbor-main-header-extra' src={Header2} alt='header' />
        <div className='harbor-top-row'>
          <img
            className='arrow'
            src={arrow}
            alt='Arrow'
            onClick={() => {
              navigate('/harbor/homepage');
            }}
          />
          <h3 className='harbor-other-title-extra'>Scan Barcode</h3>
          <div className='right-icons'>
            <img
              className='bell'
              src={bell}
              alt='Bell'
              onClick={() => {
                navigate('/harbor/notifications');
              }}
            />
            <ProfilePictureMini />
          </div>
        </div>
      </div>
      <div className='scan-framebox'>
        <div className='scan-message1'>
          Place barcode inside the frame to scan
        </div>
        <div className='scan-picture'>
          <QrScanner
            delay={300}
            onScan={handleScan}
            onError={handleError}
            style={{ width: '95%', height: '95%' }}
          />
        </div>
        <div className='scan-message2'>Scanning Barcode: {data}</div>
        <div className='picture-icons'>
          <img
            src={gallery}
            alt='gallery'
            onClick={() => console.log('gallery')}
          />
          <img src={flash} alt='flash' onClick={() => console.log('flash')} />
        </div>
      </div>
      <div className='area-below-scanning'>
        <TextField
          label='Alternatively, write id here'
          variant='outlined'
          value={id}
          onChange={(e) => {
            setId(e.target.value);
          }}
        />
        <Button
          onClick={handleInputtedId}
          color='success'
          variant='contained'
          sx={{ textTransform: 'none' }}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default ScanPage;
