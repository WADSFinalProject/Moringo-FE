import Header2 from '../../Assets/centra-main-header.svg';
import arrow from '../../Assets/Arrow.svg';
import bell from '../../Assets/BellTemp.svg';
import '../styles/HarborDetailPage.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import success from '../../Assets/success.svg';
import { Dialog, DialogContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProfilePictureMini from '../../Assets/modules/ProfilePictureMini.jsx';
import dayjs from 'dayjs';

const DetailPage = () => {
  const [shipmentId, setShipmentId] = useState('');
  const [receiverDetails, setReceiverDetails] = useState('');
  const [senderDetails, setSenderDetails] = useState('');
  const [packageCount, setPackageCount] = useState('');
  const [expedition, setExpedition] = useState('');
  const [dateShipped, setDateShipped] = useState('');
  const [packageWeight, setPackageWeight] = useState('');
  const [confirmationDetailOpen, setConfirmationDetailOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    /* read from database */
    /* separate results from query to each attribute */
    /* assign each attribute */
    const getShipmentDetails = async () => {
      try {
        const id = localStorage.getItem('id');
        const response = await fetch(
          `https://moringo-be-sand.vercel.app/shipments/${id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        const data = await response.json();
        if (response.ok) {
          setShipmentId(String(data.result.id));
          setReceiverDetails(data.result.receiver_address);
          setSenderDetails(data.result.sender_address);
          setPackageWeight(data.result.weight);
          setPackageCount(data.result.package_count);
          setExpedition(data.result.expedition);
          setDateShipped(dayjs(data.result.date_shipped).format('DD/MM/YYYY'));
        } else {
          console.error('Failed to fetch current user:', response.status);
          alert('Failed to fetch current user. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    };
    getShipmentDetails();
  }, []);

  const handleCloseConfirmationDetail = async () => {
    try {
      const response = await fetch(
        `https://moringo-be-sand.vercel.app/shipments/${shipmentId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert('Shipment has been set to arrived');
      } else {
        console.error('Failed to set shipment to arrived:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
    setConfirmationDetailOpen(false);
    navigate('/harbor/homepage');
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
          <h3 className='harbor-other-title-extra'>Package Detail</h3>
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
      <div className='detail-page-textfields-container'>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '90%',
          }}
        >
          <TextField
            id='package-id'
            label='Package ID'
            variant='outlined'
            value={shipmentId}
            disabled
            sx={{ width: '100%', marginBottom: '2vh', marginTop: '2vh' }}
          />
          <TextField
            id='package-weight'
            label='Package Weight'
            variant='outlined'
            value={packageWeight}
            disabled
            sx={{ width: '100%', marginBottom: '2vh', marginTop: '2vh' }}
          />
          <TextField
            id='package-count'
            label='Package Count'
            variant='outlined'
            value={packageCount}
            disabled
            sx={{ width: '100%', marginBottom: '2vh', marginTop: '2vh' }}
          />
          <TextField
            id='sender-details'
            label='Sender Details'
            variant='outlined'
            value={senderDetails}
            disabled
            sx={{ width: '100%', marginBottom: '2vh', marginTop: '2vh' }}
          />
          <TextField
            id='receiver-details'
            label='Receiver Details'
            variant='outlined'
            value={receiverDetails}
            disabled
            sx={{ width: '100%', marginBottom: '2vh', marginTop: '2vh' }}
          />
          <TextField
            id='expedition'
            label='Expedition'
            variant='outlined'
            value={expedition}
            disabled
            sx={{ width: '100%', marginBottom: '2vh', marginTop: '2vh' }}
          />
          <TextField
            id='date-shipped'
            label='Date shipped'
            variant='outlined'
            value={dateShipped}
            disabled
            sx={{ width: '100%', marginBottom: '2vh', marginTop: '2vh' }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            width: '80%',
          }}
        >
          <Button
            variant='contained'
            style={{
              width: '100%',
              height: '50px',
              color: 'white',
              borderRadius: '7.5vw',
              background: 'black',
              '&:hover': {
                backgroundColor: 'black',
              },
            }}
            onClick={() => {
              setConfirmationDetailOpen(true);
            }}
          >
            Send Notification
          </Button>
        </div>
      </div>
      <Dialog
        open={confirmationDetailOpen}
        onClose={handleCloseConfirmationDetail}
        PaperProps={{
          sx: {
            backgroundColor: '#EBEBEB',
            borderRadius: '2vw',
            width: '80vw',
          },
        }}
      >
        <DialogContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <img
            src={success}
            alt='success'
            className='success-img-confirmation'
          />
          <h3 className='success-text-confirmation'>Notification Sent!</h3>
          <Button
            variant='contained'
            style={{
              width: '40%',
              height: '4vh',
              marginTop: '3vh',
              marginBottom: '2vh',
              color: 'white',
              borderRadius: '7.5vw',
              background: '#2C3F31',
              '&:hover': {
                backgroundColor: '#2C3F31',
              },
            }}
            onClick={handleCloseConfirmationDetail}
          >
            Confirm
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DetailPage;
