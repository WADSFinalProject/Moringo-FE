import React, { useState, useEffect } from "react";
import "../styles/AdminManaging.css";
import Arrow from "../../Assets/Arrow.svg";
import Bell from "../../Assets/Bell.svg";
import Bell2 from "../../Assets/BellTemp.svg";
import Batch from "../../Assets/Batches.svg";
import Edit from "../../Assets/Edit.svg";
import ProfilePictureMini from "../../Assets/modules/ProfilePictureMini.jsx";

const fetchWetBatches = () => {
  return new Promise((resolve) => {
    const wetBatches = [
      {
        batchid: "999",
        weight: "5.00",
        manufacture: "24/03/2024 17:00",
        expiry: "24/03/2024 21:00",
        status: "Expired",
      },
      {
        batchid: "1000",
        weight: "20.00",
        manufacture: "25/03/2024 17:00",
        expiry: "25/03/2024 21:00",
        status: "Processed",
      },
      {
        batchid: "1001",
        weight: "10.00",
        manufacture: "25/03/2024 17:30",
        expiry: "25/03/2024 21:30",
        status: "Processed",
      },
      {
        batchid: "1002",
        weight: "10.50",
        manufacture: "26/03/2024 18:30",
        expiry: "26/03/2024 22:30",
        status: "Unprocessed",
      },
    ];
    resolve(wetBatches);
  });
};

const fetchDryBatches = () => {
  return new Promise((resolve) => {
    const dryBatches = [
      {
        batchid: "1999",
        weight: "9.00",
        manufacture: "10/03/2024 23:00",
        expiry: "24/03/2024 23:00",
        status: "Expired",
      },
      {
        batchid: "2000",
        weight: "9.10",
        manufacture: "13/03/2024 11:00",
        expiry: "27/03/2024 11:00",
        status: "Processed",
      },
      {
        batchid: "2001",
        weight: "9.05",
        manufacture: "14/03/2024 17:30",
        expiry: "28/03/2024 17:30",
        status: "Processed",
      },
      {
        batchid: "2002",
        weight: "8.90",
        manufacture: "16/03/2024 10:30",
        expiry: "30/03/2024 10:30",
        status: "Unprocessed",
      },
    ];
    resolve(dryBatches);
  });
};

const fetchPowderBatches = () => {
  return new Promise((resolve) => {
    const powderBatches = [
      {
        batchid: "2999",
        weight: "27.00",
        manufacture: "24/02/2024 23:00",
        expiry: "24/03/2024 23:00",
        status: "Expired",
      },
      {
        batchid: "3000",
        weight: "26.10",
        manufacture: "30/02/2024 19:00",
        expiry: "30/03/2024 19:00",
        status: "Processed",
      },
      {
        batchid: "3001",
        weight: "28.05",
        manufacture: "07/03/2024 17:30",
        expiry: "07/04/2024 17:30",
        status: "Processed",
      },
      {
        batchid: "3002",
        weight: "28.90",
        manufacture: "15/03/2024 19:00",
        expiry: "15/04/2024 19:00",
        status: "Unprocessed",
      },
    ];
    resolve(powderBatches);
  });
};

const ManageBatches = ({ onNavigate }) => {
  const [wetBatches, setWetBatches] = useState([]);
  const [dryBatches, setDryBatches] = useState([]);
  const [powderBatches, setPowderBatches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("manageBatch1");
  const [isVisible, setIsVisible] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentSortKey, setCurrentSortKey] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(null);
  const [manufactureDate, setManufactureDate] = useState("");
  const [manufactureTime, setManufactureTime] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
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
    fetchWetBatches().then((data) => setWetBatches(data));
    fetchDryBatches().then((data) => setDryBatches(data));
    fetchPowderBatches().then((data) => setPowderBatches(data));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredBatches = (batches) => {
    return batches.filter((batch) => {
      return (
        batch.batchid.includes(searchTerm) &&
        (selectedStatus === "All" || batch.status === selectedStatus)
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

  const getBatchClass = (batchType) => {
    switch (batchType) {
      case "Processed":
        return "batch-type-processed";
      case "Unprocessed":
        return "batch-type-unprocessed";
      case "Expired":
        return "batch-type-expired";
      default:
        return "";
    }
  };

  const parseCustomDate = (dateString) => {
    const [datePart, timePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/");
    return new Date(`${year}-${month}-${day}T${timePart}:00`);
  };

  const formatWeight = (value) => {
    return parseFloat(value).toFixed(2);
  };

  const handleSort = (batchList, sortKey) => {
    const sortFunction = (a, b) => {
      let valueA, valueB;

      if (sortKey === "manufacture" || sortKey === "expiry") {
        valueA = parseCustomDate(a[sortKey]);
        valueB = parseCustomDate(b[sortKey]);
      } else if (sortKey === "batchid" || sortKey === "weight") {
        valueA = parseFloat(a[sortKey]);
        valueB = parseFloat(b[sortKey]);
      } else if (sortKey === "status") {
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

    let sortedBatch = [];
    switch (batchList) {
      case "wet":
        sortedBatch = [...wetBatches].sort(sortFunction);
        setWetBatches(sortedBatch);
        break;
      case "dry":
        sortedBatch = [...dryBatches].sort(sortFunction);
        setDryBatches(sortedBatch);
        break;
      case "powder":
        sortedBatch = [...powderBatches].sort(sortFunction);
        setPowderBatches(sortedBatch);
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
    if (currentTab === "manageBatch1") return "wet";
    if (currentTab === "manageBatch2") return "dry";
    if (currentTab === "manageBatch3") return "powder";
  };

  const getCurrentBatch = () => {
    if (currentTab === "manageBatch1") return filteredBatches(wetBatches);
    if (currentTab === "manageBatch2") return filteredBatches(dryBatches);
    if (currentTab === "manageBatch3") return filteredBatches(powderBatches);
  };

  const handleEdit = (batch) => {
    setSelectedBatch(batch);
    setIsEditMode(true);
    const [manufactureDatePart, manufactureTimePart] =
      batch.manufacture.split(" ");
    setManufactureDate(manufactureDatePart.split("/").reverse().join("-"));
    setManufactureTime(manufactureTimePart);
    const [expiryDatePart, expiryTimePart] = batch.expiry.split(" ");
    setExpiryDate(expiryDatePart.split("/").reverse().join("-"));
    setExpiryTime(expiryTimePart);
  };

  const handleBack = () => {
    setIsEditMode(false);
    setSelectedBatch(null);
    setManufactureDate("");
    setManufactureTime("");
    setExpiryDate("");
    setExpiryTime("");
  };

  const handleConfirmEdit = () => {
    const updatedManufacture = `${manufactureDate
      .split("-")
      .reverse()
      .join("/")} ${manufactureTime}`;

    const updatedExpiry = `${expiryDate
      .split("-")
      .reverse()
      .join("/")} ${expiryTime}`;

    const updatedBatch = {
      ...selectedBatch,
      weight: formatWeight(selectedBatch.weight),
      manufacture: updatedManufacture,
      expiry: updatedExpiry,
    };

    const batchList = getSortType();
    switch (batchList) {
      case "wet":
        setWetBatches((prevBatches) =>
          prevBatches.map((batch) =>
            batch.batchid === selectedBatch.batchid ? updatedBatch : batch
          )
        );
        break;
      case "dry":
        setDryBatches((prevBatches) =>
          prevBatches.map((batch) =>
            batch.batchid === selectedBatch.batchid ? updatedBatch : batch
          )
        );
        break;
      case "powder":
        setPowderBatches((prevBatches) =>
          prevBatches.map((batch) =>
            batch.batchid === selectedBatch.batchid ? updatedBatch : batch
          )
        );
        break;
      default:
        break;
    }
    handleBack();
  };

  const handleDelete = () => {
    const batchList = getSortType();
    switch (batchList) {
      case "wet":
        setWetBatches((prevBatches) =>
          prevBatches.filter((batch) => batch.batchid !== selectedBatch.batchid)
        );
        break;
      case "dry":
        setDryBatches((prevBatches) =>
          prevBatches.filter((batch) => batch.batchid !== selectedBatch.batchid)
        );
        break;
      case "powder":
        setPowderBatches((prevBatches) =>
          prevBatches.filter((batch) => batch.batchid !== selectedBatch.batchid)
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
      selectedBatch.batchid &&
      selectedBatch.weight &&
      selectedBatch.manufacture &&
      selectedBatch.expiry &&
      selectedBatch.status
    );
  };

  const renderMobileCards = () => {
    return getCurrentBatch().map((batch, index) => (
      <div className="card-wrapper" key={index}>
        <div className="card-header">
          <div>
            <div className="card-title">Batch ID: </div>
            <div className="card-subtitle">{batch.batchid}</div>
          </div>
          <button
            style={{
              marginRight: "5px",
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
            onClick={() => handleEdit(batch)}
          >
            <img src={Edit} className="card-edit" />
          </button>
        </div>
        <div className="card-content">
          <div className="card-description">
            <span style={{ minWidth: "100px" }}>Weight</span>
            <span style={{ minWidth: "5px", padding: "0px 10px" }}>:</span>
            <span className="card-temp">{batch.weight} Kg</span>
          </div>
          <div className="card-description">
            <span style={{ minWidth: "100px" }}>Manufactured</span>
            <span style={{ minWidth: "5px", padding: "0px 10px" }}>:</span>
            <span className="card-temp">{batch.manufacture}</span>
          </div>
          <div className="card-description">
            <span style={{ minWidth: "100px" }}>Expiry</span>
            <span style={{ minWidth: "5px", padding: "0px 10px" }}>:</span>
            <span className="card-temp">{batch.expiry}</span>
          </div>
          <div className="card-description">
            <span style={{ minWidth: "100px" }}>Status</span>
            <span style={{ minWidth: "5px", padding: "0px 10px" }}>:</span>
            <span className="card-temp">
              <span className={getBatchClass(batch.status)}>
                {batch.status}
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
        <div className="a-title">Manage Batches</div>
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
            <img src={Batch} className="top-secondary-img" />
            <div className="top-secondary-title">Manage Batches</div>
          </div>
          {isEditMode ? null : (
            <div className="tertiary-dropdown-wrapper">
              <select
                className="tertiary-dropdown"
                value={currentTab}
                onChange={(e) => handleTabChange(e.target.value)}
              >
                <option value="manageBatch1">Wet</option>
                <option value="manageBatch2">Dry</option>
                <option value="manageBatch3">Powder</option>
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
                  Editing Batch ID:
                </div>
                <div className="b-edit-mode-text-title">
                  {selectedBatch.batchid}
                </div>
              </div>
            </div>
            <div className="b-edit-mode-content">
              <div className="b-edit-mode-grid">
                Batch Weight:
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  className={`${isInputFilled(selectedBatch.weight)}`}
                  value={selectedBatch.weight}
                  onChange={(e) =>
                    setSelectedBatch({
                      ...selectedBatch,
                      weight: e.target.value,
                    })
                  }
                />
                Batch Manufacture:
                <div className="batch-edit-date">
                  <input
                    type="date"
                    style={{
                      width:
                        windowWidth <= 560 ? "-webkit-fill-available" : "41%",
                    }}
                    className={`${isInputFilled(selectedBatch.manufacture)}`}
                    value={manufactureDate}
                    onChange={(e) => setManufactureDate(e.target.value)}
                  />
                  <input
                    type="time"
                    style={{
                      width:
                        windowWidth <= 560 ? "-webkit-fill-available" : "41%",
                    }}
                    className={`${isInputFilled(selectedBatch.manufacture)}`}
                    value={manufactureTime}
                    onChange={(e) => setManufactureTime(e.target.value)}
                  />
                </div>
                Batch Expiry:
                <div className="batch-edit-date">
                  <input
                    type="date"
                    style={{
                      width:
                        windowWidth <= 560 ? "-webkit-fill-available" : "41%",
                    }}
                    className={`${isInputFilled(selectedBatch.expiry)}`}
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                  <input
                    type="time"
                    style={{
                      width:
                        windowWidth <= 560 ? "-webkit-fill-available" : "41%",
                    }}
                    className={`${isInputFilled(selectedBatch.expiry)}`}
                    value={expiryTime}
                    onChange={(e) => setExpiryTime(e.target.value)}
                  />
                </div>
                Batch Status:
                <div className="select-dropdown">
                  <select
                    value={selectedBatch.status}
                    onChange={(e) =>
                      setSelectedBatch({
                        ...selectedBatch,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="Expired">Expired</option>
                    <option value="Processed">Processed</option>
                    <option value="Unprocessed">Unprocessed</option>
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
                  Delete Batch
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
                  <option value="Expired">Expired</option>
                  <option value="Processed">Processed</option>
                  <option value="Unprocessed">Unprocessed</option>
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
                  currentTab === "manageBatch1" ? "p-tab active" : "p-tab"
                }
                onClick={() => handleTabChange("manageBatch1")}
              >
                Wet Leaves
                <div className="p-tab-line" />
              </a>
              <a
                href="#"
                className={
                  currentTab === "manageBatch2" ? "p-tab active" : "p-tab"
                }
                onClick={() => handleTabChange("manageBatch2")}
              >
                Dry Leaves
                <div className="p-tab-line" />
              </a>
              <a
                href="#"
                className={
                  currentTab === "manageBatch3" ? "p-tab active" : "p-tab"
                }
                onClick={() => handleTabChange("manageBatch3")}
              >
                Powder
                <div className="p-tab-line" />
              </a>
            </div>
            <div className="p-bottom-container">
              {(currentTab === "manageBatch1" ||
                currentTab === "manageBatch2" ||
                currentTab === "manageBatch3") && (
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
                        <option value="Expired">Expired</option>
                        <option value="Processed">Processed</option>
                        <option value="Unprocessed">Unprocessed</option>
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
                                width: "10%",
                              }}
                              onClick={() =>
                                handleSort(getSortType(), "batchid")
                              }
                            >
                              ID {getArrow("batchid")}
                            </th>
                            <th
                              className="weight2-column"
                              style={{ width: "13.5%" }}
                              onClick={() =>
                                handleSort(getSortType(), "weight")
                              }
                            >
                              Weight {"(Kg)"} {getArrow("weight")}
                            </th>
                            <th
                              className="manufacture-column"
                              style={{ width: "23.125%" }}
                              onClick={() =>
                                handleSort(getSortType(), "manufacture")
                              }
                            >
                              Manufacture {getArrow("manufacture")}
                            </th>
                            <th
                              style={{ width: "23.125%" }}
                              onClick={() =>
                                handleSort(getSortType(), "expiry")
                              }
                            >
                              Expiry {getArrow("expiry")}
                            </th>
                            <th
                              style={{ width: "16.5%" }}
                              onClick={() =>
                                handleSort(getSortType(), "status")
                              }
                            >
                              Status {getArrow("status")}
                            </th>
                            <th style={{ width: "8.25%" }}> </th>
                          </tr>
                        </thead>
                        <tbody>
                          {getCurrentBatch().map((batch, index) => (
                            <tr key={index}>
                              <td>{batch.batchid}</td>
                              <td className="weight2-column">{batch.weight}</td>
                              <td className="manufacture-column">
                                {batch.manufacture}
                              </td>
                              <td>{batch.expiry}</td>
                              <td>
                                <span className={getBatchClass(batch.status)}>
                                  {batch.status}
                                </span>
                              </td>
                              <td>
                                <button
                                  className="edit-button"
                                  onClick={() => handleEdit(batch)}
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

export default ManageBatches;
