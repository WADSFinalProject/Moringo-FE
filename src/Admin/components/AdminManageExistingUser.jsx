import React, { useState, useEffect } from "react";
import "../Styles/Managing.css";
import Avatar from "../../Assets/Avatar.svg";
import Arrow from "../../Assets/Arrow.svg";
import Bell from "../../Assets/Bell.svg";
import Bell2 from "../../Assets/BellTemp.svg";
import User from "../../Assets/User.svg";
import Edit from "../../Assets/Edit.svg";

const fetchExistingUsers = () => {
  return new Promise((resolve) => {
    const existingUsers = [
      {
        number: "1",
        name: "John Doe",
        username: "JOHN45",
        email: "john@gmail.com",
        userType: "CENTRA",
        branch: "JAKARTA",
      },
      {
        number: "2",
        name: "Jane Doe",
        username: "JANE12",
        email: "jane@gmail.com",
        userType: "XYZ",
        branch: "KUPANG",
      },
      {
        number: "3",
        name: "Jeff Doe",
        username: "JEFF31",
        email: "jeff@gmail.com",
        userType: "XYZ",
        branch: "JAKARTA",
      },
      {
        number: "4",
        name: "Bean Doe Bean Doe Bean Doe",
        username: "BEAN0",
        email:
          "beanssssssssssssssssssssssssssssssssssssssssssssssssassssssssssssssssssssssS@gmail.com",
        userType: "HARBOR",
        branch: "CHINA CHINA CHINA CHINA ",
      },
    ];
    resolve(existingUsers);
  });
};

const ManageExistingUser = ({ onNavigate }) => {
  const [existingUsers, setExistingUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentSortKey, setCurrentSortKey] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
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
    fetchExistingUsers().then((data) => setExistingUsers(data));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const filteredUsers = existingUsers.filter((user) => {
    const username = user.username.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    return (
      username.includes(searchTermLower) &&
      (selectedStatus === "All" || user.userType === selectedStatus)
    );
  });

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
    setExistingUsers([...existingUsers].sort(sortFunction));
  };

  const getArrow = (sortKey) => {
    if (sortKey === currentSortKey) {
      return sortOrder === "asc" ? "↑" : "↓";
    }
    return "";
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditMode(true);
  };

  const handleBack = () => {
    setIsEditMode(false);
    setSelectedUser(null);
  };

  const handleConfirmEdit = () => {
    const updatedUser = {
      ...selectedUser,
    };

    setExistingUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.number === selectedUser.number ? updatedUser : user
      )
    );
    handleBack();
  };

  const handleDelete = () => {
    setAllShipment((prevUsers) =>
      prevUsers.filter((user) => user.number !== selectedUser.number)
    );
    handleBack();
  };

  const isInputFilled = (value) => {
    return value ? "b-edit-mode-input filled" : "b-edit-mode-input";
  };

  const isFormFilled = () => {
    return (
      selectedUser.name &&
      selectedUser.username &&
      selectedUser.email &&
      selectedUser.userType &&
      selectedUser.branch
    );
  };

  const renderMobileCards = () => {
    return filteredUsers.map((user) => (
      <div className="card-wrapper" key={user.number}>
        <div className="card-header">
          <div>
            <div className="card-title">Username: </div>
            <div className="card-subtitle">{user.username}</div>
          </div>
          <button
            style={{
              marginRight: "5px",
              backgroundColor: "transparent",
              borderColor: "transparent",
            }}
            onClick={() => handleEdit(user)}
          >
            <img src={Edit} className="card-edit" />
          </button>
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
        <div className="title">Manage Existing User</div>
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
            <img src={Avatar} className="avatar-icon" />
          </div>
        </div>
      </div>
      {windowWidth <= 560 ? (
        <div className="top-secondary">
          <img src={User} className="top-secondary-img" />
          <div className="top-secondary-title">Manage Existing User</div>
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
                  Editing User ID:
                </div>
                <div className="b-edit-mode-text-title">
                  {selectedUser.number}
                </div>
              </div>
            </div>
            <div className="b-edit-mode-content">
              <div className="b-edit-mode-grid">
                Full Name:
                <input
                  type="text"
                  className={`${isInputFilled(selectedUser.name)}`}
                  value={selectedUser.name}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      name: e.target.value,
                    })
                  }
                />
                Username:
                <input
                  type="text"
                  className={`${isInputFilled(selectedUser.username)}`}
                  value={selectedUser.username}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      username: e.target.value,
                    })
                  }
                />
                Email:
                <input
                  type="text"
                  className={`${isInputFilled(selectedUser.email)}`}
                  value={selectedUser.email}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      email: e.target.value,
                    })
                  }
                />
                User Type:
                <div className="select-dropdown">
                  <select
                    value={selectedUser.userType}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        userType: e.target.value,
                      })
                    }
                  >
                    <option value="CENTRA">Centra</option>
                    <option value="HARBOR">Harbor</option>
                    <option value="XYZ">XYZ</option>
                  </select>
                </div>
                Branch:
                <input
                  type="text"
                  className={`${isInputFilled(selectedUser.branch)}`}
                  value={selectedUser.branch}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      branch: e.target.value,
                    })
                  }
                />
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
                  Delete User
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
            <div
              className="p-tab active"
              style={{ width: "99%", margin: "auto" }}
            >
              Existing Users
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
                            style={{ width: "5%" }}
                            onClick={() => handleSort(existingUsers, "number")}
                          >
                            ID {getArrow("number")}
                          </th>
                          <th
                            style={{ width: "15%" }}
                            onClick={() => handleSort(existingUsers, "name")}
                          >
                            Name {getArrow("name")}
                          </th>
                          <th
                            className="username-column"
                            style={{ width: "15%" }}
                            onClick={() =>
                              handleSort(existingUsers, "username")
                            }
                          >
                            Username {getArrow("username")}
                          </th>
                          <th
                            className="email-column"
                            style={{ width: "30%" }}
                            onClick={() => handleSort(existingUsers, "email")}
                          >
                            Email {getArrow("email")}
                          </th>
                          <th
                            style={{ width: "10%" }}
                            onClick={() =>
                              handleSort(existingUsers, "userType")
                            }
                          >
                            User Type {getArrow("userType")}
                          </th>
                          <th
                            className="branch-column"
                            style={{ width: "15%" }}
                            onClick={() => handleSort(existingUsers, "branch")}
                          >
                            Branch {getArrow("branch")}
                          </th>
                          <th style={{ width: "10%" }}> </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredUsers.map((user, index) => (
                          <tr key={index}>
                            <td>{user.number}</td>
                            <td>{user.name}</td>
                            <td className="username-column">{user.username}</td>
                            <td className="email-column">{user.email}</td>
                            <td>
                              <span className={getUserTypeClass(user.userType)}>
                                {user.userType}
                              </span>
                            </td>
                            <td className="branch-column">{user.branch}</td>
                            <td>
                              <button
                                className="edit-button"
                                onClick={() => handleEdit(user)}
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageExistingUser;
