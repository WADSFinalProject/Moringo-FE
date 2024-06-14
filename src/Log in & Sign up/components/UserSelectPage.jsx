import React from "react";
import CentraLogo from "../../Assets/centra-logo.jsx";
import HarborLogo from "../../Assets/harbor-logo.jsx";
import XyzLogo from "../../Assets/xyz-logo.jsx";
import "../styles/UserSelectPage.css";
import { useState } from "react";
import Button from "./modules/button.jsx";
import success from "../../Assets/success-icon.svg";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserSelectPage = () => {
  const [activeButton, setActiveButton] = useState(null);
  const [centraFill, setCentraFill] = useState("white");
  const [xyzFill, setXyzFill] = useState("black");
  const [harborFill, setHarborFill] = useState("black");
  const [centraStroke, setCentraStroke] = useState("black");
  const [xyzStroke, setXyzStroke] = useState("black");
  const [harborStroke, setHarborStroke] = useState("black");
  const [open, setOpen] = useState(false);

  const handleButtonClick = (button) => {
    setActiveButton(button);

    // Reset fill and stroke colors for all buttons
    setCentraFill(button === "centra" ? "black" : "white");
    setCentraStroke(button === "centra" ? "white" : "black");
    setHarborFill(button === "harbor" ? "white" : "black");
    setHarborStroke(button === "harbor" ? "white" : "black");
    setXyzFill(button === "xyz" ? "white" : "black");
    setXyzStroke(button === "xyz" ? "white" : "black");
  };

  const handleConfirmation = () => {
    if (activeButton != null) {
      handleOpenDialog();
    }
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const navigate = useNavigate();

  const handleDialogConfirm = () => {
    navigate("/title");
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <div className="container-select">
        <div className="mobile-login-title">User Selection</div>
        <div className="mobile-login-subtitle">
          Please select appropriate user below
        </div>
        <button
          className={`button ${activeButton === "centra" ? "active" : ""}`}
          onClick={() => handleButtonClick("centra")}
        >
          <CentraLogo fill={centraFill} stroke={centraStroke} />
          <h3 className="selection-text">Centra</h3>
        </button>
        <button
          className={`button ${activeButton === "harbor" ? "active" : ""}`}
          onClick={() => handleButtonClick("harbor")}
        >
          <HarborLogo fill={harborFill} stroke={harborStroke} />
          <h3 className="selection-text">Harbor</h3>
        </button>
        <button
          className={`button last ${activeButton === "xyz" ? "active" : ""}`}
          onClick={() => handleButtonClick("xyz")}
        >
          <XyzLogo fill={xyzFill} stroke={xyzStroke} />
          <h3 className="selection-text">XYZ</h3>
        </button>
        <Button
          text="Confirm"
          color="black"
          onClick={handleConfirmation}
          width="57vw"
        />
        <Dialog open={open} PaperProps={{ sx: { borderRadius: "18px" } }}>
          <DialogTitle>
            <button className="close-button" onClick={handleCloseDialog}>
              X
            </button>
          </DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <img src={success} />
            <h4 className="success-text">SIGN UP SUCCESS!</h4>
            <div className="wait-text">
              Please wait for admin to approve your registration request and
              information
            </div>
            <Button
              text="Confirm"
              color="green"
              onClick={handleDialogConfirm}
              width="40vw"
              height="35px"
            ></Button>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default UserSelectPage;
