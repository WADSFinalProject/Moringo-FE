import React, { useState } from 'react';
import CentraHeader from '../../Assets/centra-main-header.svg';
import CentraBackArrow from '../../Assets/back-arrow-centra.svg';
import { useNavigate } from 'react-router-dom';
import ProfilePictureMini from '../../Assets/modules/ProfilePictureMini.jsx';
import '../styles/CentraDeliveries.css';
import UndeliveredBatch from './modules/UndeliveredBatch.jsx';
import OngoingDelivery from './modules/OngoingDelivery.jsx';
import ArrivedBatchIcon from './modules/ArrivedBatchIcon.jsx';
import DeliveryOngoingBatchIcon from './modules/DeliveryOngoingBatchIcon.jsx';
import UndeliveredBatchIcon from './modules/UndeliveredBatchIcon.jsx';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ShipmentProgressDotOngoing from '../../Assets/shipment-progress-dot-ongoing.svg';
import ShipmentProgressDotArrived from '../../Assets/shipment-progress-dot-arrived.svg';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from '@mui/material';

const CentraDeliveries = () => {
  const [undeliveredBatches, setUndeliveredBatches] = useState([]);
  const [filteredBatches, setFilteredBatches] = useState([]);
  const [ongoingShipments, setOngoingShipments] = useState([
    {
      shipmentId: 'SH001',
      weight: 2.0,
      sender: 'Sender Address 1',
      receiver: 'Receiver Address 1',
      packageCount: 3,
      expeditionTeam: 'Team A',
      productionDate: '01/12/23',
      barcode:
        'https://cdn.discordapp.com/attachments/1003843960566992968/1245955024551673856/WhatsApp_Image_2024-05-31_at_11.17.36_8752ec5a.jpg?ex=665aa18a&is=6659500a&hm=b08f8e156167786ab12c82bebbc147e91e06661ee39ecfc99ef3789d9715b963&',
    },
    {
      shipmentId: 'SH002',
      weight: 5.5,
      sender:
        "I can't take it anymore. I'm sick of Acheron. I try to play Seele, my Acheron deals more damage. I try to play Jingliu, my Acheron deals more damage. I try to play DHIL, my Acheron does more damage. I want to play Silver Wolf, her best team has Acheron. I want to play Sparkle, but she wants Acheron. She grabs me by the throat, I grind for her, I do SU for her. I bought the 5* SU Nihility Lightcone for her, even superimpose it for her. She isn't satisfied. I pull for her signature lightcone, she scoffs it off. 'I need this to be superimposed.' She tells me.She doesn't need a team and she throws herself onto her enemies. 'You just need to support me, I can do everything by myself.' I can't pull for more support characters, I dont have enough oneiric shards and they aren't available yet. She grabs my credit card, it declines. 'Guess this is the end.' She uses her ult. She says her ult line. At this point, I've already been broken. She doesn't even need energy. What a cruel world.",
      receiver:
        "Who's joe? a distant voice asks. Instantly everyone nearby hears the sound of 1,000s of bricks rapidly shuffling towards his location. The earth itself seemed to cry out in agony, until finally the ground itself split open and a horrific creature crawled from the ground, covered in mucus and tar. Joe Momma…the creature whispered. The man cried out in pain as he disintegrated into dust, and the whole world fell silent in fear.",
      packageCount: 5,
      expeditionTeam: 'Team qwerty uiop adsfjkl;',
      productionDate: '02/12/23',
      barcode:
        'https://i.scdn.co/image/ab67616d00001e02496ef41310a298c001da69cf',
    },
    {
      shipmentId: 'SH003',
      weight: 2.5,
      sender: 'Sender Address 3',
      receiver: 'Receiver Address 3',
      packageCount: 2,
      expeditionTeam: 'Team C',
      productionDate: '03/12/23',
      barcode:
        'https://cdn.pixabay.com/photo/2014/04/02/16/19/barcode-306926_1280.png',
    },
    {
      shipmentId: 'SH004',
      weight: 3.2,
      sender: 'Sender Address 4',
      receiver: 'Receiver Address 4',
      packageCount: 4,
      expeditionTeam: 'Team D',
      productionDate: '04/12/23',
      barcode:
        'https://cdn.pixabay.com/photo/2014/04/02/16/19/barcode-306926_1280.png',
    },
    {
      shipmentId: 'SH005',
      weight: 2.0,
      sender: 'Sender Address 5',
      receiver: 'Receiver Address 5',
      packageCount: 3,
      expeditionTeam: 'Team E',
      productionDate: '05/12/23',
      barcode:
        'https://cdn.pixabay.com/photo/2014/04/02/16/19/barcode-306926_1280.png',
    },
    {
      shipmentId: 'SH006',
      weight: 5.5,
      sender: 'Sender Address 6',
      receiver: 'Receiver Address 6',
      packageCount: 5,
      expeditionTeam: 'Team F',
      productionDate: '06/12/23',
      barcode:
        'https://cdn.pixabay.com/photo/2014/04/02/16/19/barcode-306926_1280.png',
    },
    {
      shipmentId: 'SH007',
      weight: 2.5,
      sender: 'Sender Address 7',
      receiver: 'Receiver Address 7',
      packageCount: 2,
      expeditionTeam: 'Team G',
      productionDate: '07/12/23',
      barcode:
        'https://cdn.pixabay.com/photo/2014/04/02/16/19/barcode-306926_1280.png',
    },
    {
      shipmentId: 'SH008',
      weight: 3.2,
      sender: 'Sender Address 8',
      receiver: 'Receiver Address 8',
      packageCount: 4,
      expeditionTeam: 'Team H',
      productionDate: '08/12/23',
      barcode:
        'https://cdn.pixabay.com/photo/2014/04/02/16/19/barcode-306926_1280.png',
    },
  ]);
  const [arrivedShipments, setArrivedShipments] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [previouslySelectedTab, setPreviouslySelectedTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [addDeliveryDetailsOpen, setAddDeliveryDetailsOpen] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [selectedBatchWeight, setSelectedBatchWeight] = useState('');
  const [deliveryDetailsDateValue, setDeliveryDetailsDateValue] =
    useState(null);
  const [deliveryDetailsPackageCount, setDeliveryDetailsPackageCount] =
    useState('');
  const [deliveryDetailsSenderAddress, setDeliveryDetailsSenderAddress] =
    useState('');
  const [deliveryDetailsReceiverAddress, setDeliveryDetailsReceiverAddress] =
    useState('');
  const [deliveryDetailsExpeditionTeam, setDeliveryDetailsExpeditionTeam] =
    useState('');
  const [selectedShipmentId, setSelectedShipmentId] = useState('');
  const [selectedShipmentWeight, setSelectedShipmentWeight] = useState('');
  const [selectedShipmentDate, setSelectedShipmentDate] = useState(null);
  const [selectedShipmentPackageCount, setSelectedShipmentPackageCount] =
    useState('');
  const [selectedShipmentExpeditionTeam, setSelectedShipmentExpeditionTeam] =
    useState('');
  const [selectedShipmentSender, setSelectedShipmentSender] = useState('');
  const [selectedShipmentReceiver, setSelectedShipmentReceiver] = useState('');
  const [selectedShipmentBarcode, setSelectedShipmentBarcode] = useState('');
  const [branch, setBranch] = useState('');

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCloseDeliveryDetails = () => {
    setAddDeliveryDetailsOpen(false);
  };

  const handleOpenShipmentDetails = (
    shipmentId,
    shipmentWeight,
    shipmentDate,
    shipmentPackageCount,
    shipmentExpeditionTeam,
    shipmentSender,
    shipmentReceiver,
    shipmentBarcode
  ) => {
    setSelectedShipmentId(shipmentId);
    setSelectedShipmentWeight(shipmentWeight);
    setSelectedShipmentDate(shipmentDate);
    setSelectedShipmentPackageCount(shipmentPackageCount);
    setSelectedShipmentExpeditionTeam(shipmentExpeditionTeam);
    setSelectedShipmentSender(shipmentSender);
    setSelectedShipmentReceiver(shipmentReceiver);
    setSelectedShipmentBarcode(shipmentBarcode);
    setPreviouslySelectedTab(selectedTab);
    setSelectedTab(3);
  };

  React.useEffect(() => {
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

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `http://127.0.0.1:8000/all_powder_batches?centra_name=${branch}`,
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
          console.log('Data', data);
          const transformedBatches = data.map((batch) => ({
            date: batch.date_recorded,
            batchId: batch.id,
            weight: batch.powder_weight,
          }));
          console.log('Transformed', transformedBatches);
          setUndeliveredBatches(transformedBatches);
        } else {
          console.error('Failed to get powder batches:', response.status);
          alert('Failed to get powder batches. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    };
    if (branch != '') {
      fetchUserData();
    }
  }, [branch]);

  const handleTestMove = (shipmentId) => {
    const shipmentToMove = ongoingShipments.find(
      (shipment) => shipment.shipmentId === shipmentId
    );

    if (shipmentToMove) {
      const updatedOngoingShipments = ongoingShipments.filter(
        (shipment) => shipment.shipmentId !== shipmentId
      );

      const updatedArrivedShipments = [...arrivedShipments, shipmentToMove];

      // Update the state
      setOngoingShipments(updatedOngoingShipments);
      setArrivedShipments(updatedArrivedShipments);
    }
  };

  const handleOpenDeliveryDetails = (batchId, weight) => {
    setSelectedBatchId(batchId);
    setSelectedBatchWeight(weight);
    setAddDeliveryDetailsOpen(true);
  };

  React.useEffect(() => {
    setFilteredBatches(
      undeliveredBatches.filter((batch) =>
        String(batch.batchId).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    console.log(
      'Filtered',
      undeliveredBatches.filter((batch) =>
        String(batch.batchId).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [undeliveredBatches, searchQuery]);

  const filteredOngoingShipments = ongoingShipments.filter((shipment) =>
    shipment.shipmentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArrivedShipments = arrivedShipments.filter((shipment) =>
    shipment.shipmentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMoveBack = () => {
    navigate('/centra/homepage');
  };

  const addNewShipment = async () => {
    if (
      !selectedBatchWeight ||
      !selectedBatchId ||
      !deliveryDetailsSenderAddress ||
      !deliveryDetailsReceiverAddress ||
      !deliveryDetailsPackageCount ||
      !deliveryDetailsExpeditionTeam ||
      !deliveryDetailsDateValue
    ) {
      alert('Please fill in all the fields.');
      return;
    }
    const parsedDate = dayjs(deliveryDetailsDateValue, 'MM/DD/YYYY');
    const formattedDate = parsedDate.format('YYYY-MM-DD');
    const newShipment = {
      package_weight: Number(selectedBatchWeight),
      powder_batch_id: Number(selectedBatchId),
      total_package: Number(deliveryDetailsPackageCount),
      centra_sender: branch,
      sender_address: deliveryDetailsSenderAddress,
      receiver_address: deliveryDetailsReceiverAddress,
      expedition: deliveryDetailsExpeditionTeam,
      date_shipped: formattedDate,
    };

    console.log('New shipment', JSON.stringify(newShipment));

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://127.0.0.1:8000/centra/shipments?token=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newShipment),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert('Shipment has been added');
        window.location.reload();
      } else {
        console.error('Failed to fetch current user:', response.status);
        alert('Failed to fetch current user. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className='container-deliveries'>
        <div className='container-deliveries-scrollable'>
          <div className='centra-top-section'>
            <img
              className='centra-main-header'
              src={CentraHeader}
              alt='header'
            />
            <div className='centra-top-row'>
              <img
                src={CentraBackArrow}
                alt='Back'
                className='back-arrow'
                onClick={
                  selectedTab == 3
                    ? () => {
                        setSelectedTab(previouslySelectedTab);
                      }
                    : handleMoveBack
                }
              />
              <h3 className='leaves-title'>
                {selectedTab == 3 ? 'Shipping Details' : 'Shipments'}
              </h3>
              {selectedTab == 3 ? null : (
                <div className='right-icons'>
                  <ProfilePictureMini />
                </div>
              )}
            </div>
          </div>
          <h3 className='subtitle-centra-deliveries'>
            {selectedTab == 0
              ? 'Undelivered Batches'
              : selectedTab == 1
              ? 'Ongoing Shipments'
              : selectedTab == 2
              ? 'Received Shipments'
              : null}
          </h3>
          {selectedTab == 3 ? null : (
            <div className='search-input-container'>
              <div className='search-input-wrapper'>
                <input
                  type='text'
                  className='search-input'
                  placeholder={`Search by ${
                    selectedTab == 0 ? 'Batch' : 'Shipment'
                  } ID...`}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <SearchIcon className='search-icon' />
              </div>
            </div>
          )}
          {selectedTab == 0 ? (
            <div className='undelivered-batch-main-container'>
              {filteredBatches.map((batch, index) => (
                <UndeliveredBatch
                  key={`undelivered-batch-${index}`}
                  productionDate={batch.date}
                  batchId={batch.batchId}
                  weight={batch.weight}
                  onOpenDeliveryDetails={handleOpenDeliveryDetails}
                />
              ))}
            </div>
          ) : null}
          {selectedTab == 1 ? (
            <div className='undelivered-batch-main-container'>
              {filteredOngoingShipments.map((shipment, index) => (
                <OngoingDelivery
                  key={`undelivered-shipment-${index}`}
                  shipmentId={shipment.shipmentId}
                  shipmentDate={shipment.productionDate}
                  weight={shipment.weight}
                  packageCount={shipment.packageCount}
                  expeditionTeam={shipment.expeditionTeam}
                  sender={shipment.sender}
                  receiver={shipment.receiver}
                  barcode={shipment.barcode}
                  arrived={false}
                  onOpenShipmentDetails={handleOpenShipmentDetails}
                  testingMove={handleTestMove}
                />
              ))}
            </div>
          ) : selectedTab == 2 ? (
            <div className='undelivered-batch-main-container'>
              {filteredArrivedShipments.map((shipment, index) => (
                <OngoingDelivery
                  key={`undelivered-shipment-${index}`}
                  shipmentId={shipment.shipmentId}
                  shipmentDate={shipment.productionDate}
                  weight={shipment.weight}
                  packageCount={shipment.packageCount}
                  expeditionTeam={shipment.expeditionTeam}
                  sender={shipment.sender}
                  receiver={shipment.receiver}
                  barcode={shipment.barcode}
                  arrived={true}
                  onOpenShipmentDetails={handleOpenShipmentDetails}
                  testingMove={handleTestMove}
                />
              ))}
            </div>
          ) : null}
          {selectedTab == 3 ? (
            <div className='shipment-detail-outer-container'>
              <div className='shipment-detail-container'>
                <div
                  className={
                    previouslySelectedTab == 1
                      ? 'ongoing-id-layout'
                      : 'arrived-id-layout'
                  }
                >
                  <div
                    className={`shipment-detail-id ${
                      previouslySelectedTab == 1
                        ? null
                        : 'shipment-detail-id-arrived'
                    }`}
                  >
                    <div className='undelivered-batch-id-label-and-value'>
                      <div className='shipment-id-label'>Shipment ID</div>
                      <div className='undelivered-batch-id-value'>
                        {selectedShipmentId}
                      </div>
                    </div>
                    <div className='shipment-status-upper'>
                      <img
                        src={
                          previouslySelectedTab == 1
                            ? ShipmentProgressDotOngoing
                            : ShipmentProgressDotArrived
                        }
                        alt={
                          previouslySelectedTab == 1 ? 'On the way' : 'Arrived'
                        }
                        style={{ width: '3.7vw' }}
                      />
                      <div>
                        {previouslySelectedTab == 1 ? 'On the way' : 'Arrived'}
                      </div>
                    </div>
                  </div>
                  {previouslySelectedTab == 1 ? null : (
                    <div className='shipment-detail-received-date'>
                      {`Received on: ${dayjs().format('DD/MM/YY')}`}
                    </div>
                  )}
                </div>
                <div className='shipment-detail-sender-receiver'>
                  <div className='shipment-detail-sender-title'>
                    <div className='shipment-detail-left-side'></div>
                    <div className='shipment-detail-right-side'>Sender</div>
                  </div>
                  <div className='shipment-detail-sender-data'>
                    <div className='shipment-detail-left-side'>
                      <div className='dot'></div>
                      <div className='line-down'></div>
                    </div>
                    <div className='shipment-detail-right-side'>
                      {selectedShipmentSender}
                    </div>
                  </div>
                  <div className='shipment-detail-gap'>
                    <div className='shipment-detail-left-side'>
                      <div className='line-full'></div>
                    </div>
                    <div className='shipment-detail-right-side'></div>
                  </div>
                  <div className='shipment-detail-receiver-title'>
                    <div className='shipment-detail-left-side'>
                      <div className='line-full'></div>
                    </div>
                    <div className='shipment-detail-right-side'>Receiver</div>
                  </div>
                  <div className='shipment-detail-receiver-data'>
                    <div className='shipment-detail-left-side'>
                      <div className='dot'></div>
                      <div className='line-up'></div>
                    </div>
                    <div className='shipment-detail-right-side'>
                      {selectedShipmentReceiver}
                    </div>
                  </div>
                </div>
                <div className='shipment-detail-main-details'>
                  <div className='shipment-all-data-left'>
                    <div>Weight:</div>
                    <div
                      style={{ fontWeight: 'bold', marginLeft: '1vw' }}
                    >{`${parseFloat(selectedShipmentWeight).toFixed(
                      1
                    )} Kg`}</div>
                  </div>
                  <div className='shipment-all-data-left'>
                    <div>Shipment date:</div>
                    <div style={{ fontWeight: 'bold', marginLeft: '1vw' }}>
                      {dayjs(selectedShipmentDate).format('DD/MM/YYYY')}
                    </div>
                  </div>
                  <div className='shipment-all-data-left'>
                    <div>Package Count:</div>
                    <div style={{ fontWeight: 'bold', marginLeft: '1vw' }}>
                      {selectedShipmentPackageCount}
                    </div>
                  </div>
                  <div className='shipment-all-data-left'>
                    <div>Expedition Team:</div>
                    <div style={{ fontWeight: 'bold', marginLeft: '1vw' }}>
                      {selectedShipmentExpeditionTeam}
                    </div>
                  </div>
                </div>
                {previouslySelectedTab == 1 ? (
                  <div className='shipment-detail-barcode'>
                    <img
                      src={selectedShipmentBarcode}
                      alt='barcode'
                      className='shipment-barcode'
                    />
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
          <Dialog
            open={addDeliveryDetailsOpen}
            onClose={handleCloseDeliveryDetails}
            PaperProps={{
              sx: {
                backgroundColor: '#EBEBEB',
                borderRadius: '5vw',
              },
            }}
          >
            <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bolder' }}>
              Input Shipment Details
              <IconButton
                aria-label='close'
                onClick={handleCloseDeliveryDetails}
                sx={{ position: 'absolute', right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>

            <DialogContent>
              <TextField
                margin='dense'
                label='Batch ID'
                type='text'
                fullWidth
                value={selectedBatchId}
                disabled
                sx={{
                  marginBottom: '16px',
                  backgroundColor: '#D7D7D7',
                  color: '#6D6D6D',
                }}
              />
              <TextField
                margin='dense'
                label='Weight (kg)'
                type='number'
                fullWidth
                value={selectedBatchWeight}
                disabled
                sx={{
                  marginBottom: '16px',
                  backgroundColor: '#D7D7D7',
                  color: '#6D6D6D',
                }}
              />
              <TextField
                margin='dense'
                label='Package Count'
                type='number'
                fullWidth
                value={deliveryDetailsPackageCount}
                onChange={(e) => setDeliveryDetailsPackageCount(e.target.value)}
                sx={{
                  marginBottom: '16px',
                  backgroundColor: 'white',
                }}
              />
              <TextField
                margin='dense'
                label='Sender address'
                type='text'
                fullWidth
                value={deliveryDetailsSenderAddress}
                onChange={(e) =>
                  setDeliveryDetailsSenderAddress(e.target.value)
                }
                sx={{
                  marginBottom: '16px',
                  backgroundColor: 'white',
                }}
              />
              <TextField
                margin='dense'
                label='Receiver address'
                type='text'
                fullWidth
                value={deliveryDetailsReceiverAddress}
                onChange={(e) =>
                  setDeliveryDetailsReceiverAddress(e.target.value)
                }
                sx={{
                  marginBottom: '16px',
                  backgroundColor: 'white',
                }}
              />
              <TextField
                margin='dense'
                label='Expedition Team'
                type='text'
                fullWidth
                value={deliveryDetailsExpeditionTeam}
                onChange={(e) =>
                  setDeliveryDetailsExpeditionTeam(e.target.value)
                }
                sx={{
                  marginBottom: '16px',
                  backgroundColor: 'white',
                }}
              />

              <DatePicker
                margin='dense'
                fullWidth
                label='Date'
                value={deliveryDetailsDateValue}
                onChange={(newValue) => setDeliveryDetailsDateValue(newValue)}
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
                onClick={addNewShipment}
                color='success'
                variant='contained'
              >
                Confirm
              </Button>
            </DialogActions>
          </Dialog>
        </div>
        {selectedTab == 3 ? null : (
          <div className='container-deliveries-unscrollable'>
            <div
              className={`tab ${selectedTab === 0 ? 'selected' : ''}`}
              onClick={() => setSelectedTab(0)}
            >
              <UndeliveredBatchIcon
                fill={`${selectedTab === 0 ? '#395420' : '#ADBB7F'}`}
                stroke={`${selectedTab === 0 ? '#395420' : '#ADBB7F'}`}
              />
            </div>
            <div
              className={`tab ${selectedTab === 1 ? 'selected' : ''}`}
              onClick={() => setSelectedTab(1)}
            >
              <DeliveryOngoingBatchIcon
                fill={`${selectedTab === 1 ? '#395420' : '#ADBB7F'}`}
              />
            </div>
            <div
              className={`tab ${selectedTab === 2 ? 'selected' : ''}`}
              onClick={() => setSelectedTab(2)}
            >
              <ArrivedBatchIcon
                fill={`${selectedTab === 2 ? '#395420' : '#ADBB7F'}`}
                stroke={`${selectedTab === 2 ? '#395420' : '#ADBB7F'}`}
              />
            </div>
          </div>
        )}
      </div>
    </LocalizationProvider>
  );
};

export default CentraDeliveries;
