import React from "react";
import HomepageHeader from "../../Assets/centra-homepage-header.svg";
import HomepageLeaf from "../../Assets/centra-leaf.svg";
import { useNavigate } from "react-router-dom";
import ProfilePictureMini from "./modules/ProfilePictureMini.jsx";
import LeafLogo from "../../Assets/leaf-production-logo.svg";
import PowderLogo from "../../Assets/powder-production-logo.svg";
import DeliveryLogo from "../../Assets/delivery-logo.svg";
import BatchTimer from "./modules/BatchTimer.jsx";
import OngoingDeliveryHomepageVersion from "./modules/OngoingDeliveryHomepageVersion.jsx";

const CentraHomepage = () => {
  const [user, setUser] = React.useState("Christoffer");
  const [currentTime, setCurrentTime] = React.useState(new Date());

  const navigate = useNavigate();

  const leavesBatchTimers = [
    { leaves: true, hours: 1, minutes: 30, seconds: 0 },
    { leaves: true, hours: 2, minutes: 30, seconds: 0 },
    { leaves: true, hours: 6, minutes: 46, seconds: 9 },
    { leaves: true, hours: 1, minutes: 30, seconds: 55 },
  ];

  const powderBatchTimers = [
    { leaves: false, hours: 4, minutes: 30, seconds: 3 },
    { leaves: false, hours: 4, minutes: 20, seconds: 0 },
    { leaves: false, hours: 1, minutes: 30, seconds: 55 },
    { leaves: false, hours: 7, minutes: 27, seconds: 27 },
  ];

  const ongoingDeliveries = [
    { shipmentId: "#OL001", weight: 3.0, noOfPackages: 2 },
    { shipmentId: "#OL002", weight: 9.0, noOfPackages: 4 },
    { shipmentId: "#OL003", weight: 12.2, noOfPackages: 777 },
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  const formatDate = (date) => {
    const options = {
      weekday: "short",
      day: "numeric",
      month: "long",
    };
    return date.toLocaleString("en-US", options);
  };

  const handleMoveToLeaves = () => {
    navigate("/centra/leaves");
  };

  const handleMoveToPowder = () => {
    navigate("/centra/powder");
  };

  const handleMoveToDeliveries = () => {
    navigate("/centra/deliveries");
  };

  return (
    <div className="container-homepage">
      <img className="header-centra" src={HomepageHeader} alt="header" />
      <img
        className="header-centra leaf-centra"
        src={HomepageLeaf}
        alt="leaf"
      />
      <div className="centra-homepage top-1">
        <h3 className="centra-title">CENTRA</h3>
      </div>
      <div className="centra-homepage top-2">
        <h1 className="hello-user">Hello! {user}</h1>
        <ProfilePictureMini />
      </div>
      <div className="time-date">
        <p>{formatTime(currentTime)},</p>
        <p>{formatDate(currentTime)}</p>
      </div>
      <div className="leaves-and-powder">
        <div className="leaf-powder-button" onClick={handleMoveToLeaves}>
          <img className="leaf-logo" src={LeafLogo} alt="leaf logo" />
          <h4>
            Leaves
            <br />
            Production
          </h4>
        </div>
        <div className="leaf-powder-button" onClick={handleMoveToPowder}>
          <img className="powder-logo" src={PowderLogo} alt="powder logo" />
          <h4>
            Powder
            <br />
            Production
          </h4>
        </div>
      </div>
      <div className="delivery-button" onClick={handleMoveToDeliveries}>
        <img className="delivery-logo" src={DeliveryLogo} alt="delivery logo" />
        <h4>Deliveries</h4>
      </div>
      <div className="homepage-bottom-half">
        <h3 className="homepage-bottom-label">Batch Timer</h3>
        <div className="">
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
        <h3 className="homepage-bottom-label">Ongoing Shipments</h3>
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
        <div className="empty-space-bottom-centra-homepage"></div>
      </div>
    </div>
  );
};

export default CentraHomepage;
