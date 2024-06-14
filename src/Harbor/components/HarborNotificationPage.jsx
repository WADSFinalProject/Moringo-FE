import { useState, useEffect } from "react";
import Header3 from "../../Assets/centra-main-header.svg";
import arrow from "../../Assets/Arrow.svg";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Filter from "../../Assets/Filter.svg";
import "../styles/HarborNotificationPage.css";
import { useNavigate } from "react-router-dom";

const initialNotifications = [
  { message: "Kiss Kokomi", read: true, timestamp: new Date() },
  {
    message: "Kiss Fu Xuan",
    read: true,
    timestamp: new Date(new Date().setDate(new Date().getDate() - 1)),
  },
  {
    message: "Kiss Jinshi",
    read: true,
    timestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    message: "Kiss Childe",
    read: false,
    timestamp: new Date(new Date().setDate(new Date().getDate() - 2)),
  },
  {
    message: "Never gonna give you up",
    read: false,
    timestamp: new Date(new Date().setDate(new Date().getDate() - 30000)),
  },
  // Add more notifications as needed
];

const formatDateTime = (date) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options).replace(", ", " ");
};

const groupNotificationsByDate = (notifications) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const todayNotifications = [];
  const yesterdayNotifications = [];
  const earlierNotifications = [];

  notifications.forEach((notification) => {
    const date = new Date(notification.timestamp);

    if (date.toDateString() === today.toDateString()) {
      todayNotifications.push(notification);
    } else if (date.toDateString() === yesterday.toDateString()) {
      yesterdayNotifications.push(notification);
    } else {
      earlierNotifications.push(notification);
    }
  });

  return { todayNotifications, yesterdayNotifications, earlierNotifications };
};

const NotificationPage = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filteredNotifications, setFilteredNotifications] =
    useState(initialNotifications);
  const [dataRangeModalOpen, setDataRangeModalOpen] = useState(false);
  const [fromDateValue, setFromDateValue] = useState(null);
  const [toDateValue, setToDateValue] = useState(null);
  const [groupedNotifications, setGroupedNotifications] = useState({
    todayNotifications: [],
    yesterdayNotifications: [],
    earlierNotifications: [],
  });

  const navigate = useNavigate();

  const deleteNotification = (notificationToDelete) => {
    setNotifications(
      notifications.filter(
        (notification) => notification !== notificationToDelete
      )
    );
    setFilteredNotifications(
      filteredNotifications.filter(
        (notification) => notification !== notificationToDelete
      )
    );
  };

  useEffect(() => {
    const grouped = groupNotificationsByDate(filteredNotifications);
    setGroupedNotifications(grouped);
  }, [filteredNotifications]);

  const { todayNotifications, yesterdayNotifications, earlierNotifications } =
    groupedNotifications;

  const filterNotificationsByDateRange = () => {
    if (fromDateValue && toDateValue) {
      const fromDate = new Date(fromDateValue);
      const toDate = new Date(toDateValue);
      toDate.setHours(23, 59, 59, 999);

      if (fromDate > toDate) {
        alert("From date should be before to date Dumbass( ‘• ω • `) ");
        return;
      }

      const filteredNotifications = notifications.filter((notification) => {
        const notificationDate = new Date(notification.timestamp);
        return notificationDate >= fromDate && notificationDate <= toDate;
      });

      setFilteredNotifications(filteredNotifications);
      setDataRangeModalOpen(false);
    }
  };

  const revertFilter = () => {
    setFromDateValue(null);
    setToDateValue(null);
    setFilteredNotifications(notifications);
    setDataRangeModalOpen(false);
  };

  const handleOpenDateRangeModal = () => {
    setDataRangeModalOpen(true);
  };

  const handleCloseDataRangeModal = () => {
    setDataRangeModalOpen(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="harbor-page-container">
        <div className="harbor-top-section">
          <img className="harbor-main-header" src={Header3} alt="Header" />
          <div className="harbor-top-row">
            <img
              className="arrow"
              src={arrow}
              alt="Arrow"
              onClick={() => {
                navigate(-1);
              }}
            />
            <h3 className="harbor-other-title">Notification</h3>
            <div className="right-icons">
              <div className="notif-icon">
                <img
                  src={Filter}
                  className="filter-button"
                  alt="filter"
                  onClick={handleOpenDateRangeModal}
                />
              </div>
            </div>
          </div>
        </div>
        <Dialog
          open={dataRangeModalOpen}
          onClose={handleCloseDataRangeModal}
          PaperProps={{
            sx: {
              backgroundColor: "#EBEBEB",
              borderRadius: "5vw",
            },
          }}
        >
          <DialogTitle sx={{ textAlign: "center" }}>
            Choose Date Range
            <IconButton
              aria-label="close"
              onClick={handleCloseDataRangeModal}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <DatePicker
              margin="dense"
              fullWidth
              label="From Date"
              value={fromDateValue}
              onChange={(newValue) => setFromDateValue(newValue)}
              sx={{
                marginTop: "1vh",
                width: "100%",
                "& .MuiInputBase-root": {
                  backgroundColor: "white",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "5px",
                },
              }}
            />
            <DatePicker
              margin="dense"
              fullWidth
              label="To Date"
              value={toDateValue}
              onChange={(newValue) => setToDateValue(newValue)}
              sx={{
                marginTop: "1vh",
                width: "100%",
                "& .MuiInputBase-root": {
                  backgroundColor: "white",
                },
                "& .MuiOutlinedInput-root": {
                  borderRadius: "5px",
                },
              }}
            />
          </DialogContent>
          <DialogActions
            sx={{ justifyContent: "center", marginBottom: "1.5vh", gap: "2vw" }}
          >
            <Button
              onClick={filterNotificationsByDateRange}
              color="success"
              variant="contained"
            >
              Confirm
            </Button>
            <Button onClick={revertFilter} color="warning" variant="contained">
              Revert
            </Button>
          </DialogActions>
        </Dialog>
        <div className="notification-list">
          {todayNotifications.length > 0 && (
            <>
              <h2>Today</h2>
              {todayNotifications.map((notification, index) => (
                <div
                  key={index}
                  className={`notification-item ${
                    notification.read
                      ? "notification-read"
                      : "notification-unread"
                  }`}
                >
                  <div className="notification-item-left">
                    <p>{notification.message}</p>
                    <span>{formatDateTime(notification.timestamp)}</span>
                  </div>
                  <div className="notification-item-right">
                    <button
                      className="Delete"
                      onClick={() => deleteNotification(notification)}
                    ></button>
                  </div>
                </div>
              ))}
            </>
          )}
          {yesterdayNotifications.length > 0 && (
            <>
              <h2>Yesterday</h2>
              {yesterdayNotifications.map((notification, index) => (
                <div
                  key={index}
                  className={`notification-item ${
                    notification.read
                      ? "notification-read"
                      : "notification-unread"
                  }`}
                >
                  <div className="notification-item-left">
                    <p>{notification.message}</p>
                    <span>{formatDateTime(notification.timestamp)}</span>
                  </div>
                  <div className="notification-item-right">
                    <button
                      className="Delete"
                      onClick={() => deleteNotification(notification)}
                    ></button>
                  </div>
                </div>
              ))}
            </>
          )}
          {earlierNotifications.length > 0 && (
            <>
              <h2>Earlier</h2>
              {earlierNotifications.map((notification, index) => (
                <div
                  key={index}
                  className={`notification-item ${
                    notification.read
                      ? "notification-read"
                      : "notification-unread"
                  }`}
                >
                  <div className="notification-item-left">
                    <p>{notification.message}</p>
                    <span>{formatDateTime(notification.timestamp)}</span>
                  </div>
                  <div className="notification-item-right">
                    <button
                      className="Delete"
                      onClick={() => deleteNotification(notification)}
                    ></button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default NotificationPage;
