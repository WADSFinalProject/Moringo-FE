import React, { useState, useEffect } from "react";
import "../styles/XYZMain.css";
import Arrow from "../../Assets/Arrow.svg";
import Bell from "../../Assets/Bell.svg";
import Bell2 from "../../Assets/BellTemp.svg";
import Ship from "../../Assets/Shipment.svg";
import Details from "../../Assets/Details.svg";
import ProfilePictureMini from "../../Assets/modules/ProfilePictureMini.jsx";

const fetchXYZShipment = () => {
  return Promise.resolve([
    {
      shipmentid: "299999",
      courier: "Pos Indonesia",
      date: "23/03/2024",
      weight: "16.05",
      packages: "2",
      status: "Arrived",
    },
    {
      shipmentid: "300000",
      courier: "Pos Indonesia",
      date: "23/03/2024",
      weight: "27.00",
      packages: "3",
      status: "Arrived",
    },
    {
      shipmentid: "300001",
      courier: "JNE",
      date: "23/03/2024",
      weight: "14.25",
      packages: "2",
      status: "OTW",
    },
    {
      shipmentid: "300002",
      courier: "Ninja Logistics",
      date: "24/03/2024",
      weight: "12.00",
      packages: "1",
      status: "Pending",
    },
  ]);
};

const XYZManageShipment = ({ onNavigate }) => {
  const [xyzShipment, setXYZShipment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentSortKey, setCurrentSortKey] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [shipmentDate, setShipmentDate] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedStatus, setSelectedStatus] = useState("All");

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchXYZShipment().then((data) => setXYZShipment(data));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredShipment = xyzShipment.filter(
    (shipment) =>
      shipment.shipmentid.includes(searchTerm) &&
      (selectedStatus === "All" || shipment.status === selectedStatus)
  );

  const getShipmentClass = (shipmentStatus) => {
    switch (shipmentStatus) {
      case "Arrived":
        return "shipment-status-arrived";
      case "OTW":
        return "shipment-status-otw";
      case "Pending":
        return "shipment-status-pending";
      default:
        return "";
    }
  };

  const parseCustomDate = (datePart) => {
    const [day, month, year] = datePart.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  const formatWeight = (value) => {
    return parseFloat(value).toFixed(2);
  };

  const handleSort = (shipmentList, sortKey) => {
    const sortFunction = (a, b) => {
      let valueA, valueB;
      if (sortKey === "date") {
        valueA = parseCustomDate(a[sortKey]);
        valueB = parseCustomDate(b[sortKey]);
      } else {
        valueA = parseFloat(a[sortKey]) || a[sortKey];
        valueB = parseFloat(b[sortKey]) || b[sortKey];
      }

      if (valueA instanceof Date && valueB instanceof Date) {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      } else if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      } else {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      }
    };

    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    setCurrentSortKey(sortKey);
    setXYZShipment((prev) => [...prev].sort(sortFunction));
  };

  const getArrow = (sortKey) => {
    return sortKey === currentSortKey ? (sortOrder === "asc" ? "↑" : "↓") : "";
  };

  const handleEdit = (shipment) => {
    setSelectedShipment(shipment);
    setIsEditMode(true);
    const [day, month, year] = shipment.date.split("/");
    setShipmentDate(`${year}-${month}-${day}`);
  };

  const handleBack = () => {
    setIsEditMode(false);
    setSelectedShipment(null);
    setShipmentDate("");
  };

  const handleDelete = () => {
    setXYZShipment((prev) =>
      prev.filter(
        (shipment) => shipment.shipmentid !== selectedShipment.shipmentid
      )
    );
    handleBack();
  };

  const renderMobileCards = () => {
    return filteredShipment.map((shipment, index) => (
      <div className="card-wrapper" key={index}>
        <div className="card-header">
          <div>
            <div className="card-title">Shipment ID: </div>
            <div className="card-subtitle">{shipment.shipmentid}</div>
          </div>
          <button
            className="accept-button xyz mobile"
            onClick={() => handleEdit(shipment)}
          >
            <img src={Details} />
          </button>
        </div>
        <div className="card-content">
          <div className="card-description">
            <span style={{ minWidth: "100px" }}>Courier</span>
            <span style={{ minWidth: "5px", padding: "0px 10px" }}>:</span>
            <span className="card-temp">{shipment.courier}</span>
          </div>
          <div className="card-description">
            <span style={{ minWidth: "100px" }}>Date</span>
            <span style={{ minWidth: "5px", padding: "0px 10px" }}>:</span>
            <span className="card-temp">{shipment.date}</span>
          </div>
          <div className="card-description">
            <span style={{ minWidth: "100px" }}>Weight</span>
            <span style={{ minWidth: "5px", padding: "0px 10px" }}>:</span>
            <span className="card-temp">{shipment.weight} Kg</span>
          </div>
          <div className="card-description">
            <span style={{ minWidth: "100px" }}>Packages</span>
            <span style={{ minWidth: "5px", padding: "0px 10px" }}>:</span>
            <span className="card-temp">{shipment.packages}</span>
          </div>
          <div className="card-description">
            <span style={{ minWidth: "100px" }}>Status</span>
            <span style={{ minWidth: "5px", padding: "0px 10px" }}>:</span>
            <span className="card-temp">
              <span className={getShipmentClass(shipment.status)}>
                {shipment.status}
              </span>
            </span>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="p-container">
      <div className="top">
        <button
          className="back-arrow-container"
          style={{
            marginRight: "5px",
            backgroundColor: "transparent",
            borderColor: "transparent",
          }}
          onClick={() => onNavigate("dashboard")}
        >
          <img src={Arrow} className="back-arrow" />
        </button>
        <div className="a-title">Manage Shipments</div>
        <div className="time-detail">
          <div className="text">Last Data Refresh at: </div>
          <div className="time">25 March 2024 ~ 10:30 PM</div>
        </div>
        <div className="profile-detail-temp">
          <button
            style={{
              marginRight: "5px",
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
            onClick={() => onNavigate("notification")}
          >
            {windowWidth <= 560 ? (
              <img src={Bell2} className="notif-bell" />
            ) : (
              <img src={Bell} className="notif-bell" />
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
          <img src={Ship} className="top-secondary-img" />
          <div className="top-secondary-title">Manage Shipments</div>
        </div>
      ) : null}
      <div className="p-bottom">
        {isEditMode ? (
          <div className="b-edit-mode-container">
            <div className="b-edit-mode-title">
              <button className="back-button" onClick={handleBack}>
                <img src={Arrow} />
              </button>
              <div className="b-edit-mode-text">
                <div className="b-edit-mode-text-subtitle">
                  Detail of Shipment ID:
                </div>
                <div className="b-edit-mode-text-title">
                  {selectedShipment.shipmentid}
                </div>
              </div>
            </div>
            <div className="b-edit-mode-content">
              {windowWidth <= 560 ? (
                <>
                  <div className="b-edit-mode-grid" style={{ gap: "0px" }}>
                    <div className="card-wrapper xyz">
                      <div className="card-header">
                        <div className="card-subtitle">
                          ID {selectedShipment.shipmentid}
                        </div>
                        <div className="card-title xyz">
                          Weight: {selectedShipment.weight} Kg
                        </div>
                      </div>
                      <div className="card-content xyz">
                        <div className="card-description">
                          Received on: {selectedShipment.date}
                        </div>
                        <div className="card-description xyz">
                          Courier: {selectedShipment.courier}
                        </div>
                      </div>
                    </div>
                    <div className="card-wrapper xyz">
                      <div className="card-content xyz">
                        <div className="state-icons column">
                          <div
                            className={`state-icon1 ${
                              selectedShipment.status === "Pending" ||
                              selectedShipment.status === "OTW" ||
                              selectedShipment.status === "Arrived"
                                ? "on"
                                : ""
                            }`}
                          >
                            <span className="state-text-m">Pending </span>
                          </div>
                          <div
                            className={`state-icon-conn ${
                              selectedShipment.status === "OTW" ||
                              selectedShipment.status === "Arrived"
                                ? "on"
                                : ""
                            }`}
                          />
                          <div
                            className={`state-icon2 ${
                              selectedShipment.status === "OTW" ||
                              selectedShipment.status === "Arrived"
                                ? "on"
                                : ""
                            }`}
                          >
                            <span className="state-text-m">OTW </span>
                          </div>
                          <div
                            className={`state-icon-conn ${
                              selectedShipment.status === "Arrived" ? "on" : ""
                            }`}
                          />
                          <div
                            className={`state-icon3 ${
                              selectedShipment.status === "Arrived" ? "on" : ""
                            }`}
                          >
                            <span className="state-text-m">Arrived </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="b-edit-mode-bottom">
                    <button
                      className="b-confirm-button notify-xyz"
                      onClick={() => alert("NOTIFY HARBOR OR SMTHING")}
                      disabled={selectedShipment.status !== "Arrived"}
                    >
                      Notify Harbor
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="map-display">Map goes here</div>
                  <div
                    className="p-table-wrapper"
                    style={{ overflow: "hidden", flexGrow: "0" }}
                  >
                    <table className="p-table-container">
                      <thead>
                        <tr>
                          <th style={{ width: "15%" }}>ID</th>
                          <th
                            className="courier-column"
                            style={{ width: "15%" }}
                          >
                            Courier
                          </th>
                          <th className="date-column" style={{ width: "15%" }}>
                            Date
                          </th>
                          <th
                            className="weight-column"
                            style={{ width: "15%" }}
                          >
                            Weight (Kg)
                          </th>
                          <th style={{ width: "15%" }}>Packages</th>
                          <th style={{ width: "15%" }}>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{selectedShipment.shipmentid}</td>
                          <td className="courier-column">
                            {selectedShipment.courier}
                          </td>
                          <td className="date-column">
                            {selectedShipment.date}
                          </td>
                          <td className="weight-column">
                            {selectedShipment.weight}
                          </td>
                          <td>{selectedShipment.packages}</td>
                          <td style={{ textAlign: "-webkit-center" }}>
                            <span
                              className={getShipmentClass(
                                selectedShipment.status
                              )}
                            >
                              {selectedShipment.status}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="state-icons row">
                    <div
                      className={`state-icon1 ${
                        selectedShipment.status === "Pending" ||
                        selectedShipment.status === "OTW" ||
                        selectedShipment.status === "Arrived"
                          ? "on"
                          : ""
                      }`}
                    >
                      Pending
                    </div>
                    <div
                      className={`state-icon-conn ${
                        selectedShipment.status === "OTW" ||
                        selectedShipment.status === "Arrived"
                          ? "on"
                          : ""
                      }`}
                    />
                    <div
                      className={`state-icon2 ${
                        selectedShipment.status === "OTW" ||
                        selectedShipment.status === "Arrived"
                          ? "on"
                          : ""
                      }`}
                    >
                      OTW
                    </div>
                    <div
                      className={`state-icon-conn ${
                        selectedShipment.status === "Arrived" ? "on" : ""
                      }`}
                    />
                    <div
                      className={`state-icon3 ${
                        selectedShipment.status === "Arrived" ? "on" : ""
                      }`}
                    >
                      Arrived
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ) : windowWidth <= 560 ? (
          <div>
            <div className="search-nav">
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearch}
                className="p-searchbar"
                placeholder=" Search ID..."
              />
              <div className="search-dropdown-wrapper">
                <select
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className="search-dropdown"
                >
                  <option value="All">All</option>
                  <option value="Arrived">Arrived</option>
                  <option value="OTW">OTW</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
            <div className="mobile-content m-extend fade-in-left">
              {renderMobileCards()}
            </div>
          </div>
        ) : (
          <div style={{ height: "inherit" }}>
            <div
              className="p-tab active"
              style={{ width: "99%", margin: "auto" }}
            >
              Manage XYZ Shipments
              <div className="p-tab-line" />
            </div>
            <div className="p-bottom-container">
              <div className="p-bottom-container-content fade-in-left">
                <div className="search-nav">
                  <input
                    type="search"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="p-searchbar"
                    placeholder=" Search Username..."
                  />
                  <div className="search-dropdown-wrapper">
                    <select
                      value={selectedStatus}
                      onChange={handleStatusChange}
                      className="search-dropdown"
                    >
                      <option value="All">All</option>
                      <option value="Arrived">Arrived</option>
                      <option value="OTW">OTW</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </div>
                </div>
                <div className="p-table-wrapper">
                  <div style={{ width: "calc(100% - 9px)" }}>
                    <table className="p-table-container">
                      <thead>
                        <tr>
                          <th
                            style={{
                              width: "13%",
                            }}
                            onClick={() =>
                              handleSort(filteredShipment, "shipmentid")
                            }
                          >
                            ID {getArrow("shipmentid")}
                          </th>
                          <th
                            className="courier-column"
                            style={{ width: "21%" }}
                            onClick={() =>
                              handleSort(filteredShipment, "courier")
                            }
                          >
                            Courier {getArrow("courier")}
                          </th>
                          <th
                            className="date-column"
                            style={{ width: "17%" }}
                            onClick={() => handleSort(filteredShipment, "date")}
                          >
                            Date {getArrow("date")}
                          </th>
                          <th
                            className="weight-column"
                            style={{ width: "14.5%" }}
                            onClick={() =>
                              handleSort(filteredShipment, "weight")
                            }
                          >
                            Weight (Kg) {getArrow("weight")}
                          </th>
                          <th
                            style={{ width: "12.5%" }}
                            onClick={() =>
                              handleSort(filteredShipment, "packages")
                            }
                          >
                            Packages {getArrow("packages")}
                          </th>
                          <th
                            style={{ width: "15%" }}
                            onClick={() =>
                              handleSort(filteredShipment, "status")
                            }
                          >
                            Status {getArrow("status")}
                          </th>
                          <th style={{ width: "8%" }}> </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredShipment.map((shipment, index) => (
                          <tr key={index}>
                            <td>{shipment.shipmentid}</td>
                            <td className="courier-column">
                              {shipment.courier}
                            </td>
                            <td className="date-column">{shipment.date}</td>
                            <td className="weight-column">{shipment.weight}</td>
                            <td>{shipment.packages}</td>
                            <td>
                              <span
                                className={getShipmentClass(shipment.status)}
                              >
                                {shipment.status}
                              </span>
                            </td>
                            <td>
                              <button
                                className="accept-button xyz"
                                onClick={() => handleEdit(shipment)}
                              >
                                <img src={Details} />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default XYZManageShipment;
