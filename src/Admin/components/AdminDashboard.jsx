import { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  BarChart,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Label,
} from "recharts";
import "../styles/AdminDashboard.css";
import User from "../../Assets/User.svg";
import PUser from "../../Assets/PendingUser.svg";
import Batch from "../../Assets/Batches.svg";
import Shipment from "../../Assets/Shipment.svg";
import Bell from "../../Assets/Bell.svg";
import Bell2 from "../../Assets/BellTemp.svg";
import LogOut from "../../Assets/LogOutTemp.svg";
import { useNavigate } from "react-router-dom";
import ProfilePictureMini from "../../Assets/modules/ProfilePictureMini.jsx";

const Dashboard = ({ onNavigate }) => {
  const [resizing, setResizing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const now = new Date();
  const navigate = useNavigate();

  const formattedTime = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = now.toLocaleDateString([], {
    weekday: "short",
    day: "2-digit",
    month: "long",
  });

  const handleResize = () => {
    setResizing(true);
    setTimeout(() => {
      setResizing(false);
    }, 500);
  };
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("fullscreenchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("fullscreenchange", handleResize);
    };
  }, []);

  const barData = [
    { name: "Wet Leaves", Weight: 31 },
    { name: "Dry Leaves", Weight: 10 },
    { name: "Powder", Weight: 9 },
  ];

  const highestBarData = Math.max(...barData.map((item) => item.Weight));

  const ticks = Array.from(
    { length: Math.ceil(highestBarData / 10) + 1 },
    (_, i) => i * 10
  );

  const centraData = [
    { name: "Unprocessed", Weight: 40 },
    { name: "Processed", Weight: 24 },
    { name: "Expired", Weight: 10 },
  ];

  const harborData = [
    { name: "Pending", Weight: 30 },
    { name: "Arrived", Weight: 47 },
    { name: "Collected", Weight: 21 },
  ];

  const pieColor = ["#ABBC77", "#7B9461", "#336135"];

  return (
    <div className="p-container">
      <div className="top special">
        <div className="a-title">Admin Dashboard</div>
        <div className="time-detail">
          <div className="text">Last Data Refresh at: </div>
          <div className="time">25 March 2024 ~ 10:30 PM</div>
        </div>
        <div className="profile-detail-temp">
          {windowWidth <= 560 ? null : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: windowWidth <= 560 ? "auto" : "100%",
              }}
            >
              <button
                style={{
                  marginRight: "5px",
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                }}
                onClick={() => onNavigate("notification")}
              >
                <img src={Bell} className="notif-bell" />
              </button>
              <div className="profile-detail">
                <div className="name-detail">
                  <div className="name">John Doe</div>
                  <div className="id">JOHN45</div>
                </div>
                <ProfilePictureMini />
              </div>
            </div>
          )}
        </div>
        {windowWidth <= 560 ? (
          <div style={{ width: "100%" }}>
            <div className="admin-special-header">
              <button
                style={{
                  marginRight: "5px",
                  backgroundColor: "transparent",
                  borderColor: "transparent",
                }}
                onClick={() => navigate("/login")}
              >
                <img
                  style={{
                    height: "25px",
                    width: "25px",
                  }}
                  src={LogOut}
                  className="notif-bell"
                />
              </button>
              <div style={{ display: "flex", alignItems: "center" }}>
                <button
                  style={{
                    marginRight: "5px",
                    backgroundColor: "transparent",
                    borderColor: "transparent",
                  }}
                  onClick={() => onNavigate("notification")}
                >
                  <img
                    style={{
                      height: "25px",
                      width: "25px",
                    }}
                    src={Bell2}
                    className="notif-bell"
                  />
                </button>
                ADMIN
              </div>
            </div>
            <div>
              <div className="dashboard-m-title-wrapper">
                <div className="dashboard-m-title">Hello! Maximiliana</div>
                <ProfilePictureMini />
              </div>
              <div className="dashboard-m-subtitle">{formattedTime},</div>
              <div className="dashboard-m-subtitle">{formattedDate}</div>
            </div>
          </div>
        ) : null}
      </div>
      <div className="d-bottom">
        {windowWidth <= 560 ? null : (
          <div className="d-bottom-half-top">
            <div className="d-main-display">
              <div className="d-displaym">
                <span
                  style={{ width: "90%", fontWeight: "bold", padding: "10px" }}
                >
                  Total Production
                </span>
                <ResponsiveContainer
                  width="90%"
                  minHeight="250px"
                  height="100%"
                  style={{ marginLeft: "-5%" }}
                >
                  <BarChart data={barData}>
                    <CartesianGrid vertical={false} strokeDasharray="100 0" />
                    <XAxis dataKey="name" />
                    <YAxis
                      axisLine={false}
                      tickFormatter={(tick) => `${tick} Kg`}
                      ticks={ticks}
                    />
                    <Tooltip formatter={(value) => `${value} Kg`} />
                    <Bar
                      dataKey="Weight"
                      fill="#336135"
                      barSize="15%"
                      radius={[10, 10, 0, 0]}
                      animationBegin={resizing ? 0 : undefined}
                      animationDuration={resizing ? 0 : 500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="d-extra-display">
              <div className="d-display2">
                <div className="d-display2-half1">
                  <ResponsiveContainer
                    width="90%"
                    minHeight="130px"
                    height="90%"
                  >
                    <PieChart>
                      <Pie
                        data={centraData}
                        innerRadius="70%"
                        outerRadius="100%"
                        dataKey="Weight"
                        startAngle={90}
                        endAngle={-270}
                        animationBegin={0}
                        animationDuration={500}
                      >
                        {centraData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={pieColor[index % pieColor.length]}
                          />
                        ))}
                        <Label
                          value="Centra"
                          position="center"
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            fill: "black",
                          }}
                        />
                      </Pie>
                      <Tooltip formatter={(value) => `${value} Kg`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="d-display2-half2">
                  {centraData.map((item, index) => (
                    <div style={{ width: "100px" }} key={index}>
                      <div>{item.name}</div>
                      <div
                        className={`d-display2-half2-dot-${index + 1}`}
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                      >
                        {`${item.Weight} Kg`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="d-display2">
                <div className="d-display2-half1">
                  <ResponsiveContainer
                    width="90%"
                    minHeight="130px"
                    height="90%"
                  >
                    <PieChart>
                      <Pie
                        data={harborData}
                        innerRadius="70%"
                        outerRadius="100%"
                        dataKey="Weight"
                        startAngle={90}
                        endAngle={-270}
                        animationBegin={0}
                        animationDuration={500}
                      >
                        {harborData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={pieColor[index % pieColor.length]}
                          />
                        ))}
                        <Label
                          value="Harbor"
                          position="center"
                          style={{
                            fontSize: "18px",
                            fontWeight: "bold",
                            fill: "black",
                          }}
                        />
                      </Pie>
                      <Tooltip formatter={(value) => `${value} Kg`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="d-display2-half2">
                  {harborData.map((item, index) => (
                    <div style={{ width: "100px" }} key={index}>
                      <div>{item.name}</div>
                      <div
                        className={`d-display2-half2-dot-${index + 1}`}
                        style={{ fontSize: "auto", fontWeight: "bold" }}
                      >
                        {`${item.Weight} Kg`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="d-bottom-half-bottom">
          <div className="d-manage-options">
            <div className="d-half-manage-options">
              <a
                href="#"
                className="d-display buttonDisp"
                onClick={() => onNavigate("manageExist")}
              >
                <div className="d-box">
                  <img src={User} className="d-box-image" />
                  <div className="d-box-detail">
                    <div className="d-box-text">Manage Existing User</div>
                    <div className="d-box-extra-text">Total Users: 4</div>
                  </div>
                </div>
              </a>
              <a
                href="#"
                className="d-display buttonDisp"
                onClick={() => onNavigate("managePend")}
              >
                <div className="d-box">
                  <img
                    src={PUser}
                    className="d-box-image"
                    style={{
                      transform: "scale(1.2)",
                    }}
                  />
                  <div className="d-box-detail">
                    <div className="d-box-text">Manage Pending User</div>
                    <div className="d-box-extra-text">Total Users: 16</div>
                  </div>
                </div>
              </a>
            </div>
            <div className="d-half-manage-options">
              <a
                href="#"
                className="d-display buttonDisp"
                onClick={() => onNavigate("manageBatch")}
              >
                <div className="d-box">
                  <img src={Batch} className="d-box-image" />
                  <div className="d-box-detail">
                    <div className="d-box-text">Manage Batches</div>
                    <div className="d-box-extra-text">Total Batches: 12</div>
                  </div>
                </div>
              </a>
              <a
                href="#"
                className="d-display buttonDisp"
                onClick={() => onNavigate("manageShip")}
              >
                <div className="d-box">
                  <img src={Shipment} className="d-box-image" />
                  <div className="d-box-detail">
                    <div className="d-box-text">Manage Shipment</div>
                    <div className="d-box-extra-text">Total Shipment: 12</div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
