import React from "react";
import Header from "../../../Assets/centra-homepage-header.svg";
import Leaf from "../../../Assets/centra-leaf.svg";
import bell from "../../../Assets/BellTemp.svg";
import ProfilePictureMini from "../../../Assets/modules/ProfilePictureMini.jsx";
import { useNavigate } from "react-router-dom";
import "../../styles/HarborMainPage.css";

const Greetings = () => {
  const [user, setUser] = React.useState("Christoffer");
  const [currentTime, setCurrentTime] = React.useState(new Date());

  const navigate = useNavigate();

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

  return (
    <div style={{ minHeight: "240px" }}>
      <img className="header-harbor" src={Header} alt="Header" />
      <img className="header-harbor leaf-harbor" src={Leaf} alt="Leaf" />
      <div className="harbor-homepage h-top-1">
        <img
          className="bell"
          src={bell}
          onClick={() => {
            navigate("/harbor/notifications");
          }}
        />
        <h3 className="harbor-title">HARBOR</h3>
      </div>
      <div className="harbor-homepage top-2">
        <h1 className="hello-user">Hello! {user}</h1>
        <ProfilePictureMini />
      </div>
      <div className="time-date">
        <p>{formatTime(currentTime)},</p>
        <p>{formatDate(currentTime)}</p>
      </div>
    </div>
  );
};

export default Greetings;
