import React from 'react';
import CentraLogo from '../../Assets/centra-logo.jsx';
import HarborLogo from '../../Assets/harbor-logo.jsx';
import XyzLogo from '../../Assets/xyz-logo.jsx';
import '../styles/UserSelectPage.css';
import { useState } from 'react';
import Button from './modules/button.jsx';
import success from '../../Assets/success-icon.svg';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const UserSelectPage = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [centraFill, setCentraFill] = useState('white');
  const [xyzFill, setXyzFill] = useState('black');
  const [harborFill, setHarborFill] = useState('black');
  const [centraStroke, setCentraStroke] = useState('black');
  const [xyzStroke, setXyzStroke] = useState('black');
  const [harborStroke, setHarborStroke] = useState('black');
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [error, setError] = useState(false);
  const location = useLocation();
  const { fullName, email, username, password, selectedCountry, phoneNumber } =
    location.state;
  const [firstName, ...lastNameParts] = fullName.split(' ');
  const lastName = lastNameParts.join(' ');

  const handleButtonClick = (button) => {
    setActiveButton(button);
    // Reset fill and stroke colors for all buttons
    setCentraFill(button === 'centra' ? 'black' : 'white');
    setCentraStroke(button === 'centra' ? 'white' : 'black');
    setHarborFill(button === 'harbor' ? 'white' : 'black');
    setHarborStroke(button === 'harbor' ? 'white' : 'black');
    setXyzFill(button === 'xyz' ? 'white' : 'black');
    setXyzStroke(button === 'xyz' ? 'white' : 'black');
  };

  const handleConfirmation = async () => {
    if ((activeButton === 'xyz') | (activeButton === 'harbor')) {
      const userRole = activeButton === 'xyz' ? 'XYZ' : 'Harbor';
      const countryCode = `+${String(selectedCountry.phone)}`;
      const phoneNumberWithoutCountryCode = phoneNumber.startsWith(countryCode)
        ? phoneNumber.slice(countryCode.length)
        : phoneNumber;

      const userData = {
        username: String(username),
        email: email,
        password: String(password),
        user_role: userRole,
        country_code: countryCode,
        phone_number: String(phoneNumberWithoutCountryCode),
        first_name: String(firstName),
        last_name: String(lastName),
      };

      try {
        const response = await fetch('http://127.0.0.1:8000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });

        const result = await response.json();
        if (response.ok) {
          alert(result.message);
        } else {
          // Handle error
          alert(result.detail || 'Error signing up');
          return;
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
        return;
      }

      handleOpenDialog();
    } else {
      handleOpenDialog2();
    }
  };

  const handleBranchChange = (event) => {
    setSelectedBranch(event.target.value);
    if (error) {
      setError(false);
    }
  };

  const handleDialogConfirm2 = async () => {
    if (!selectedBranch) {
      setError(true);
      return;
    }

    const userRole = 'Centra';
    const countryCode = `+${String(selectedCountry.phone)}`;
    const phoneNumberWithoutCountryCode = phoneNumber.startsWith(countryCode)
      ? phoneNumber.slice(countryCode.length)
      : phoneNumber;

    const userData = {
      username: String(username),
      email: email,
      password: String(password),
      user_role: userRole,
      country_code: countryCode,
      phone_number: String(phoneNumberWithoutCountryCode),
      first_name: String(firstName),
      last_name: String(lastName),
      branch: selectedBranch,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      if (response.ok) {
        alert(result.message);
      } else {
        // Handle error
        alert(result.detail || 'Error signing up');
        return;
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
      return;
    }

    // Close the dialog if necessary
    handleCloseDialog2();
    handleOpenDialog();
  };
  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleOpenDialog2 = () => {
    setOpen2(true);
  };

  const navigate = useNavigate();

  const handleDialogConfirm = () => {
    navigate('/title');
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleCloseDialog2 = () => {
    setOpen2(false);
  };

  const branches = [
    'Banda Aceh',
    'Bandar Lampung',
    'Bandung',
    'Banjarmasin',
    'Balikpapan',
    'Bukittinggi',
    'Bogor',
    'Bekasi',
    'Depok',
    'Denpasar',
    'Padang Panjang',
    'Padang',
    'Palembang',
    'Pasuruan',
    'Pekanbaru',
    'Mataram',
    'Pontianak',
    'Probolinggo',
    'Purwokerto',
    'Makassar',
    'Magelang',
    'Malang',
    'Medan',
    'Cilegon',
    'Cimahi',
    'Jakarta',
    'Jambi',
    'Samarinda',
    'Semarang',
    'Serang',
    'Sukabumi',
    'Surabaya',
    'Tangerang',
    'Tarakan',
    'Tegal',
    'Yogyakarta',
  ];

  return (
    <>
      <div className='container-select'>
        <div className='mobile-login-title'>User Selection</div>
        <div className='mobile-login-subtitle'>
          Please select appropriate user below
        </div>
        <button
          className={`button ${activeButton === 'centra' ? 'active' : ''}`}
          onClick={() => handleButtonClick('centra')}
        >
          <CentraLogo fill={centraFill} stroke={centraStroke} />
          <h3 className='selection-text'>Centra</h3>
        </button>
        <button
          className={`button ${activeButton === 'harbor' ? 'active' : ''}`}
          onClick={() => handleButtonClick('harbor')}
        >
          <HarborLogo fill={harborFill} stroke={harborStroke} />
          <h3 className='selection-text'>Harbor</h3>
        </button>
        <button
          className={`button last ${activeButton === 'xyz' ? 'active' : ''}`}
          onClick={() => handleButtonClick('xyz')}
        >
          <XyzLogo fill={xyzFill} stroke={xyzStroke} />
          <h3 className='selection-text'>XYZ</h3>
        </button>
        <Button
          text='Confirm'
          color='black'
          onClick={handleConfirmation}
          width='57vw'
        />
        <Dialog open={open} PaperProps={{ sx: { borderRadius: '18px' } }}>
          <DialogTitle>
            <button className='close-button' onClick={handleCloseDialog}>
              X
            </button>
          </DialogTitle>
          <DialogContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            <img src={success} />
            <h4 className='success-text'>SIGN UP SUCCESS!</h4>
            <div className='wait-text'>
              Please wait for admin to approve your registration request and
              information
            </div>
            <Button
              text='Confirm'
              color='green'
              onClick={handleDialogConfirm}
              width='40vw'
              height='35px'
            ></Button>
          </DialogContent>
        </Dialog>
        <Dialog open={open2} PaperProps={{ sx: { borderRadius: '18px' } }}>
          <DialogTitle>
            <button className='close-button' onClick={handleCloseDialog2}>
              X
            </button>
          </DialogTitle>
          <DialogContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              width: '65vw',
            }}
          >
            <div className='selection-text'>Select branch</div>
            <TextField
              id='outlined-select-currency'
              select
              value={selectedBranch}
              onChange={handleBranchChange}
              error={error}
              label='Select'
              helperText={error ? 'Please select centra branch' : ''}
              sx={{ marginTop: '2vh', marginBottom: '1vh', width: '50vw' }}
            >
              {branches.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <Button
              text='Confirm'
              color='green'
              onClick={handleDialogConfirm2}
              width='40vw'
              height='35px'
            ></Button>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default UserSelectPage;
