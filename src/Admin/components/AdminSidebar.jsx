import React, { useState, useEffect, useRef } from "react";
import "../styles/SideBar.css";
import Leaf from "../../Assets/VectorLeaf.svg";
import Dashboards from "../../Assets/Dashboard.svg";
import User from "../../Assets/User.svg";
import PUser from "../../Assets/PendingUser.svg";
import Batch from "../../Assets/Batches.svg";
import Shipment from "../../Assets/Shipment.svg";
import LogOut from "../../Assets/LogOut.svg";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ currentPage, onNavigate }) => {
  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(window.innerWidth <= 1090);
  const [isFullHidden, setIsFullHidden] = useState(window.innerWidth <= 560);
  const [shouldRenderText, setShouldRenderText] = useState(
    window.innerWidth > 1090
  );
  const [isResizing, setIsResizing] = useState(false);
  const resizeTimeoutRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsResizing(true);
      clearTimeout(resizeTimeoutRef.current);
      const hideSidebar = window.innerWidth <= 1090;
      const fullHideSidebar = window.innerWidth <= 560;

      if (hideSidebar !== isHidden) {
        setIsHidden(hideSidebar);
        if (hideSidebar) {
          resizeTimeoutRef.current = setTimeout(() => {
            setShouldRenderText(false);
            setIsResizing(false);
          }, 300);
        } else {
          setShouldRenderText(true);
          resizeTimeoutRef.current = setTimeout(() => {
            setIsResizing(false);
          }, 300);
        }
      }

      if (fullHideSidebar !== isFullHidden) {
        setIsFullHidden(fullHideSidebar);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeoutRef.current);
    };
  }, [isHidden, isFullHidden]);

  return (
    <div className={`menu ${isFullHidden ? "move" : ""}`}>
      <div className="logo">
        <img src={Leaf} />
        {shouldRenderText && (
          <span
            className={`logo-text ${
              isResizing && !isHidden ? "fade-in" : isHidden ? "fade-out" : ""
            }`}
          >
            MORINGO
          </span>
        )}
      </div>
      <div className={`menu-list ${isHidden ? "move" : ""}`}>
        <a
          href="#"
          className={currentPage === "dashboard" ? "item active" : "item"}
          onClick={() => onNavigate("dashboard")}
        >
          <img src={Dashboards} className="logo-list" />
          {shouldRenderText && (
            <span
              className={`sidebar-text ${
                isResizing && !isHidden ? "fade-in" : isHidden ? "fade-out" : ""
              }`}
            >
              Dashboard
            </span>
          )}
        </a>
        <a
          href="#"
          className={currentPage === "manageExist" ? "item active" : "item"}
          onClick={() => onNavigate("manageExist")}
        >
          <img src={User} className="logo-list" />
          {shouldRenderText && (
            <span
              className={`sidebar-text ${
                isResizing && !isHidden ? "fade-in" : isHidden ? "fade-out" : ""
              }`}
            >
              Manage Existing User
            </span>
          )}
        </a>
        <a
          href="#"
          className={currentPage === "managePend" ? "item active" : "item"}
          onClick={() => onNavigate("managePend")}
        >
          <img
            src={PUser}
            className="logo-list"
            style={{
              transform: "scale(1.2)",
            }}
          />
          {shouldRenderText && (
            <span
              className={`sidebar-text ${
                isResizing && !isHidden ? "fade-in" : isHidden ? "fade-out" : ""
              }`}
            >
              Manage Pending User
            </span>
          )}
        </a>
        <a
          href="#"
          className={currentPage === "manageBatch" ? "item active" : "item"}
          onClick={() => onNavigate("manageBatch")}
        >
          <img src={Batch} className="logo-list" />
          {shouldRenderText && (
            <span
              className={`sidebar-text ${
                isResizing && !isHidden ? "fade-in" : isHidden ? "fade-out" : ""
              }`}
            >
              Manage Batches
            </span>
          )}
        </a>
        <a
          href="#"
          className={currentPage === "manageShip" ? "item active" : "item"}
          onClick={() => onNavigate("manageShip")}
        >
          <img src={Shipment} className="logo-list" />
          {shouldRenderText && (
            <span
              className={`sidebar-text ${
                isResizing && !isHidden ? "fade-in" : isHidden ? "fade-out" : ""
              }`}
            >
              Manage Shipment
            </span>
          )}
        </a>
      </div>
      <div className={`menu-bottom ${isHidden ? "move" : ""}`}>
        <a
          href="#"
          className={currentPage === "logOut" ? "item active" : "item"}
          onClick={() => navigate("/login")}
        >
          <img src={LogOut} className="logo-list" />
          {shouldRenderText && (
            <span
              className={`sidebar-text ${
                isResizing && !isHidden ? "fade-in" : isHidden ? "fade-out" : ""
              }`}
            >
              Log Out
            </span>
          )}
        </a>
      </div>
      <img src={Leaf} className={`logo-bottom ${isHidden ? "move" : ""}`} />
    </div>
  );
};

export default Sidebar;
