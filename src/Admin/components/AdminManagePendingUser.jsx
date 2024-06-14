import React, { useState, useEffect } from "react";
import "../styles/AdminManaging.css";
import Arrow from "../../Assets/Arrow.svg";
import Bell from "../../Assets/Bell.svg";
import Bell2 from "../../Assets/BellTemp.svg";
import Acc from "../../Assets/Accept.svg";
import Del from "../../Assets/Delete.svg";
import PUser from "../../Assets/PendingUser.svg";
import ProfilePictureMini from "../../Assets/modules/ProfilePictureMini.jsx";

const fetchPendingUsers = () => {
  return new Promise((resolve) => {
    const pendingUsers = [
      {
        number: "9",
        name: "John Doe",
        username: "JOHN45",
        email: "john@gmail.com",
        userType: "CENTRA",
        branch: "JAKARTA",
      },
      {
        number: "10",
        name: "Jane Doe",
        username: "JANE12",
        email: "jane@gmail.com",
        userType: "XYZ",
        branch: "KUPANG",
      },
      {
        number: "11",
        name: "Jeff Doe",
        username: "JEFF31",
        email: "jeff@gmail.com",
        userType: "XYZ",
        branch: "JAKARTA",
      },
      {
        number: "12",
        name: "Bean Doe",
        username: "BEAN0",
        email: "bean@gmail.com",
        userType: "HARBOR",
        branch: "CHINA",
      },
      {
        number: "13",
        name: "Bean Doe",
        username: "BEAN0",
        email: "bean@gmail.com",
        userType: "HARBOR",
        branch: "CHINA",
      },
      {
        number: "14",
        name: "Bean Doe",
        username: "BEAN0",
        email: "bean@gmail.com",
        userType: "HARBOR",
        branch: "CHINA",
      },
      {
        number: "15",
        name: "Bean Doe",
        username: "BEAN0",
        email: "bean@gmail.com",
        userType: "HARBOR",
        branch: "CHINA",
      },
      {
        number: "16",
        name: "Bean Doe",
        username: "BEAN0",
        email: "bean@gmail.com",
        userType: "HARBOR",
        branch: "CHINA",
      },
      {
        number: "17",
        name: "Bean Doe",
        username: "BEAN0",
        email: "bean@gmail.com",
        userType: "HARBOR",
        branch: "CHINA",
      },
      {
        number: "18",
        name: "Bean Doe",
        username: "BEAN0",
        email: "bean@gmail.com",
        userType: "HARBOR",
        branch: "CHINA",
      },
      {
        number: "19",
        name: "Bean Doe",
        username: "BEAN0",
        email: "bean@gmail.com",
        userType: "HARBOR",
        branch: "CHINA",
      },
      {
        number: "20",
        name: "Bean Doe",
        username: "BEAN0",
        email: "bean@gmail.com",
        userType: "HARBOR",
        branch: "CHINA",
      },
      {
        number: "21",
        name: "Bean Doe",
        username: "BEAN0",
        email: "bean@gmail.com",
        userType: "HARBOR",
        branch: "CHINA",
      },
      {
        number: "22",
        name: "Bean Doe",
        username: "BEAN0",
        email: "bean@gmail.com",
        userType: "HARBOR",
        branch: "CHINA",
      },
      {
        number: "23",
        name: "Bean Doe",
        username: "BEAN0",
        email: "bean@gmail.com",
        userType: "HARBOR",
        branch: "CHINA",
      },
      {
        number: "24",
        name: "Bean Doe Bean Doe Bean Doe Bean Doe Bean Doe Bean Doe ",
        username: "BEAN0 BEAN0 BEAN0 BEAN0 BEAN0 BEAN0 ",
        email: "beanssssssssssssssssssssssssssssssssssssss@gmail.com",
        userType: "HARBOR",
        branch: "CHINA CHINA CHINA CHINA CHINA CHINA CHINA ",
      },
    ];
    resolve(pendingUsers);
  });
};

const ManagePendingUser = ({ onNavigate }) => {
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [disapprovedUsers, setDisapprovedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState("managePend1");
  const [isVisible, setIsVisible] = useState(true);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentSortKey, setCurrentSortKey] = useState("");
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
    fetchPendingUsers().then((data) => setPendingUsers(data));
  }, []);

  const handleAccept = (index) => {
    const user = pendingUsers[index];
    user.status = "approved";
    setApprovedUsers([...approvedUsers, user]);
    removeUserFromPending(index);
  };

  const handleDelete = (index) => {
    const user = pendingUsers[index];
    user.status = "disapproved";
    setDisapprovedUsers([...disapprovedUsers, user]);
    removeUserFromPending(index);
  };

  const removeUserFromPending = (index) => {
    const updatedUsers = [...pendingUsers];
    updatedUsers.splice(index, 1);
    setPendingUsers(updatedUsers);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredUsers = pendingUsers.filter((user) => {
    const username = user.username.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    return (
      username.includes(searchTermLower) &&
      (selectedStatus === "All" || user.userType === selectedStatus)
    );
  });

  const filteredApprovedUsers = approvedUsers.filter((user) => {
    const username = user.username.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    return (
      username.includes(searchTermLower) &&
      (selectedStatus === "All" || user.userType === selectedStatus)
    );
  });

  const filteredDisapprovedUsers = disapprovedUsers.filter((user) => {
    const username = user.username.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    return (
      username.includes(searchTermLower) &&
      (selectedStatus === "All" || user.userType === selectedStatus)
    );
  });

  const handleTabChange = (tab) => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentTab(tab);
      setIsVisible(true);
    }, 75);
  };

  const getUserTypeClass = (userType) => {
    switch (userType) {
      case "CENTRA":
        return "user-type-centra";
      case "XYZ":
        return "user-type-xyz";
      case "HARBOR":
        return "user-type-harbor";
      default:
        return "";
    }
  };

  const handleSort = (userList, sortKey) => {
    const sortFunction = (a, b) => {
      const valueA = isNaN(Number(a[sortKey]))
        ? a[sortKey]
        : Number(a[sortKey]);
      const valueB = isNaN(Number(b[sortKey]))
        ? b[sortKey]
        : Number(b[sortKey]);

      if (!isNaN(valueA) && !isNaN(valueB)) {
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      } else {
        const stringValueA = String(valueA).toLowerCase();
        const stringValueB = String(valueB).toLowerCase();
        return sortOrder === "asc"
          ? stringValueA.localeCompare(stringValueB)
          : stringValueB.localeCompare(stringValueA);
      }
    };

    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
    setCurrentSortKey(sortKey);

    let sortedUsers = [];
    switch (userList) {
      case "pending":
        sortedUsers = [...pendingUsers].sort(sortFunction);
        setPendingUsers(sortedUsers);
        break;
      case "approved":
        sortedUsers = [...approvedUsers].sort(sortFunction);
        setApprovedUsers(sortedUsers);
        break;
      case "disapproved":
        sortedUsers = [...disapprovedUsers].sort(sortFunction);
        setDisapprovedUsers(sortedUsers);
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
    if (currentTab === "managePend1") return "pending";
    if (currentTab === "managePend2") return "approved";
    if (currentTab === "managePend3") return "disapproved";
  };

  const getCurrentUsers = () => {
    if (currentTab === "managePend1") return filteredUsers;
    if (currentTab === "managePend2") return filteredApprovedUsers;
    if (currentTab === "managePend3") return filteredDisapprovedUsers;
  };

  const renderMobileCards = () => {
    return filteredUsers.map((user, index) => (
      <div className="card-wrapper" key={index}>
        <div className="card-header">
          <div>
            <div className="card-title">Username: </div>
            <div
              className={`card-subtitle ${
                user.username.length > 12 ? "long-word-break" : ""
              }`}
            >
              {user.username}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              minWidth: "95px",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                padding: "0px",
                marginLeft: "5px",
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              onClick={() => handleAccept(index)}
            >
              <img src={Acc} className="accept-button" />
            </button>
            <button
              style={{
                padding: "0px",
                backgroundColor: "transparent",
                borderColor: "transparent",
              }}
              onClick={() => handleDelete(index)}
            >
              <img src={Del} className="delete-button" />
            </button>
          </div>
        </div>
        <div className="card-content">
          <div className="card-description">
            <span style={{ minWidth: "100px" }}>ID</span>
            <span style={{ minWidth: "5px", padding: "0px 10px" }}>:</span>
            <span className="card-temp">{user.number}</span>
          </div>
          <div className="card-description">
            <span style={{ minWidth: "100px" }}>Full Name </span>
            <span style={{ minWidth: "5px", padding: "0px 10px" }}>:</span>
            <span className="card-temp">{user.name}</span>
          </div>
          <div className="card-description">
            <span style={{ minWidth: "100px" }}>Email</span>
            <span style={{ minWidth: "5px", padding: "0px 10px" }}>:</span>
            <span className="card-temp">
              <span
                className={`notif-email ${
                  user.email.length > 10 ? "long-word-break" : ""
                }`}
              >
                {user.email}
              </span>{" "}
            </span>
          </div>
          <div className="card-description">
            <span style={{ minWidth: "100px" }}>User Type </span>
            <span style={{ minWidth: "5px", padding: "0px 10px" }}>:</span>
            <span className="card-temp">
              <span className={getUserTypeClass(user.userType)}>
                {user.userType}
              </span>
            </span>
          </div>
          <div className="card-description">
            <span style={{ minWidth: "100px" }}>Branch </span>
            <span style={{ minWidth: "5px", padding: "0px 10px" }}>:</span>
            <span className="card-temp">{user.branch}</span>
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
        <div className="a-title">Manage Pending User</div>
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
          <img src={PUser} className="top-secondary-img" />
          <div className="top-secondary-title">Manage Pending User</div>
        </div>
      ) : null}
      <div className="p-bottom">
        {windowWidth <= 560 ? (
          <div>
            <div className="search-nav">
              <input
                type="search"
                value={searchTerm}
                onChange={handleSearch}
                className="p-searchbar"
                placeholder=" Search User..."
              />
              <div className="search-dropdown-wrapper">
                <select
                  value={selectedStatus}
                  onChange={handleStatusChange}
                  className="search-dropdown"
                >
                  <option value="All">All</option>
                  <option value="CENTRA">Centra</option>
                  <option value="HARBOR">Harbor</option>
                  <option value="XYZ">XYZ</option>
                </select>
              </div>
            </div>
            <div className="mobile-content m-extend fade-in-left">
              {renderMobileCards()}
            </div>
          </div>
        ) : (
          <div style={{ height: "inherit" }}>
            <div className="p-tabs">
              <a
                href="#"
                className={
                  currentTab === "managePend1" ? "p-tab active" : "p-tab"
                }
                onClick={() => handleTabChange("managePend1")}
              >
                Pending Users
                <div className="p-tab-line" />
              </a>
              <a
                href="#"
                className={
                  currentTab === "managePend2" ? "p-tab active" : "p-tab"
                }
                onClick={() => handleTabChange("managePend2")}
              >
                Approved
                <div className="p-tab-line" />
              </a>
              <a
                href="#"
                className={
                  currentTab === "managePend3" ? "p-tab active" : "p-tab"
                }
                onClick={() => handleTabChange("managePend3")}
              >
                Disapproved
                <div className="p-tab-line" />
              </a>
            </div>
            <div className="p-bottom-container">
              {(currentTab === "managePend1" ||
                currentTab === "managePend2" ||
                currentTab === "managePend3") && (
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
                      placeholder=" Search Username..."
                    />
                    <div className="search-dropdown-wrapper">
                      <select
                        value={selectedStatus}
                        onChange={handleStatusChange}
                        className="search-dropdown"
                      >
                        <option value="All">All</option>
                        <option value="CENTRA">Centra</option>
                        <option value="HARBOR">Harbor</option>
                        <option value="XYZ">XYZ</option>
                      </select>
                    </div>
                  </div>
                  <div className="p-table-wrapper">
                    <div style={{ width: "calc(100% - 9px)" }}>
                      <table className="p-table-container">
                        <thead>
                          <tr>
                            <th
                              style={{ width: "7%" }}
                              onClick={() =>
                                handleSort(getSortType(), "number")
                              }
                            >
                              ID {getArrow("number")}
                            </th>
                            <th
                              style={{ width: "13.5%" }}
                              onClick={() => handleSort(getSortType(), "name")}
                            >
                              Name {getArrow("name")}
                            </th>
                            <th
                              className="username-column"
                              style={{ width: "14.5%" }}
                              onClick={() =>
                                handleSort(getSortType(), "username")
                              }
                            >
                              Username {getArrow("username")}
                            </th>
                            <th
                              className="email-column"
                              style={{ width: "21%" }}
                              onClick={() => handleSort(getSortType(), "email")}
                            >
                              Email {getArrow("email")}
                            </th>
                            <th
                              style={{ width: "11%" }}
                              onClick={() =>
                                handleSort(getSortType(), "userType")
                              }
                            >
                              User Type {getArrow("userType")}
                            </th>
                            <th
                              className="branch-column"
                              style={{ width: "11%" }}
                              onClick={() =>
                                handleSort(getSortType(), "branch")
                              }
                            >
                              Branch {getArrow("branch")}
                            </th>
                            {currentTab === "managePend1" && (
                              <th style={{ width: "12%" }}> </th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {getCurrentUsers().map((user, index) => (
                            <tr key={index}>
                              <td>{user.number}</td>
                              <td>{user.name}</td>
                              <td className="username-column">
                                {user.username}
                              </td>
                              <td className="email-column">{user.email}</td>
                              <td>
                                <span
                                  className={getUserTypeClass(user.userType)}
                                >
                                  {user.userType}
                                </span>
                              </td>
                              <td className="branch-column">{user.branch}</td>
                              {currentTab === "managePend1" && (
                                <td style={{}}>
                                  <button
                                    onClick={() => handleAccept(index)}
                                    className="accept-button"
                                  >
                                    <img src={Acc} />
                                  </button>
                                  <button
                                    onClick={() => handleDelete(index)}
                                    className="delete-button"
                                  >
                                    <img src={Del} />
                                  </button>
                                </td>
                              )}
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

export default ManagePendingUser;
