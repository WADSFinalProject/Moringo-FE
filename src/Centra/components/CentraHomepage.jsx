import React from 'react';
import HomepageHeader from '../../Assets/centra-homepage-header.svg';
import HomepageLeaf from '../../Assets/centra-leaf.svg';
import { useNavigate } from 'react-router-dom';
import ProfilePictureMini from '../../Assets/modules/ProfilePictureMini.jsx';
import LeafLogo from '../../Assets/leaf-production-logo.svg';
import PowderLogo from '../../Assets/powder-production-logo.svg';
import DeliveryLogo from '../../Assets/delivery-logo.svg';
import BatchTimer from './modules/BatchTimer.jsx';
import OngoingDeliveryHomepageVersion from './modules/OngoingDeliveryHomepageVersion.jsx';

const CentraHomepage = () => {
  const [user, setUser] = React.useState('');
  const [branch, setBranch] = React.useState('');
  const [currentTime, setCurrentTime] = React.useState(new Date());

  const navigate = useNavigate();

  const [leavesBatchTimers, setLeavesBatchTimers] = React.useState([]);

  const [powderBatchTimers, setPowderBatchTimers] = React.useState([]);

  const ongoingDeliveries = [
    { shipmentId: '#OL001', weight: 3.0, noOfPackages: 2 },
    { shipmentId: '#OL002', weight: 9.0, noOfPackages: 4 },
    { shipmentId: '#OL003', weight: 12.2, noOfPackages: 777 },
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://moringo-be-sand.vercel.app/current_user', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setUser(data.first_name);
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
    const fetchMachineData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(
          `https://moringo-be-sand.vercel.app/centra/drying_machine_remaining_time/${branch}`,
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
          const remaining_time = data.remaining_time;
          const remaining_hours = Math.floor(remaining_time / 3600);
          const remaining_minutes = Math.floor((remaining_time % 3600) / 60);
          const remaining_seconds = remaining_time % 60;
          const leavesTimer = {
            leaves: true,
            hours: remaining_hours,
            minutes: remaining_minutes,
            seconds: remaining_seconds,
          };
          setLeavesBatchTimers([...leavesBatchTimers, leavesTimer]);
          try {
            const token = localStorage.getItem('token');
            const response = await fetch(
              `https://moringo-be-sand.vercel.app/centra/powder_machine_remaining_time/${branch}`,
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
              const remaining_time = data.remaining_time;
              const remaining_hours = Math.floor(remaining_time / 3600);
              const remaining_minutes = Math.floor(
                (remaining_time % 3600) / 60
              );
              const remaining_seconds = remaining_time % 60;
              const powderTimer = {
                leaves: false,
                hours: remaining_hours,
                minutes: remaining_minutes,
                seconds: remaining_seconds,
              };
              setPowderBatchTimers([...powderBatchTimers, powderTimer]);
            } else {
              console.error('Failed to fetch machine data:', response.status);
              alert('Failed to fetch machine data. Please try again.');
            }
          } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
          }
        } else {
          console.error('Failed to fetch machine data:', response.status);
          alert('Failed to fetch machine data. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      }
    };

    if (branch) {
      fetchMachineData();
    }
  }, [branch]);

  const formatTime = (date) => {
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
    return date.toLocaleString('en-US', options);
  };

  const formatDate = (date) => {
    const options = {
      weekday: 'short',
      day: 'numeric',
      month: 'long',
    };
    return date.toLocaleString('en-US', options);
  };

  const handleMoveToLeaves = () => {
    navigate('/centra/leaves');
  };

  const handleMoveToPowder = () => {
    navigate('/centra/powder');
  };

  const handleMoveToDeliveries = () => {
    navigate('/centra/deliveries');
  };

  return (
    <div className='container-homepage'>
      <img className='header-centra' src={HomepageHeader} alt='header' />
      <img
        className='header-centra leaf-centra'
        src={HomepageLeaf}
        alt='leaf'
      />
      <div className='centra-homepage top-1'>
        <h3 className='centra-title'>CENTRA</h3>
      </div>
      <div className='centra-homepage top-2'>
        <h1 className='hello-user'>Hello! {user}</h1>
        <ProfilePictureMini />
      </div>
      <div className='time-date'>
        <p>{formatTime(currentTime)},</p>
        <p>{formatDate(currentTime)}</p>
      </div>
      <div className='leaves-and-powder'>
        <div className='leaf-powder-button' onClick={handleMoveToLeaves}>
          <img className='leaf-logo' src={LeafLogo} alt='leaf logo' />
          <h4>
            Leaves
            <br />
            Production
          </h4>
        </div>
        <div className='leaf-powder-button' onClick={handleMoveToPowder}>
          <img className='powder-logo' src={PowderLogo} alt='powder logo' />
          <h4>
            Powder
            <br />
            Production
          </h4>
        </div>
      </div>
      <div className='delivery-button' onClick={handleMoveToDeliveries}>
        <img className='delivery-logo' src={DeliveryLogo} alt='delivery logo' />
        <h4>Deliveries</h4>
      </div>
      <div className='homepage-bottom-half'>
        <h3 className='homepage-bottom-label'>Batch Timer</h3>
        <div className=''>
          {leavesBatchTimers.map((timer, index) => (
            <BatchTimer
              key={`leaves-${index}`}
              leaves={timer.leaves}
              hours={timer.hours}
              minutes={timer.minutes}
              seconds={timer.seconds}
            />
          ))}
          {powderBatchTimers.map((timer, index) => (
            <BatchTimer
              key={`powder-${index}`}
              leaves={timer.leaves}
              hours={timer.hours}
              minutes={timer.minutes}
              seconds={timer.seconds}
            />
          ))}
        </div>
        <h3 className='homepage-bottom-label'>Ongoing Shipments</h3>
        <div>
          {ongoingDeliveries.map((shipment, index) => (
            <OngoingDeliveryHomepageVersion
              key={`shipment-${index}`}
              shipmentId={shipment.shipmentId}
              weight={shipment.weight}
              noOfPackages={shipment.noOfPackages}
            />
          ))}
        </div>
        <div className='empty-space-bottom-centra-homepage'></div>
      </div>
    </div>
  );
};

export default CentraHomepage;
