import React, { useState, useEffect } from "react";
import "../styles/AdminManaging.css";
import Arrow from "../../Assets/Arrow.svg";
import Bell from "../../Assets/Bell.svg";
import Bell2 from "../../Assets/BellTemp.svg";
import Ship from "../../Assets/Shipment.svg";
import Edit from "../../Assets/Edit.svg";
import ProfilePictureMini from "../../Assets/modules/ProfilePictureMini.jsx";

const fetchAllShipment = () => {
  return new Promise((resolve) => {
    const allShipment = [
      {
        shipmentid: "99999",
        courier: "J&T Express",
        date: "24/03/2024",
        weight: "21.00",
        packages: "2",
        status: "Pending",
      },
      {
        shipmentid: "100000",
        courier: "Ninja Logistics",
        date: "24/03/2024",
        weight: "27.80",
        packages: "3",
        status: "Arrived",
      },
      {
        shipmentid: "100001",
        courier: "JNE",
        date: "25/03/2024",
        weight: "19.90",
        packages: "2",
        status: "OTW",
      },
      {
        shipmentid: "100002",
        courier: "Pos Indonesia",
        date: "26/03/2024",
        weight: "35.00",
        packages: "4",
        status: "Pending",
      },
    ];
    resolve(allShipment);
  });
};

const fetchHarborShipment = () => {
  return new Promise((resolve) => {
    const harborShipment = [
      {
        shipmentid: "199999",
        courier: "J&T Express",
        date: "23/03/2024",
        weight: "18.10",
        packages: "2",
        status: "Arrived",
      },
      {
        shipmentid: "200000",
        courier: "Ninja Logistics",
        date: "23/03/2024",
        weight: "29.20",
        packages: "3",
        status: "Arrived",
      },
      {
        shipmentid: "200001",
        courier: "JNE",
        date: "23/03/2024",
        weight: "24.85",
        packages: "3",
        status: "OTW",
      },
      {
        shipmentid: "200002",
        courier: "Ninja Logistics",
        date: "24/03/2024",
        weight: "49.05",
        packages: "5",
        status: "Pending",
      },
    ];
    resolve(harborShipment);
  });
};

const fetchXYZShipment = () => {
  return new Promise((resolve) => {
    const xyzShipment = [
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
        status: "Arrived",
      },
      {
        shipmentid: "300002",
        courier: "Ninja Logistics",
        date: "24/03/2024",
        weight: "12.00",
        packages: "1",
        status: "Pending",
      },
    ];
    resolve(xyzShipment);
  });
};

const ManageShipment = ({ onNavigate }) => {
  const [allShipment, setAllShipment] = useState([]);
  const [harborShipment, setHarborShipment] = useState([]);
  const [xyzShipment, setXYZShipment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("manageShip1");
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
    fetchAllShipment().then((data) => setAllShipment(data));
    fetchHarborShipment().then((data) => setHarborShipment(data));
    fetchXYZShipment().then((data) => setXYZShipment(data));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredShipment = (allShipment) => {
    return allShipment.filter((shipment) => {
      return (
        shipment.shipmentid.includes(searchTerm) &&
        (selectedStatus === "All" || shipment.status === selectedStatus)
      );
    });
  };

  const handleTabChange = (tab) => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentTab(tab);
      setIsVisible(true);
    }, 75);
  };

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
      } else if (
        sortKey === "shipmentid" ||
        sortKey === "weight" ||
        sortKey === "packages"
      ) {
        valueA = parseFloat(a[sortKey]);
        valueB = parseFloat(b[sortKey]);
      } else if (sortKey === "status" || sortKey === "courier") {
        valueA = a[sortKey];
        valueB = b[sortKey];
      } else {
        valueA = a[sortKey];
        valueB = b[sortKey];
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

    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setCurrentSortKey(sortKey);

    let sortedShipment = [];
    switch (shipmentList) {
      case "all":
        sortedShipment = [...allShipment].sort(sortFunction);
        setAllShipment(sortedShipment);
        break;
      case "harbor":
        sortedShipment = [...harborShipment].sort(sortFunction);
        setHarborShipment(sortedShipment);
        break;
      case "xyz":
        sortedShipment = [...xyzShipment].sort(sortFunction);
        setXYZShipment(sortedShipment);
        break;
      default:
        console.log("FAILED");
    }
  };

  const getArrow = (sortKey) => {
    if (sortKey === currentSortKey) {
      return sortOrder === "asc" ? "↑" : "↓";
    }
    return "";
  };

  const getSortType = () => {
    if (currentTab === "manageShip1") return "all";
    if (currentTab === "manageShip2") return "harbor";
    if (currentTab === "manageShip3") return "xyz";
  };

  const getCurrentShipment = () => {
    if (currentTab === "manageShip1") return filteredShipment(allShipment);
    if (currentTab === "manageShip2") return filteredShipment(harborShipment);
    if (currentTab === "manageShip3") return filteredShipment(xyzShipment);
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

  const handleConfirmEdit = () => {
    const [year, month, day] = shipmentDate.split("-");
    const updatedShipment = {
      ...selectedShipment,
      date: `${day}/${month}/${year}`,
      weight: formatWeight(selectedShipment.weight),
    };

    const shipmentList = getSortType();
    switch (shipmentList) {
      case "all":
        setAllShipment((prevShipment) =>
          prevShipment.map((shipment) =>
            shipment.shipmentid === selectedShipment.shipmentid
              ? updatedShipment
              : shipment
          )
        );
        break;
      case "harbor":
        setHarborShipment((prevShipment) =>
          prevShipment.map((shipment) =>
            shipment.shipmentid === selectedShipment.shipmentid
              ? updatedShipment
              : shipment
          )
        );
        break;
      case "xyz":
        setXYZShipment((prevShipment) =>
          prevShipment.map((shipment) =>
            shipment.shipmentid === selectedShipment.shipmentid
              ? updatedShipment
              : shipment
          )
        );
        break;
      default:
        break;
    }
    handleBack();
  };

  const handleDelete = () => {
    const shipmentList = getSortType();
    switch (shipmentList) {
      case "all":
        setAllShipment((prevShipment) =>
          prevShipment.filter(
            (shipment) => shipment.shipmentid !== selectedShipment.shipmentid
          )
        );
        break;
      case "harbor":
        setHarborShipment((prevShipment) =>
          prevShipment.filter(
            (shipment) => shipment.shipmentid !== selectedShipment.shipmentid
          )
        );
        break;
      case "xyz":
        setXYZShipment((prevShipment) =>
          prevShipment.filter(
            (shipment) => shipment.shipmentid !== selectedShipment.shipmentid
          )
        );
        break;
      default:
        break;
    }
    handleBack();
  };

  const isInputFilled = (value) => {
    return value ? "b-edit-mode-input filled" : "b-edit-mode-input";
  };

  const isFormFilled = () => {
    return (
      selectedShipment.shipmentid &&
      selectedShipment.courier &&
      selectedShipment.date &&
      selectedShipment.weight &&
      selectedShipment.packages &&
      selectedShipment.status
    );
  };

  const renderMobileCards = () => {
    return getCurrentShipment().map((shipment, index) => (
      <div className="card-wrapper" key={index}>
        <div className="card-header">
          <div>
            <div className="card-title">Shipment ID: </div>
            <div className="card-subtitle">{shipment.shipmentid}</div>
          </div>
          <button
            style={{
              marginRight: "5px",
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
            onClick={() => handleEdit(shipment)}
          >
            <img src={Edit} className="card-edit" />
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
        <div className="a-title">Manage Shipment</div>
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
        <div>
          <div className="top-secondary">
            <img src={Ship} className="top-secondary-img" />
            <div className="top-secondary-title">Manage Shipment</div>
          </div>
          {isEditMode ? null : (
            <div className="tertiary-dropdown-wrapper">
              <select
                className="tertiary-dropdown"
                value={currentTab}
                onChange={(e) => handleTabChange(e.target.value)}
              >
                <option value="manageShip1">All Shipment</option>
                <option value="manageShip2">Harbor</option>
                <option value="manageShip3">XYZ</option>
              </select>
            </div>
          )}
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
                  Editing Shipment ID:
                </div>
                <div className="b-edit-mode-text-title">
                  {selectedShipment.shipmentid}
                </div>
              </div>
            </div>
            <div className="b-edit-mode-content">
              <div className="b-edit-mode-grid">
                Courier:
                <div className="select-dropdown">
                  <select
                    value={selectedShipment.courier}
                    onChange={(e) =>
                      setSelectedShipment({
                        ...selectedShipment,
                        courier: e.target.value,
                      })
                    }
                  >
                    <option value="JNE">JNE</option>
                    <option value="J&T Express">J&T Express</option>
                    <option value="Ninja Logistics">Ninja Logistics</option>
                    <option value="Pos Indonesia">Pos Indonesia</option>
                  </select>
                </div>
                Shipment Date:
                <input
                  type="date"
                  className={isInputFilled(shipmentDate)}
                  value={shipmentDate}
                  onChange={(e) => setShipmentDate(e.target.value)}
                />
                Package Weight:
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  className={`${isInputFilled(selectedShipment.weight)}`}
                  value={selectedShipment.weight}
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      weight: e.target.value,
                    })
                  }
                />
                Packages:
                <input
                  type="number"
                  step="1"
                  min="1"
                  className={`${isInputFilled(selectedShipment.packages)}`}
                  value={selectedShipment.packages}
                  onChange={(e) =>
                    setSelectedShipment({
                      ...selectedShipment,
                      packages: Math.max(1, parseInt(e.target.value, 10) || 1),
                    })
                  }
                />
                Shiping Status:
                <div className="select-dropdown">
                  <select
                    value={selectedShipment.status}
                    onChange={(e) =>
                      setSelectedShipment({
                        ...selectedShipment,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="Arrived">Arrived</option>
                    <option value="OTW">OTW</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
              <div className="b-edit-mode-bottom">
                <button
                  className="b-confirm-button"
                  onClick={handleConfirmEdit}
                  disabled={!isFormFilled()}
                >
                  Save Changes
                </button>
                <button className="b-delete-button" onClick={handleDelete}>
                  Delete Shipment
                </button>
              </div>
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
            <div
              className={`mobile-content ${
                isVisible ? "fade-in-left" : "fade-out-left"
              }`}
            >
              {renderMobileCards()}
            </div>
          </div>
        ) : (
          <div style={{ height: "inherit" }}>
            <div className="p-tabs">
              <a
                href="#"
                className={
                  currentTab === "manageShip1" ? "p-tab active" : "p-tab"
                }
                onClick={() => handleTabChange("manageShip1")}
              >
                All Shipment
                <div className="p-tab-line" />
              </a>
              <a
                href="#"
                className={
                  currentTab === "manageShip2" ? "p-tab active" : "p-tab"
                }
                onClick={() => handleTabChange("manageShip2")}
              >
                Harbor
                <div className="p-tab-line" />
              </a>
              <a
                href="#"
                className={
                  currentTab === "manageShip3" ? "p-tab active" : "p-tab"
                }
                onClick={() => handleTabChange("manageShip3")}
              >
                XYZ
                <div className="p-tab-line" />
              </a>
            </div>
            <div className="p-bottom-container">
              {(currentTab === "manageShip1" ||
                currentTab === "manageShip2" ||
                currentTab === "manageShip3") && (
                <div
                  className={`p-bottom-container-content ${
                    isVisible ? "fade-in-left" : "fade-out-left"
                  }`}
                >
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
                                handleSort(getSortType(), "shipmentid")
                              }
                            >
                              ID {getArrow("shipmentid")}
                            </th>
                            <th
                              className="courier-column"
                              style={{ width: "21%" }}
                              onClick={() =>
                                handleSort(getSortType(), "courier")
                              }
                            >
                              Courier {getArrow("courier")}
                            </th>
                            <th
                              className="date-column"
                              style={{ width: "17%" }}
                              onClick={() => handleSort(getSortType(), "date")}
                            >
                              Date {getArrow("date")}
                            </th>
                            <th
                              className="weight-column"
                              style={{ width: "14.5%" }}
                              onClick={() =>
                                handleSort(getSortType(), "weight")
                              }
                            >
                              Weight {"(Kg)"} {getArrow("weight")}
                            </th>
                            <th
                              style={{ width: "12.5%" }}
                              onClick={() =>
                                handleSort(getSortType(), "packages")
                              }
                            >
                              Packages {getArrow("packages")}
                            </th>
                            <th
                              style={{ width: "15%" }}
                              onClick={() =>
                                handleSort(getSortType(), "status")
                              }
                            >
                              Status {getArrow("status")}
                            </th>
                            <th style={{ width: "8%" }}> </th>
                          </tr>
                        </thead>
                        <tbody>
                          {getCurrentShipment().map((shipment, index) => (
                            <tr key={index}>
                              <td>{shipment.shipmentid}</td>
                              <td className="courier-column">
                                {shipment.courier}
                              </td>
                              <td className="date-column">{shipment.date}</td>
                              <td className="weight-column">
                                {shipment.weight}
                              </td>
                              <td>{shipment.packages}</td>
                              <td padding>
                                <span
                                  className={getShipmentClass(shipment.status)}
                                >
                                  {shipment.status}
                                </span>
                              </td>
                              <td>
                                <button
                                  className="edit-button"
                                  onClick={() => handleEdit(shipment)}
                                >
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageShipment;
