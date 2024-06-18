import React, { useState, useEffect } from 'react';
import CentraHeader from '../../Assets/centra-main-header.svg';
import CentraBackArrow from '../../Assets/back-arrow-centra.svg';
import ProfilePictureMini from '../../Assets/modules/ProfilePictureMini.jsx';
import '../styles/CentraLeaves.css';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SemiCircleProgressGauge from './modules/SemicircleProgressGauge.jsx';
import LeafBatch from './modules/LeafBatch.jsx';
import dayjs from 'dayjs';
import success from '../../Assets/success-icon.svg';
import CircularCountdownTimer from './modules/CircularCountdownTimer.jsx';
import { useNavigate } from 'react-router-dom';

const CentraLeaves = () => {
  const [currentWeight, setCurrentWeight] = useState(0);
  const [isDisabled, setDisabled] = useState(true);
  const [dateValue, setDateValue] = useState(null);
  const [leavesBatches, setLeavesBatches] = useState([]);
  const [showNotice, setShowNotice] = useState(true);
  const [open, setOpen] = useState(false);
  const [weight, setWeight] = useState('');
  const [bgGaugeColor, setBgGaugeColor] = useState('progress-uncompleted');
  const [editBatchOpen, setEditBatchOpen] = useState(false);
  const [batchToEdit, setBatchToEdit] = useState(null);
  const [editWeight, setEditWeight] = useState('');
  const [editDateValue, setEditDateValue] = useState(null);
  const [timerFinished, setTimerFinished] = useState(false);
  const [productionStarted, setProductionStarted] = useState(false);
  const [dryStartedTime, setDryStartedTime] = useState('');
  const [dryDate, setDryDate] = useState('');
  const [dryEndTime, setDryEndTime] = useState('');
  const [dryEndDate, setDryEndDate] = useState('');
  const [timeFieldShow, setTimeFieldShow] = useState(false);
  const [inputDryOpen, setInputDryOpen] = useState(false);
  const [inputDryWeight, setInputDryWeight] = useState('');
  const [inputDryDateValue, setInputDryDateValue] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [sufficientWeight, setSufficientWeight] = useState(false);
  const [previousBatchCompleted, setPreviousBatchCompleted] = useState(true);
  const [branch, setBranch] = React.useState('');
  const [hoursLeft, setHoursLeft] = useState(24);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [inputDryId, setInputDryId] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (branch) {
          // Fetch machine data
          const machineResponse = await fetch(
            `http://127.0.0.1:8000/centra/drying_machine_remaining_time/${branch}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const machineData = await machineResponse.json();
          console.log('Machine data', machineData);

          if (machineResponse.ok && machineData.is_processing === 1) {
            const remaining_time = machineData.remaining_time;
            const remaining_hours = Math.floor(remaining_time / 3600);
            const remaining_minutes = Math.floor((remaining_time % 3600) / 60);
            const remaining_seconds = remaining_time % 60;
            setHoursLeft(remaining_hours);
            setMinutesLeft(remaining_minutes);
            setSecondsLeft(remaining_seconds);
            const parsedDatetime = dayjs(machineData.last_started);
            const formattedDate = parsedDatetime.format('DD/MM/YYYY');
            const formattedTime = parsedDatetime.format('HH:mm:ss');
            setDryDate(formattedDate);
            setDryStartedTime(formattedTime);
          } else if (machineResponse.ok && machineData.is_processing === 0) {
          } else {
            console.error(
              'Failed to fetch machine data:',
              machineResponse.status
            );
            alert('Failed to fetch machine data. Please try again.');
          }

          // Fetch batch data
          const batchResponse = await fetch(
            `http://127.0.0.1:8000/centra/moringa_batches?centra_name=${branch}`,
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
              date: dayjs(batch.entryDate).format('DD/MM/YYYY'),
              time: new Date(batch.entryTime * 1000)
                .toISOString()
                .substr(11, 8),
              batchId: batch.id,
              weight: batch.weight_received,
            }));
            setLeavesBatches(transformedBatches);
          } else {
            console.error('Failed to fetch batch data:', batchResponse.status);
            alert('Failed to fetch batch data. Please try again.');
          }
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    };

    fetchData();
  }, [branch]);

  useEffect(() => {
    if (hoursLeft !== 24 || minutesLeft !== 0 || secondsLeft !== 0) {
      setProductionStarted(true);
      setResetTimer(false);
      setTimeFieldShow(true);
      setCurrentWeight(0);
      setSufficientWeight(true);
      setShowNotice(false);
      setBgGaugeColor('progress-uncompleted');
      setDisabled(false);
    }
  }, [hoursLeft, minutesLeft, secondsLeft]);

  const updateDatabaseWeight = async () => {
    try {
      const token = localStorage.getItem('token');
      const weightUpdate = {
        centra_name: branch,
        new_weight: Number(currentWeight),
      };
      const response = await fetch(
        'http://127.0.0.1:8000/centra/drying_machine_update_weight',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(weightUpdate),
        }
      );

      if (response.ok) {
        console.log('Weight has been updated');
      } else {
        console.error('Failed to update weight:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    calculateTotalWeight();
  }, [leavesBatches]);

  useEffect(() => {
    if (currentWeight > 0) {
      updateDatabaseWeight();
    }
  }, [currentWeight]);

  const handleAddBatch = async () => {
    if (!weight || !dateValue) {
      alert('Please fill in all fields.');
      return;
    }

    const date = dayjs(dateValue, 'DD/MM/YYYY');
    const formattedDate = date.format('YYYY-MM-DD');

    const newBatchForDatabase = {
      weight_received: Number(weight),
      entryDate: formattedDate,
      centra_name: branch,
    };

    console.log(JSON.stringify(newBatchForDatabase));

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        'http://127.0.0.1:8000/centra/moringa_batches',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(newBatchForDatabase),
        }
      );

      const data = await response.json();
      if (response.ok) {
        window.location.reload();
      } else {
        console.error('Failed to fetch current user:', response.status);
        alert('Failed to fetch current user. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }

    handleClose();
    setWeight('');
    setDateValue(null);
  };

  const calculateTotalWeight = () => {
    let totalWeight = leavesBatches.reduce(
      (acc, batch) => acc + batch.weight,
      0
    );

    if (totalWeight >= 30) {
      totalWeight = 30;
      setDisabled(false);
      setSufficientWeight(true);
      setShowNotice(false);
      setBgGaugeColor('progress-completed');
    }
    setCurrentWeight(totalWeight);
  };

  const handleOpenEdit = (batch) => {
    setBatchToEdit(batch);
    setEditWeight(batch.weight);
    setEditDateValue(dayjs(batch.date, 'DD/MM/YY'));
    setEditBatchOpen(true);
  };

  const handleCloseEdit = () => setEditBatchOpen(false);

  const handleCloseInputDry = () => setInputDryOpen(false);

  const handleCloseConfirmation = () => {
    setInputDryOpen(false);
    setTimerFinished(false);
    setDryStartedTime('');
    setDryDate('');
    setDryEndTime('');
    setDryEndDate('');
    setInputDryWeight('');
    setInputDryDateValue(null);
    setTimeFieldShow(false);
    setResetTimer(true);
    setShowConfirmation(false);
    setPreviousBatchCompleted(true);
    window.location.reload();
  };

  const handleConfirmEdit = async () => {
    if (!editWeight || !editDateValue) {
      alert('Please fill in all fields.');
      return;
    }

    const editDate = dayjs(editDateValue, 'DD/MM/YYYY');
    const formattedEditDate = editDate.format('YYYY-MM-DD');

    const batchEdit = {
      entryDate: formattedEditDate,
      weight_received: Number(editWeight),
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://127.0.0.1:8000/centra/moringa_batches/${batchToEdit.batchId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(batchEdit),
        }
      );

      const data = await response.json();
      if (response.ok) {
        window.location.reload();
      } else {
        alert('Failed to edit batch. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
    setLeavesBatches((prevBatches) =>
      prevBatches.map((batch) =>
        batch.batchId === batchToEdit.batchId
          ? {
              ...batch,
              weight: parseFloat(editWeight),
              date: dayjs(editDateValue).format('DD/MM/YY'),
            }
          : batch
      )
    );
    handleCloseEdit();
  };

  const handleDeleteBatch = () => {
    setLeavesBatches((prevBatches) =>
      prevBatches.filter((batch) => batch.batchId !== batchToEdit.batchId)
    );
    handleCloseEdit();
  };

  const handleTimerFinish = () => {
    console.log('Timer finished!');
    // Says the timer is now done
    setTimerFinished(true);
    // Disblaes the button to start production completely
    setDisabled(true);
    // Consumes all leaf batches, this needs to be changed later to impllement backend stuff to nuke all batches from this centra
    setLeavesBatches([]);
    // Resets 30mg counter
    setSufficientWeight(false);
    // Show "add more batches to continue" notice
    setShowNotice(true);
    // set end time
    setDryEndDate(
      dayjs(dryDate, 'DD/MM/YYYY').add(1, 'day').format('DD/MM/YYYY')
    );
    setDryEndTime(dryStartedTime);
    // No longer producing since it's done
    setProductionStarted(false);
  };

  const handleStartProduction = async () => {
    const dryStartDate = dayjs().format('DD/MM/YYYY');
    const dryStartTime = new Date().toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const dryEndDate = dayjs(dryStartDate, 'DD/MM/YYYY')
      .add(1, 'day')
      .format('DD/MM/YYYY');

    const formattedDate = dayjs(dryStartDate, 'DD/MM/YYYY').format(
      'YYYY-MM-DD'
    );

    const formattedEndDate = dayjs(dryEndDate, 'DD/MM/YYYY').format(
      'YYYY-MM-DD'
    );

    // Combine formattedDate and dryStartTime to create a single datetime string
    const datetimeStart = `${formattedDate} ${dryStartTime}`;

    const datetimeEnd = `${formattedEndDate} ${dryStartTime}`;

    const start_machine_schema = {
      last_started: datetimeStart,
      finished_time: datetimeEnd,
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://127.0.0.1:8000/centra/start_machine/${branch}`,
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
      } else {
        console.error('Failed to fetch current user:', response.status);
        alert('Failed to fetch current user. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }

    setProductionStarted(true);
    setResetTimer(false);
    setTimeFieldShow(true);
    setDryStartedTime(dryStartTime);
    setDryDate(dryStartDate);
    setCurrentWeight(0);
    setBgGaugeColor('progress-uncompleted');
  };

  const handleInputDry = async () => {
    if (!inputDryWeight || !inputDryDateValue) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const inputDate = dayjs(inputDryDateValue, 'DD/MM/YYYY');
      const formattedInputDate = inputDate.format('YYYY-MM-DD');
      const dryInput = {
        centra_name: branch,
        date_dried: formattedInputDate,
        weight_dried: Number(inputDryWeight),
      };
      const response = await fetch(
        'http://127.0.0.1:8000/centra/drying_results',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(dryInput),
        }
      );

      if (response.ok) {
        console.log('Dry batch has been inserted.');
        try {
          const token = localStorage.getItem('token');
          const response = await fetch(
            `http://127.0.0.1:8000/centra/dried_leaves_batch?centra_name=${branch}&production_date=${formattedInputDate}`,
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
            setInputDryId(data.id);
            try {
              const token = localStorage.getItem('token');
              const updateMachine = {
                centra_name: branch,
                new_weight: 0,
                is_processing: 0,
              };
              const response = await fetch(
                `http://127.0.0.1:8000/centra/drying_machine_update_weight`,
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
                console.log(
                  'Successfuly reset weight and turn off processing.'
                );
                try {
                  const token = localStorage.getItem('token');
                  const deleteBatches = {
                    centra_name: branch,
                  };
                  console.log(JSON.stringify(deleteBatches));
                  const response = await fetch(
                    `http://127.0.0.1:8000/centra/moringa_batches/all`,
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
                    console.log(`Successfuly deleted all ${branch} batches.`);
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
                console.error(
                  'Failed to reset weight and turn off processing',
                  response.status
                );
              }
            } catch (error) {
              console.error('Error:', error);
              alert('An error occurred. Please try again.');
            }
          } else {
            console.error('Failed to fetch batch id:', response.status);
          }
        } catch (error) {
          console.error('Error:', error);
          alert('An error occurred. Please try again.');
        }
      } else {
        console.error('Failed to input dry batch:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }

    setShowConfirmation(true);
  };

  const handleMoveBack = () => {
    navigate('/centra/homepage');
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
            <h3 className='leaves-title'>Leaves</h3>
            <div className='right-icons'>
              <ProfilePictureMini />
            </div>
          </div>
        </div>
        <h3 className='subtitle-centra'>Leaves Batches</h3>
        <Button
          variant='contained'
          disabled={
            (sufficientWeight && !showNotice) || !previousBatchCompleted
          }
          startIcon={<AddIcon sx={{ marginRight: '16px' }} />}
          sx={{
            borderRadius: '5vw',
            backgroundColor: 'black',
            width: '78vw',
            fontWeight: 'bold',
            textTransform: 'none',
            height: '4.6vh',
            marginTop: '2.3vh',
            fontSize: '4vw',
          }}
          onClick={handleOpen}
        >
          Add
        </Button>
        <SemiCircleProgressGauge
          backgroundGaugeColor={bgGaugeColor}
          currentWeight={currentWeight}
        />
        <div
          className={`leaves-batches-container ${
            productionStarted ? 'progress-uncompleted2' : 'progress-completed'
          }`}
        >
          <div className='leaves-batches-header'>
            <div style={{ textAlign: 'center' }}>Date </div>
            <div style={{ textAlign: 'center' }}>Batch ID</div>
            <div style={{ textAlign: 'center' }}>Weight</div>
            <div className='color-change'>Edit</div>
          </div>
          {leavesBatches.map((batch, index) => (
            <LeafBatch
              key={`leaf-batch-${index}`}
              date={batch.date}
              time={batch.time}
              batchId={batch.batchId}
              weight={batch.weight}
              onClick={() => handleOpenEdit(batch)}
              isDrying={productionStarted}
            />
          ))}
          {showNotice && (
            <div className='add-batches-notice'>
              Add leaf batches to get started!
            </div>
          )}
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              backgroundColor: '#EBEBEB',
              borderRadius: '5vw',
            },
          }}
        >
          <DialogTitle sx={{ textAlign: 'center' }}>
            Add Leaves Batch
            <IconButton
              aria-label='close'
              onClick={handleClose}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <TextField
              margin='dense'
              label='Weight (kg)'
              type='number'
              fullWidth
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              sx={{
                marginBottom: '16px',
                backgroundColor: 'white',
              }}
            />

            <DatePicker
              margin='dense'
              fullWidth
              label='Date'
              value={dateValue}
              onChange={(newValue) => setDateValue(newValue)}
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
          </DialogContent>

          <DialogActions
            sx={{ justifyContent: 'center', marginBottom: '1.5vh' }}
          >
            <Button
              onClick={handleAddBatch}
              color='success'
              variant='contained'
            >
              Confirm
            </Button>
            <Button onClick={handleClose} color='error' variant='contained'>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={editBatchOpen}
          onClose={handleCloseEdit}
          PaperProps={{
            sx: {
              backgroundColor: '#EBEBEB',
              borderRadius: '5vw',
            },
          }}
        >
          <DialogTitle sx={{ textAlign: 'center' }}>
            {batchToEdit?.batchId}
            <IconButton
              aria-label='close'
              onClick={handleCloseEdit}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <TextField
              margin='dense'
              label='Weight (kg)'
              type='number'
              fullWidth
              value={editWeight}
              onChange={(e) => setEditWeight(e.target.value)}
              sx={{ marginBottom: '16px', backgroundColor: 'white' }}
            />

            <DatePicker
              margin='dense'
              fullWidth
              label='Date'
              value={editDateValue}
              onChange={(newValue) => setEditDateValue(newValue)}
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
          </DialogContent>

          <DialogActions
            sx={{ justifyContent: 'center', marginBottom: '1.5vh' }}
          >
            <Button
              onClick={handleConfirmEdit}
              color='success'
              variant='contained'
            >
              Confirm Edit
            </Button>
            <Button
              onClick={handleDeleteBatch}
              color='error'
              variant='contained'
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        {!productionStarted ? (
          <Button
            variant='contained'
            disabled={isDisabled}
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
            onClick={handleStartProduction}
          >
            START PRODUCTION
          </Button>
        ) : (
          <Button
            variant='contained'
            disabled={isDisabled}
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
        <h3 className='subtitle-centra'>Leaves Drying</h3>
        <div
          className={`drying-section ${
            timerFinished ? `progress-completed` : `progress-uncompleted2`
          }`}
        >
          <div className='drying-batch-header'>Active Drying Batch</div>
          <CircularCountdownTimer
            onTimerFinish={handleTimerFinish}
            start={productionStarted}
            reset={resetTimer}
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
            >{`${dryDate}  ${dryStartedTime}`}</div>
            <h6 className='batch-field-title'>Batch Finished</h6>
            <div
              className={`batch-time-field ${
                timerFinished ? 'progress-uncompleted2' : 'batch-grey-bg'
              }`}
            >{`${dryEndDate}  ${dryEndTime}`}</div>
            <Button
              variant='contained'
              disabled={timerFinished ? false : true}
              startIcon={<AddIcon sx={{ marginRight: '3px' }} />}
              onClick={() => {
                setInputDryOpen(true);
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
              Input Drying Details
            </Button>
          </div>
        </div>
        <Dialog
          open={inputDryOpen}
          onClose={handleCloseEdit}
          PaperProps={{
            sx: {
              backgroundColor: '#EBEBEB',
              borderRadius: '5vw',
              width: '80vw',
            },
          }}
        >
          <DialogTitle sx={{ textAlign: 'center', fontWeight: '600' }}>
            {!showConfirmation ? 'Input Drying Details' : null}
            <IconButton
              aria-label='close'
              onClick={handleCloseInputDry}
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
                  value={inputDryWeight}
                  onChange={(e) => setInputDryWeight(e.target.value)}
                  sx={{ marginBottom: '16px', backgroundColor: 'white' }}
                />
                <DatePicker
                  margin='dense'
                  fullWidth
                  label='Date'
                  value={inputDryDateValue}
                  onChange={(newValue) => setInputDryDateValue(newValue)}
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
                <h4 className='confirmation-text'>Drying Completed!</h4>
                <div className='confirmation-info'>
                  <div className='batch-overview-drying'>Batch Overview</div>
                  <div className='confirmation-info-details confirmation-info-detail-full'>
                    <div>ID: </div>
                    <div style={{ fontWeight: 'bold' }}>{inputDryId}</div>
                  </div>
                  <div className='confirmation-info-details'>
                    <div className='confirmation-info-detail-full'>
                      <div>Weight: </div>
                      <div style={{ fontWeight: 'bold' }}>{`${parseFloat(
                        inputDryWeight
                      ).toFixed(1)} Kg`}</div>
                    </div>
                    <div className='confirmation-info-detail-full'>
                      <div>Exp Date: </div>
                      <div style={{ fontWeight: 'bold' }}>
                        {dayjs(inputDryDateValue).format('DD/MM/YYYY')}
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
                showConfirmation ? handleCloseConfirmation : handleInputDry
              }
              color='success'
              variant='contained'
              sx={{ textTransform: 'none' }}
            >
              Confirm
            </Button>
            {showConfirmation ? undefined : (
              <Button
                onClick={handleCloseInputDry}
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

export default CentraLeaves;
