import React, { useState, useEffect } from "react";
import "../styles/AdminManaging.css";
import Bin from "../../Assets/Bin.svg";
import Arrow from "../../Assets/ArrowTemp.svg";
import Arrow2 from "../../Assets/Arrow.svg";
import Bell from "../../Assets/Bell.svg";
import ProfilePictureMini from "../../Assets/modules/ProfilePictureMini.jsx";

const fetchNotifications = async () => {
  return new Promise((resolve) => {
    const notification = [
      {
        id: "0",
        email: "test@gmail.com",
        date: `${formatDate(dateOffset(0))} ${formatTime(dateOffset(0))}`,
        read: true,
      },
      {
        id: "1",
        email: "brandon@gmail.com",
        date: `${formatDate(dateOffset(0))} ${formatTime(dateOffset(0))}`,
        read: false,
      },
      {
        id: "2",
        email: "brandon@gmail.com",
        date: `${formatDate(dateOffset(-1))} ${formatTime(dateOffset(0))}`,
        read: false,
      },
      {
        id: "3",
        email: "brandon@gmail.com",
        date: `${formatDate(dateOffset(-1))} ${formatTime(dateOffset(0))}`,
        read: false,
      },
      {
        id: "4",
        email: "bryan@gmail.com",
        date: `${formatDate(dateOffset(-2))} ${formatTime(dateOffset(0))}`,
        read: false,
      },
      {
        id: "5",
        email: "bryan@gmail.com",
        date: `${formatDate(dateOffset(-3))} ${formatTime(dateOffset(0))}`,
        read: false,
      },
      {
        id: "6",
        email: "kenneth@gmail.com",
        date: `${formatDate(dateOffset(-5))} ${formatTime(dateOffset(0))}`,
        read: false,
      },
      {
        id: "7",
        email:
          "kennethhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh@gmail.com",
        date: `${formatDate(dateOffset(-18))} ${formatTime(dateOffset(0))}`,
        read: false,
      },
    ];
    resolve(notification);
  });
};

const formatDate = (date) => {
  const mm = (date.getMonth() + 1).toString().padStart(2, "0");
  const dd = date.getDate().toString().padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${mm}/${dd}/${yyyy}`;
};

const formatTime = (date) => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const dateOffset = (daysOffset) => {
  const currentDateTime = new Date();
  currentDateTime.setDate(currentDateTime.getDate() + daysOffset);
  return currentDateTime;
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
      setSelectedNotifications(
        recievedNotifications.map((notification) => notification.id)
      );
    }
  };

  const isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear()
    );
  };

  const todayNotifications = recievedNotifications.filter((notification) =>
    isToday(new Date(notification.date))
  );
  const yesterdayNotifications = recievedNotifications.filter((notification) =>
    isYesterday(new Date(notification.date))
  );
  const earlierNotifications = recievedNotifications.filter(
    (notification) =>
      !isToday(new Date(notification.date)) &&
      !isYesterday(new Date(notification.date))
  );

  const markAsRead = (id) => {
    const updatedNotifications = recievedNotifications.map((notification) =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setRecievedNotifications(updatedNotifications);
  };

  return (
    <div className="p-container">
      <div className="top">
        <div className="a-title">Notification</div>
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
            <ProfilePictureMini />
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
            {windowWidth <= 560 ? null : (
              <div style={{ fontSize: "21px" }}> | </div>
            )}
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
                {todayNotifications.length > 0 && (
                  <li className="notification-subtitle">Today</li>
                )}
                {todayNotifications.map((notification) => (
                  <li
                    className={`notification-bar ${
                      notification.read ? "read" : ""
                    }`}
                    key={notification.id}
                    onClick={() => {
                      markAsRead(notification.id);
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        className="notification-checkbox"
                        type="checkbox"
                        checked={selectedNotifications.includes(
                          notification.id
                        )}
                        onChange={() => handleSelect(notification.id)}
                      />
                      <div className="notification-details">
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
                        <div>
                          <span className="notification-extra-details">
                            {notification.date.split(" ")[0]}{" "}
                          </span>
                          <span className="notification-extra-details 2">
                            {notification.date.split(" ")[1]}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <button
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "transparent",
                          zIndex: "1",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSingle(notification.id);
                        }}
                      >
                        <img src={Bin} className="notification-bin" />
                      </button>
                    </div>
                  </li>
                ))}
                {yesterdayNotifications.length > 0 && (
                  <li className="notification-subtitle">Yesterday</li>
                )}
                {yesterdayNotifications.map((notification) => (
                  <li
                    className={`notification-bar ${
                      notification.read ? "read" : ""
                    }`}
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        className="notification-checkbox"
                        type="checkbox"
                        checked={selectedNotifications.includes(
                          notification.id
                        )}
                        onChange={() => handleSelect(notification.id)}
                      />
                      <div className="notification-details">
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
                        <div>
                          <span className="notification-extra-details">
                            {notification.date.split(" ")[0]}{" "}
                          </span>
                          <span className="notification-extra-details 2">
                            {notification.date.split(" ")[1]}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <button
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "transparent",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSingle(notification.id);
                        }}
                      >
                        <img src={Bin} className="notification-bin" />
                      </button>
                    </div>
                  </li>
                ))}
                {earlierNotifications.length > 0 && (
                  <li className="notification-subtitle">Earlier</li>
                )}
                {earlierNotifications.map((notification) => (
                  <li
                    className={`notification-bar ${
                      notification.read ? "read" : ""
                    }`}
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <input
                        className="notification-checkbox"
                        type="checkbox"
                        checked={selectedNotifications.includes(
                          notification.id
                        )}
                        onChange={() => handleSelect(notification.id)}
                      />
                      <div className="notification-details">
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
                        <div>
                          <span className="notification-extra-details">
                            {notification.date.split(" ")[0]}{" "}
                          </span>
                          <span className="notification-extra-details 2">
                            {notification.date.split(" ")[1]}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <button
                        style={{
                          backgroundColor: "transparent",
                          borderColor: "transparent",
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteSingle(notification.id);
                        }}
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
