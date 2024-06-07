import React, { useState, useEffect } from "react";
import "../styles/Managing.css";
import Avatar from "../../Assets/Avatar.svg";
import Bin from "../../Assets/Bin.svg";
import Arrow from "../../Assets/ArrowTemp.svg";
import Arrow2 from "../../Assets/Arrow.svg";
import Bell from "../../Assets/Bell.svg";

const fetchNotifications = () => {
  return new Promise((resolve) => {
    const notification = [
      {
        id: "0",
        email: "test@gmail.com",
        date: "11/09/2001",
      },
      {
        id: "1",
        email: "brandon@gmail.com",
        date: "20/02/2024",
      },
      {
        id: "2",
        email: "brandon@gmail.com",
        date: "22/02/2024",
      },
      {
        id: "3",
        email: "brandon@gmail.com",
        date: "23/02/2024",
      },
      {
        id: "4",
        email: "bryan@gmail.com",
        date: "24/02/2024",
      },
      {
        id: "5",
        email: "bryan@gmail.com",
        date: "26/02/2024",
      },
      {
        id: "6",
        email: "kenneth@gmail.com",
        date: "26/02/2024",
      },
      {
        id: "7",
        email:
          "kennethhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh@gmail.com",
        date: "26/02/2024",
      },
    ];
    resolve(notification);
  });
};

const ManageNotification = ({ onNavigate }) => {
  const [recievedNotifications, setRecievedNotifications] = useState([]);
  const [selectedNotifications, setSelectedNotifications] = useState([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchNotifications().then((data) => setRecievedNotifications(data));
  }, []);

  const handleDeleteSelected = () => {
    setRecievedNotifications((prevNotifications) =>
      prevNotifications.filter(
        (notification) => !selectedNotifications.includes(notification.id)
      )
    );
    setSelectedNotifications([]);
  };

  const handleDeleteSingle = (id) => {
    setRecievedNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const handleSelect = (id) => {
    setSelectedNotifications((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((selectedId) => selectedId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedNotifications.length === recievedNotifications.length) {
      setSelectedNotifications([]);
    } else {
      setSelectedNotifications(recievedNotifications.map((notif) => notif.id));
    }
  };

  return (
    <div className="p-container">
      <div className="top">
        <div className="title">Notification</div>
        <div className="time-detail">
          <div className="text">Last Data Refresh at: </div>
          <div className="time">25 March 2024 ~ 10:30 PM</div>
        </div>
        {windowWidth <= 560 ? <div /> : null}
        <div className="profile-detail-temp">
          <button
            style={{
              marginRight: "5px",
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
            onClick={() => onNavigate("dashboard")}
          >
            {windowWidth <= 560 ? (
              <img src={Arrow2} className="notif-bell" />
            ) : (
              <img src={Arrow} className="notif-arrow" />
            )}
          </button>
          <div className="profile-detail">
            <div className="name-detail">
              <div className="name">John Doe</div>
              <div className="id">JOHN45</div>
            </div>
            <img src={Avatar} className="avatar-icon" />
          </div>
        </div>
      </div>
      {windowWidth <= 560 ? (
        <div className="top-secondary">
          <img
            src={Bell}
            style={{ transform: "scale(1.3)" }}
            className="top-secondary-img"
          />
          <div className="top-secondary-title">Notification</div>
        </div>
      ) : null}
      <div className="p-bottom">
        <div className="p-bottom-container notif">
          <div className="p-bottom-container-notif-buttons">
            <button
              className="notification-delete-button"
              onClick={handleDeleteSelected}
            >
              Delete Selected
            </button>
            {windowWidth <= 560 ? null : <div> | </div>}
            <button
              className="notification-select-button"
              onClick={handleSelectAll}
            >
              Select All
            </button>
          </div>
          <div className="p-bottom-container-content fade-in-left">
            <div className="p-table-wrapper" style={{ marginBottom: "50px" }}>
              <ul>
                {recievedNotifications.map((notification) => (
                  <li className="notification-bar" key={notification.id}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        className="notification-checkbox"
                        type="checkbox"
                        checked={selectedNotifications.includes(
                          notification.id
                        )}
                        onChange={() => handleSelect(notification.id)}
                      />
                      <div>
                        <span
                          className={`notif-email ${
                            notification.email.length > 10
                              ? "long-word-break"
                              : ""
                          }`}
                        >
                          {notification.email}
                        </span>{" "}
                        has requested for approval
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {windowWidth <= 560 ? null : (
                        <span>{notification.date}</span>
                      )}
                      <button
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "transparent",
                        }}
                        onClick={() => handleDeleteSingle(notification.id)}
                      >
                        <img src={Bin} className="notification-bin" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageNotification;
