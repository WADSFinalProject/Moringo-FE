import React, { useState, useEffect } from 'react';
import CentraHeader from '../../Assets/centra-main-header.svg';
import CentraBackArrow from '../../Assets/back-arrow-centra.svg';
import ProfilePictureMini from '../../Assets/modules/ProfilePictureMini.jsx';
import '../styles/CentraPowder.css';
import dayjs from 'dayjs';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import CircularCountdownTimer from './modules/CircularCountdownTimer.jsx';
import DryLeafBatch from './modules/DryLeafBatch.jsx';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import success from '../../Assets/success-icon.svg';
import { useNavigate } from 'react-router-dom';
import { CropLandscapeOutlined } from '@mui/icons-material';

const CentraPowder = () => {
  const [timerFinished, setTimerFinished] = useState(false);
  const [productionStarted, setProductionStarted] = useState(false);
  const [dryLeavesBatches, setDryLeavesBatches] = useState([]);
  const [resetTimer, setResetTimer] = useState(false);
  const [timeFieldShow, setTimeFieldShow] = useState(false);
  const [powderStartedTime, setPowderStartedTime] = useState('');
  const [powderDate, setPowderDate] = useState('');
  const [powderEndTime, setPowderEndTime] = useState('');
  const [powderEndDate, setPowderEndDate] = useState('');
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [requiredSelections, setRequiredSelections] = useState(1);
  const [inputPowderOpen, setInputPowderOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [inputPowderWeight, setInputPowderWeight] = useState('');
  const [inputPowderDateValue, setInputPowderDateValue] = useState(null);
  const [previousBatchCompleted, setPreviousBatchCompleted] = useState(true);
  const [branch, setBranch] = useState('');
  const [inputPowderId, setInputPowderId] = useState('');
  const [hoursLeft, setHoursLeft] = useState(48);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const navigate = useNavigate();

  const handleBatchClick = (batchId) => {
    setSelectedBatches((prevSelected) => {
      if (prevSelected.includes(batchId)) {
        return prevSelected.filter((no) => no !== batchId);
      } else {
        return [...prevSelected, batchId];
      }
    });
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://127.0.0.1:8000/current_user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setBranch(data.branch);
          try {
            const token = localStorage.getItem('token');
            const batchResponse = await fetch(
              `http://127.0.0.1:8000/centra/dried_leaves_batches?centra_name=${data.branch}`,
              {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const batchData = await batchResponse.json();

            if (batchResponse.ok) {
              const transformedBatches = batchData.batches.map((batch) => ({
                date: dayjs(batch.date_dried).format('DD/MM/YYYY'),
                batchId: batch.id,
                weight: batch.weight_dried,
                is_processing: batch.is_processing,
              }));

              console.log(transformedBatches);
              setDryLeavesBatches(transformedBatches);

              let filteredBatches = transformedBatches.filter(
                (entry) => entry.is_processing === 1
              );

              let selectedBatches = filteredBatches.map(
                (entry) => entry.batchId
              );

              if (selectedBatches.length > 3) {
                setRequiredSelections(7);
              } else if (selectedBatches.length > 1) {
                setRequiredSelections(3);
              }

              setSelectedBatches(selectedBatches);
            } else {
              console.error(
                'Failed to fetch batch data:',
                batchResponse.status
              );
              alert('Failed to fetch batch data. Please try again.');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
          }
        } else {
          console.error('Failed to fetch current user:', response.status);
          alert('Failed to fetch current user. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    };
    fetchUserData();
  }, []);

  const handleSelectionChange = (number) => {
    setSelectedBatches([]);
    setRequiredSelections(number);
  };

  const handleTimerFinish = () => {
    console.log('Timer finished!');

    setTimerFinished(true);
    setPowderEndTime(powderStartedTime);
    setPowderEndDate(
      dayjs(powderDate, 'DD/MM/YYYY').add(2, 'day').format('DD/MM/YYYY')
    );
    setDryLeavesBatches(
      dryLeavesBatches.filter(
        (batch) => !selectedBatches.includes(batch.batchId)
      )
    );
    setSelectedBatches([]);
    setProductionStarted(false);
    setPreviousBatchCompleted(false);
  };

  const isDisabled = (batchId) =>
    !previousBatchCompleted ||
    (selectedBatches.length >= requiredSelections &&
      !selectedBatches.includes(batchId));

  const handleStartPowderProduction = async () => {
    const powderStartDate = dayjs().format('DD/MM/YYYY');
    const powderStartTime = new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    console.log(powderStartDate);

    const powderEndDate = dayjs(powderStartDate, 'DD/MM/YYYY')
      .add(2, 'day')
      .format('DD/MM/YYYY');

    const formattedDate = dayjs(powderStartDate, 'DD/MM/YYYY').format(
      'YYYY-MM-DD'
    );

    const formattedEndDate = dayjs(powderEndDate, 'DD/MM/YYYY').format(
      'YYYY-MM-DD'
    );

    // Combine formattedDate and powderStartTime to create a single datetime string
    const datetimeStart = `${formattedDate} ${powderStartTime}`;

    const datetimeEnd = `${formattedEndDate} ${powderStartTime}`;

    const start_machine_schema = {
      last_started: datetimeStart,
      finished_time: datetimeEnd,
    };

    console.log(start_machine_schema);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://127.0.0.1:8000/centra/start_powder_machine/${branch}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(start_machine_schema),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert('Machine has been started');
        try {
          const token = localStorage.getItem('token');
          const updateProcessing = { ids: selectedBatches };
          const response = await fetch(
            `http://127.0.0.1:8000/update_processing`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(updateProcessing),
            }
          );

          const data = await response.json();
          if (response.ok) {
            alert('Processing has been set');
          } else {
            console.error('Failed to set processsing:', response.status);
            alert('Failed to fetch current user. Please try again.');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        }
      } else {
        console.error('Failed to fetch current user:', response.status);
        alert('Failed to fetch current user. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }

    setPowderStartedTime(powderStartTime);
    setPowderDate(powderStartDate);
    setTimeFieldShow(true);
    setResetTimer(false);
    setProductionStarted(true);
  };

  const handleCloseInput = () => {
    setInputPowderOpen(false);
  };

  const handleInputPowder = async () => {
    if (!inputPowderWeight || !inputPowderDateValue) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const inputDate = dayjs(inputPowderDateValue, 'DD/MM/YYYY');
      const formattedInputDate = inputDate.format('YYYY-MM-DD');
      const powderInput = {
        centra_name: branch,
        date_dried: formattedInputDate,
        weight_dried: Number(inputPowderWeight),
      };
      const response = await fetch(
        'http://127.0.0.1:8000/centra/powder_results',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(powderInput),
        }
      );

      if (response.ok) {
        console.log(`Successfuly input powder batch.`);
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(
            `http://127.0.0.1:8000/centra/powder_batch?centra_name=${branch}&production_date=${formattedInputDate}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const data = await response.json();
          if (response.ok) {
            setInputPowderId(data.id);
            try {
              const token = localStorage.getItem('token');
              const updateMachine = {
                centra_name: branch,
                is_processing: 0,
              };
              const response = await fetch(
                `http://127.0.0.1:8000/centra/powder_machine_update_status`,
                {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(updateMachine),
                }
              );
              if (response.ok) {
                console.log(`Successfuly reset machine.`);
                try {
                  const token = localStorage.getItem('token');
                  const deleteBatches = {
                    centra_name: branch,
                  };
                  console.log(JSON.stringify(deleteBatches));
                  const response = await fetch(
                    `http://127.0.0.1:8000/centra/dried_batches`,
                    {
                      method: 'DELETE',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify(deleteBatches),
                    }
                  );
                  if (response.ok) {
                    console.log(
                      `Successfuly deleted all used ${branch} batches.`
                    );
                  } else {
                    console.error(
                      `Failed to deleted all ${branch} batches.`,
                      response.status
                    );
                  }
                } catch (error) {
                  console.error('Error:', error);
                  alert('An error occurred. Please try again.');
                }
              } else {
                console.error(`Failed to reset machine.`, response.status);
              }
            } catch (error) {
              console.error('Error:', error);
              alert('An error occurred. Please try again.');
            }
          } else {
            console.error(`Failed to retrieve batch id.`, response.status);
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        }
      } else {
        console.error(`Failed to input powder batch.`, response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }

    setShowConfirmation(true);
    console.log('Never gonna give you up');
  };

  const handleMoveBack = () => {
    navigate('/centra/homepage');
  };

  const handleCloseConfirmation = () => {
    setInputPowderOpen(false);
    setTimerFinished(false);
    setPowderStartedTime('');
    setPowderDate('');
    setPowderEndTime('');
    setPowderEndDate('');
    setInputPowderWeight('');
    setInputPowderDateValue(null);
    setTimeFieldShow(false);
    setResetTimer(true);
    setShowConfirmation(false);
    setPreviousBatchCompleted(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='container-homepage'>
        <div className='centra-top-section'>
          <img className='centra-main-header' src={CentraHeader} alt='header' />
          <div className='centra-top-row'>
            <img
              src={CentraBackArrow}
              alt='Back'
              className='back-arrow'
              onClick={handleMoveBack}
            />
            <h3 className='leaves-title'>Powder</h3>
            <div className='right-icons'>
              <ProfilePictureMini />
            </div>
          </div>
        </div>
        <h3 className='subtitle-centra'>Dry Leaves Batch</h3>
        <div
          className={`drying-section ${
            timerFinished ? `progress-completed` : `progress-uncompleted2`
          } powder-version`}
        >
          <div className='drying-batch-header'>Active Powder Batch</div>
          <CircularCountdownTimer
            onTimerFinish={handleTimerFinish}
            start={productionStarted}
            reset={resetTimer}
            initialHours={48}
            hoursLeft={hoursLeft}
            minutesLeft={minutesLeft}
            secondsLeft={secondsLeft}
          />
          <div className='drying-batch-footer'>
            <h6 className='batch-field-title'>Batch Started</h6>
            <div
              className={`batch-time-field ${
                timeFieldShow ? 'progress-uncompleted2' : 'batch-grey-bg'
              }`}
            >{`${powderDate}  ${powderStartedTime}`}</div>
            <h6 className='batch-field-title'>Batch Finished</h6>
            <div
              className={`batch-time-field ${
                timerFinished ? 'progress-uncompleted2' : 'batch-grey-bg'
              }`}
            >{`${powderEndDate}  ${powderEndTime}`}</div>
            <Button
              variant='contained'
              disabled={timerFinished ? false : true}
              startIcon={<AddIcon sx={{ marginRight: '3px' }} />}
              onClick={() => {
                setInputPowderOpen(true);
              }}
              sx={{
                borderRadius: '5vw',
                backgroundColor: 'black',
                width: '73vw',
                fontWeight: '600',
                height: '4.6vh',
                marginTop: '2.3vh',
                marginBottom: '3vh',
                fontSize: '4.4vw',
                boxShadow: '0px 4px 7px rgba(0, 0, 0, 0.6)',
                textTransform: 'none',
              }}
            >
              Input Powdering Details
            </Button>
          </div>
        </div>
        <div
          className={`leaves-batches-container ${
            productionStarted ? 'progress-uncompleted2' : 'progress-completed'
          }`}
        >
          <div className='powder-batch-number-button-container'>
            <Button
              sx={{
                backgroundColor: requiredSelections === 1 ? '#ADBB7F' : 'white',
                color: requiredSelections === 1 ? 'white' : 'black',
                borderRadius: '3vw',
                width: '27%',
                marginLeft: '1.5%',
                marginRight: '1.5%',
                whiteSpace: 'nowrap',
                border: 'solid 1px #CCCCCC',
                '&:hover': {
                  backgroundColor:
                    requiredSelections === 1 ? '#ADBB7F' : 'white',
                },
              }}
              onClick={() => handleSelectionChange(1)}
            >
              1 day
            </Button>
            <Button
              sx={{
                backgroundColor: requiredSelections === 3 ? '#ADBB7F' : 'white',
                color: requiredSelections === 3 ? 'white' : 'black',
                borderRadius: '3vw',
                width: '27%',
                marginLeft: '1.5%',
                marginRight: '1.5%',
                border: 'solid 1px #CCCCCC',
                whiteSpace: 'nowrap',
                '&:hover': {
                  backgroundColor:
                    requiredSelections === 3 ? '#ADBB7F' : 'white',
                },
              }}
              onClick={() => handleSelectionChange(3)}
            >
              3 days
            </Button>
            <Button
              sx={{
                backgroundColor: requiredSelections === 7 ? '#ADBB7F' : 'white',
                color: requiredSelections === 7 ? 'white' : 'black',
                borderRadius: '3vw',
                width: '27%',
                marginLeft: '1.5%',
                marginRight: '1.5%',
                border: 'solid 1px #CCCCCC',
                whiteSpace: 'nowrap',
                '&:hover': {
                  backgroundColor:
                    requiredSelections === 7 ? '#ADBB7F' : 'white',
                },
              }}
              onClick={() => handleSelectionChange(7)}
            >
              7 days
            </Button>
          </div>
          <div className='leaves-batches-header centra-version2'>
            <div style={{ textAlign: 'center' }}>Date </div>
            <div style={{ textAlign: 'center' }}>Batch ID</div>
            <div style={{ textAlign: 'center' }}>Weight</div>
          </div>
          <div className='dry-leaf-batch-container'>
            {dryLeavesBatches.map((batch, index) => (
              <DryLeafBatch
                key={`dry-leaf-batch-${index}`}
                date={batch.date}
                batchId={batch.batchId}
                weight={batch.weight}
                isSelected={selectedBatches.includes(batch.batchId)}
                isDisabled={isDisabled(batch.batchId)}
                onClick={() => handleBatchClick(batch.batchId)}
              />
            ))}
          </div>
          <div className='add-batches-notice'>
            Add dry leaf batches to get started!
          </div>
        </div>

        {!productionStarted ? (
          <Button
            variant='contained'
            disabled={!(selectedBatches.length >= requiredSelections)}
            sx={{
              borderRadius: '1.5vw',
              backgroundColor: 'black',
              width: '78vw',
              fontWeight: 'bold',
              height: '4.6vh',
              marginTop: '2.3vh',
              marginBottom: '2.3vh',
              fontSize: '4.5vw',
              boxShadow: '0px 4px 7px rgba(0, 0, 0, 0.6)',
              '&:hover': {
                backgroundColor: 'currentColor',
              },
            }}
            onClick={handleStartPowderProduction}
          >
            START PRODUCTION
          </Button>
        ) : (
          <Button
            variant='contained'
            sx={{
              borderRadius: '1.5vw',
              backgroundColor: '#ADBB7F',
              width: '78vw',
              fontWeight: 'bold',
              height: '4.6vh',
              marginTop: '2.3vh',
              marginBottom: '2.3vh',
              fontSize: '4.5vw',
              boxShadow: '0px 4px 7px rgba(0, 0, 0, 0.6)',
              '&:hover': {
                backgroundColor: '#ADBB7F',
              },
            }}
          >
            PRODUCTION ONGOING
          </Button>
        )}
        <Dialog
          open={inputPowderOpen}
          onClose={handleCloseInput}
          PaperProps={{
            sx: {
              backgroundColor: '#EBEBEB',
              borderRadius: '5vw',
              width: '80vw',
            },
          }}
        >
          <DialogTitle sx={{ textAlign: 'center', fontWeight: '600' }}>
            {!showConfirmation ? 'Input Powdering Details' : null}
            <IconButton
              aria-label='close'
              onClick={handleCloseInput}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent
            sx={
              !showConfirmation
                ? {}
                : {
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                  }
            }
          >
            {!showConfirmation ? (
              <>
                <TextField
                  margin='dense'
                  label='Weight (kg)'
                  type='number'
                  fullWidth
                  value={inputPowderWeight}
                  onChange={(e) => setInputPowderWeight(e.target.value)}
                  sx={{ marginBottom: '16px', backgroundColor: 'white' }}
                />
                <DatePicker
                  margin='dense'
                  fullWidth
                  label='Date'
                  value={inputPowderDateValue}
                  onChange={(newValue) => setInputPowderDateValue(newValue)}
                  sx={{
                    marginTop: '1vh',
                    width: '100%',
                    '& .MuiInputBase-root': {
                      backgroundColor: 'white',
                    },
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '5px',
                    },
                  }}
                />
              </>
            ) : (
              <>
                <img src={success} />
                <h4 className='confirmation-text'>Powdering Completed!</h4>
                <div className='confirmation-info'>
                  <div className='batch-overview-drying'>Batch Overview</div>
                  <div className='confirmation-info-details confirmation-info-detail-full'>
                    <div>ID: </div>
                    <div style={{ fontWeight: 'bold' }}>{inputPowderId}</div>
                  </div>
                  <div className='confirmation-info-details'>
                    <div className='confirmation-info-detail-full'>
                      <div>Weight: </div>
                      <div style={{ fontWeight: 'bold' }}>{`${parseFloat(
                        inputPowderWeight
                      ).toFixed(1)} Kg`}</div>
                    </div>
                    <div className='confirmation-info-detail-full'>
                      <div>Exp Date: </div>
                      <div style={{ fontWeight: 'bold' }}>
                        {dayjs(inputPowderDateValue).format('DD/MM/YYYY')}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>

          <DialogActions
            sx={{
              justifyContent: 'center',
              marginBottom: '1.5vh',
              marginTop: showConfirmation ? 0 : '1.5vh',
            }}
          >
            <Button
              onClick={
                showConfirmation ? handleCloseConfirmation : handleInputPowder
              }
              color='success'
              variant='contained'
              sx={{ textTransform: 'none' }}
            >
              Confirm
            </Button>
            {showConfirmation ? undefined : (
              <Button
                onClick={handleCloseInput}
                color='error'
                variant='contained'
                sx={{ textTransform: 'none' }}
              >
                Cancel
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
};

export default CentraPowder;
