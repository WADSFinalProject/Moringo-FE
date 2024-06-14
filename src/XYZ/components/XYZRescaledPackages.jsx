import React, { useState, useEffect } from "react";
import "../styles/XYZMain.css";
import Arrow from "../../Assets/Arrow.svg";
import Bell from "../../Assets/Bell.svg";
import Bell2 from "../../Assets/BellTemp.svg";
import User from "../../Assets/User.svg";
import ProfilePictureMini from "../../Assets/modules/ProfilePictureMini.jsx";

const fetchRescaledPackages = () => {
  return new Promise((resolve) => {
    const today = new Date();
    const formattedToday = `${String(today.getDate()).padStart(
      2,
      "0"
    )}/${String(today.getMonth() + 1).padStart(2, "0")}/${today.getFullYear()}`;
    const rescaledPackages = [
      {
        id: "300003",
        packages: [
          { packageId: "10007", weight: "10.00", rescaled: "Yes" },
          { packageId: "10008", weight: "11.50", rescaled: "Yes" },
        ],
        weight: "22.50",
        date: formattedToday,
      },
      {
        id: "300004",
        packages: [{ packageId: "10009", weight: "12.50", rescaled: "Yes" }],
        weight: "12.50",
        date: formattedToday,
      },
    ];
    resolve(rescaledPackages);
  });
};

const RescaledPackages = ({ onNavigate }) => {
  const [rescaledPackages, setRescaledPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentSortKey, setCurrentSortKey] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUnPackages, setSelectedUnPackages] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [selectedTimespan, setSelectedTimespan] = useState("All");
  const [selectedPackageIndex, setSelectedPackageIndex] = useState(null);
  const [originalWeight, setOriginalWeight] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupAnim, setIsPopupAnim] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchRescaledPackages().then((data) => setRescaledPackages(data));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTimespanChange = (event) => {
    setSelectedTimespan(event.target.value);
  };

  const parseCustomDate = (datePart) => {
    const [day, month, year] = datePart.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  const filterByTimespan = (rescaledPackages, timespan) => {
    const today = new Date();
    const todayMidnight = new Date(today.setHours(0, 0, 0, 0));
    const oneWeekAgo = new Date(todayMidnight);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const oneMonthAgo = new Date(todayMidnight);
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return rescaledPackages.filter((rescaledPackage) => {
      const packageDate = parseCustomDate(rescaledPackage.date);

      if (timespan === "All") return true;
      if (timespan === "Today") return packageDate >= todayMidnight;
      if (timespan === "1 Week") return packageDate >= oneWeekAgo;
      if (timespan === "1 Month") return packageDate >= oneMonthAgo;

      return false;
    });
  };

  const filteredRescaledPackages = filterByTimespan(
    rescaledPackages.filter((rescaledPackage) =>
      rescaledPackage.id.includes(searchTerm)
    ),
    selectedTimespan
  );

  const handleSort = (rescaledPackages, sortKey) => {
    const sortFunction = (a, b) => {
      let valueA, valueB;

      if (sortKey === "date") {
        valueA = parseCustomDate(a[sortKey]);
        valueB = parseCustomDate(b[sortKey]);
      } else if (sortKey === "id" || sortKey === "weight") {
        valueA = parseFloat(a[sortKey]);
        valueB = parseFloat(b[sortKey]);
      } else if (sortKey === "packages") {
        valueA = a.packages.length;
        valueB = b.packages.length;
      } else if (sortKey === "rescaled") {
        valueA = calculateRescaledStatus(a.packages);
        valueB = calculateRescaledStatus(b.packages);
        if (valueA === "Error") valueA = -1;
        if (valueB === "Error") valueB = -1;
        valueA = parseFloat(valueA) || valueA;
        valueB = parseFloat(valueB) || valueB;
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
    setRescaledPackages([...rescaledPackages].sort(sortFunction));
  };

  const getArrow = (sortKey) => {
    if (sortKey === currentSortKey) {
      return sortOrder === "asc" ? "↑" : "↓";
    }
    return "";
  };

  const handlePackageSelect = (index) => {
    setSelectedPackageIndex(index);
    setOriginalWeight(parseFloat(selectedUnPackages.packages[index].weight));
  };

  const handleEdit = (unscaledPackage) => {
    setSelectedUnPackages(unscaledPackage);
    setIsEditMode(true);
  };

  const handleClosePopup = () => {
    setIsPopupAnim(true);
    setTimeout(() => {
      setIsPopupOpen(false);
      setIsPopupAnim(false);
    }, 75);
  };

  const isInputFilled = (value) => {
    return value ? "b-edit-mode-input filled" : "b-edit-mode-input";
  };

  const handleConfirmRescale = () => {
    const packageToUpdate = selectedUnPackages.packages[selectedPackageIndex];
    const newWeight = parseFloat(
      selectedUnPackages.packages[selectedPackageIndex].weight
    );

    if (Math.abs(newWeight - originalWeight) <= 1) {
      const updatedPackages = [...selectedUnPackages.packages];
      updatedPackages[selectedPackageIndex] = {
        ...packageToUpdate,
        rescaled: "Yes",
        weight: originalWeight.toFixed(2),
      };
      setSelectedUnPackages((prev) => ({
        ...prev,
        packages: updatedPackages,
      }));
      setRescaledPackages((prev) =>
        prev.map((unPackage) =>
          unPackage.id === selectedUnPackages.id
            ? { ...unPackage, packages: updatedPackages }
            : unPackage
        )
      );
      setSelectedPackageIndex(null);
    } else {
      const updatedPackages = [...selectedUnPackages.packages];
      updatedPackages[selectedPackageIndex] = {
        ...packageToUpdate,
        rescaled: "Wrong",
        weight: originalWeight.toFixed(2),
      };
      setSelectedUnPackages((prev) => ({
        ...prev,
        packages: updatedPackages,
      }));
      setRescaledPackages((prev) =>
        prev.map((unPackage) =>
          unPackage.id === selectedUnPackages.id
            ? { ...unPackage, packages: updatedPackages }
            : unPackage
        )
      );
      setIsPopupOpen(true);
      setSelectedPackageIndex(null);
    }
  };

  const calculateRescaledStatus = (unPackages) => {
    const totalPackages = unPackages.length;
    const correctlyRescaled = unPackages.filter(
      (unPackage) => unPackage.rescaled === "Yes"
    ).length;
    const hasWrong = unPackages.some(
      (unPackage) => unPackage.rescaled === "Wrong"
    );

    if (hasWrong) return "Error";
    return `${((correctlyRescaled / totalPackages) * 100).toFixed(2)}`;
  };

  const handleBack = () => {
    setIsEditMode(false);
    handleClosePopup();
    setSelectedUnPackages(null);
  };

  const handleBack2 = () => {
    setSelectedUnPackages((prev) => {
      const updatedPackages = [...prev.packages];
      updatedPackages[selectedPackageIndex].weight = originalWeight.toFixed(2);
      return { ...prev, packages: updatedPackages };
    });
    setSelectedPackageIndex(null);
  };

  const renderMobileCards = () => {
    return filteredRescaledPackages.map((rescaledPackage, index) => (
      <div className="card-wrapper" key={rescaledPackage.id}>
        <div className="card-header">
          <div>
            <div className="card-title">Shipment ID: </div>
            <div className={"card-subtitle"}>{rescaledPackage.id}</div>
          </div>
          <button
            className="edit-button xyz"
            onClick={() => handleEdit(rescaledPackage)}
          >
            Details
          </button>
        </div>
        <div className="card-content">
          <div className="card-description">
            <span style={{ minWidth: "100px" }}>Packages</span>
            <span style={{ minWidth: "5px", padding: "0px 10px" }}>:</span>
            <span className="card-temp">{rescaledPackage.packages.length}</span>
          </div>
          <div className="card-description">
            <span style={{ minWidth: "100px" }}>Weight</span>
            <span style={{ minWidth: "5px", padding: "0px 10px" }}>:</span>
            <span className="card-temp">{rescaledPackage.weight}</span>
          </div>
          <div className="card-description">
            <span style={{ minWidth: "100px" }}>Date</span>
            <span style={{ minWidth: "5px", padding: "0px 10px" }}>:</span>
            <span className="card-temp">{rescaledPackage.date}</span>
          </div>
          <div className="card-description">
            <span style={{ minWidth: "100px" }}>Rescaled</span>
            <span style={{ minWidth: "5px", padding: "0px 10px" }}>:</span>
            <span className="card-temp">
              {calculateRescaledStatus(rescaledPackage.packages) === "Error"
                ? "Error"
                : `${calculateRescaledStatus(rescaledPackage.packages)}%`}
            </span>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="p-container">
      {isPopupOpen && (
        <div
          className={`popup ${
            isPopupAnim ? "fade-out-up" : isPopupOpen ? "fade-in-down" : ""
          }`}
        >
          <span className="popup-text">
            Weight mismatch of <br />
            greater than 1 Kg.
          </span>
          <button className="popup-close" onClick={() => handleClosePopup()}>
            &times;
          </button>
        </div>
      )}
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
        <div className="a-title">Rescaled Packages</div>
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
          <img src={User} className="top-secondary-img" />
          <div className="top-secondary-title"> Rescaled Packages </div>
        </div>
      ) : null}
      <div className="p-bottom">
        {isEditMode ? (
          selectedPackageIndex == null ? (
            <div className="b-edit-mode-container">
              <div className="b-edit-mode-title">
                <button className="back-button" onClick={handleBack}>
                  <img src={Arrow} />
                </button>
                <div className="b-edit-mode-text">
                  <div className="b-edit-mode-text-subtitle">
                    Packages of Shipment ID:
                  </div>
                  <div className="b-edit-mode-text-title">
                    {selectedUnPackages.id}
                  </div>
                </div>
              </div>
              <div
                className="b-edit-mode-content"
                style={{ overflowY: "auto" }}
              >
                <div className="b-scale-mode-grid">
                  {selectedUnPackages.packages.map((unPackage, index) => (
                    <div className="card-wrapper" key={index}>
                      <div className="card-header">
                        <div>
                          <div className="card-title">Package ID:</div>
                          <div className="card-subtitle">
                            {unPackage.packageId}
                          </div>
                        </div>
                      </div>
                      <div className="card-content">
                        <div
                          className="card-description"
                          style={{ fontWeight: "normal" }}
                        >
                          <span style={{ minWidth: "100px" }}>Weight:</span>
                          <span
                            style={{ minWidth: "5px", padding: "0px 10px" }}
                          >
                            :
                          </span>
                          <span className="card-temp">{unPackage.weight}</span>
                        </div>
                        <div
                          className="card-description"
                          style={{ fontWeight: "normal" }}
                        >
                          <span style={{ minWidth: "100px" }}>Rescaled:</span>
                          <span
                            style={{ minWidth: "5px", padding: "0px 10px" }}
                          >
                            :
                          </span>
                          <span className="card-temp">
                            {unPackage.rescaled}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="b-confirm-button xyz2"
                  onClick={() => alert("GENERATE RECEIPT OR SMTHING")}
                >
                  Generate Receipt
                </button>
              </div>
            </div>
          ) : (
            <div className="b-edit-mode-container">
              <div className="b-edit-mode-title">
                <button className="back-button" onClick={handleBack2}>
                  <img src={Arrow} />
                </button>
                <div className="b-edit-mode-text">
                  <div className="b-edit-mode-text-subtitle">
                    Rescaling Package ID:
                  </div>
                  <div className="b-edit-mode-text-title">
                    {
                      selectedUnPackages.packages[selectedPackageIndex]
                        .packageId
                    }
                  </div>
                </div>
              </div>
              <div className="b-edit-mode-content">
                <div
                  className="b-scale-mode-grid rescaling-content"
                  style={{ alignItems: "center" }}
                >
                  <div className="card-wrapper rescaling-content">
                    <div
                      className="card-content rescaling-content"
                      style={{ padding: "30px" }}
                    >
                      <div
                        className="card-description rescale-font"
                        style={{
                          flexDirection: "column",
                          marginBottom: "10px",
                          gap: "5px",
                        }}
                      >
                        <span
                          style={{
                            width: "100%",
                            fontSize: "26px",
                            textAlign: "center",
                          }}
                        >
                          #{selectedUnPackages.id}
                        </span>
                        <span
                          style={{
                            width: "100%",
                            textAlign: "center",
                            color: "#6C6C6C",
                          }}
                        >
                          Package ID{" "}
                          {
                            selectedUnPackages.packages[selectedPackageIndex]
                              .packageId
                          }
                        </span>
                      </div>
                      <div className="card-description rescale-font">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <span style={{ minWidth: "160px" }}>
                            Original Weight
                          </span>
                          <span
                            className="dot-temp"
                            style={{ minWidth: "5px", padding: "0px 10px" }}
                          >
                            :
                          </span>
                        </div>
                        <span className="card-temp" style={{ width: "unset" }}>
                          {originalWeight.toFixed(2)} Kg
                        </span>
                      </div>
                      <div className="card-description rescale-font">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                          }}
                        >
                          <span style={{ minWidth: "160px" }}>
                            Current Weight
                          </span>
                          <span
                            className="dot-temp"
                            style={{ minWidth: "5px", padding: "0px 10px" }}
                          >
                            :
                          </span>
                        </div>
                        <input
                          type="number"
                          step="0.01"
                          min="0.01"
                          className={`${isInputFilled(
                            selectedUnPackages.packages[selectedPackageIndex]
                              .weight
                          )} rescale-input-smaller`}
                          value={parseFloat(
                            selectedUnPackages.packages[selectedPackageIndex]
                              .weight
                          ).toFixed(2)}
                          onChange={(e) => {
                            const updatedPackages = [
                              ...selectedUnPackages.packages,
                            ];
                            updatedPackages[selectedPackageIndex].weight =
                              parseFloat(e.target.value);
                            setSelectedUnPackages((prev) => ({
                              ...prev,
                              packages: updatedPackages,
                            }));
                          }}
                        />
                      </div>
                      <button
                        className="b-confirm-button rescaling-button"
                        onClick={handleConfirmRescale}
                        disabled={!isInputFilled()}
                      >
                        Confirm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
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
                  value={selectedTimespan}
                  onChange={handleTimespanChange}
                  className="search-dropdown"
                >
                  <option value="All">All</option>
                  <option value="Today">Today</option>
                  <option value="1 Week">1 Week</option>
                  <option value="1 Month">1 Month</option>
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
              Rescaled Shipment Packages
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
                    placeholder=" Search ID..."
                  />
                  <div className="search-dropdown-wrapper">
                    <select
                      value={selectedTimespan}
                      onChange={handleTimespanChange}
                      className="search-dropdown"
                    >
                      <option value="All">All</option>
                      <option value="Today">Today</option>
                      <option value="1 Week">1 Week</option>
                      <option value="1 Month">1 Month</option>
                    </select>
                  </div>
                </div>
                <div className="p-table-wrapper">
                  <div style={{ width: "calc(100% - 9px)" }}>
                    <table className="p-table-container">
                      <thead>
                        <tr>
                          <th
                            style={{ width: "15%" }}
                            onClick={() => handleSort(rescaledPackages, "id")}
                          >
                            ID {getArrow("id")}
                          </th>
                          <th
                            style={{ width: "22.5%" }}
                            onClick={() =>
                              handleSort(rescaledPackages, "packages")
                            }
                          >
                            Packages {getArrow("packages")}
                          </th>
                          <th
                            style={{ width: "22.5%" }}
                            className="weight2-column"
                            onClick={() =>
                              handleSort(rescaledPackages, "weight")
                            }
                          >
                            Weight (Kg) {getArrow("weight")}
                          </th>
                          <th
                            style={{ width: "25%" }}
                            onClick={() => handleSort(rescaledPackages, "date")}
                          >
                            Date {getArrow("date")}
                          </th>
                          <th
                            style={{ width: "25%" }}
                            className="rescale-column"
                            onClick={() =>
                              handleSort(rescaledPackages, "rescaled")
                            }
                          >
                            Rescaled {getArrow("rescaled")}
                          </th>
                          <th style={{ width: "15%" }}> </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredRescaledPackages.map(
                          (rescaledPackage, index) => (
                            <tr key={index}>
                              <td>{rescaledPackage.id}</td>
                              <td>{rescaledPackage.packages.length}</td>
                              <td className="weight2-column">
                                {rescaledPackage.weight}
                              </td>
                              <td>{rescaledPackage.date}</td>
                              <td className="rescale-column">
                                {calculateRescaledStatus(
                                  rescaledPackage.packages
                                )}
                                %
                              </td>
                              <td>
                                <button
                                  className="edit-button xyz"
                                  onClick={() => handleEdit(rescaledPackage)}
                                >
                                  Details
                                </button>
                              </td>
                            </tr>
                          )
                        )}
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

export default RescaledPackages;
