import React, { useState, useEffect } from "react";
import CentraHeader from "../../Assets/centra-main-header.svg";
import CentraBackArrow from "../../Assets/back-arrow-centra.svg";
import ProfilePictureMini from "./modules/ProfilePictureMini.jsx";
import "../styles/CentraPowder.css";
import dayjs from "dayjs";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import CircularCountdownTimer from "./modules/CircularCountdownTimer.jsx";
import DryLeafBatch from "./modules/DryLeafBatch.jsx";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import success from "../../Assets/success-icon.svg";
import { useNavigate } from "react-router-dom";

const CentraPowder = () => {
  const [timerFinished, setTimerFinished] = useState(false);
  const [productionStarted, setProductionStarted] = useState(false);
  const [dryLeavesBatches, setDryLeavesBatches] = useState([
    { date: "01/01/24", time: "13:00", batchId: "DL001", weight: 2.0 },
    { date: "01/01/24", time: "14:00", batchId: "DL002", weight: 5.5 },
    { date: "01/01/24", time: "14:30", batchId: "DL003", weight: 2.5 },
    { date: "01/01/24", time: "15:00", batchId: "DL004", weight: 3.2 },
    { date: "02/01/24", time: "13:00", batchId: "DL005", weight: 2.0 },
    { date: "02/01/24", time: "14:00", batchId: "DL006", weight: 5.5 },
    { date: "02/01/24", time: "14:30", batchId: "DL007", weight: 2.5 },
    { date: "02/01/24", time: "15:00", batchId: "DL008", weight: 3.2 },
  ]);
  const [resetTimer, setResetTimer] = useState(false);
  const [timeFieldShow, setTimeFieldShow] = useState(false);
  const [powderStartedTime, setPowderStartedTime] = useState("");
  const [powderDate, setPowderDate] = useState("");
  const [powderEndTime, setPowderEndTime] = useState("");
  const [powderEndDate, setPowderEndDate] = useState("");
  const [selectedBatches, setSelectedBatches] = useState([]);
  const [requiredSelections, setRequiredSelections] = useState(1);
  const [inputPowderOpen, setInputPowderOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [inputPowderWeight, setInputPowderWeight] = useState("");
  const [inputPowderDateValue, setInputPowderDateValue] = useState(null);
  const [previousBatchCompleted, setPreviousBatchCompleted] = useState(true);

  const navigate = useNavigate();

  const handleBatchClick = (batchId) => {
    setSelectedBatches((prevSelected) => {
      if (prevSelected.includes(batchId)) {
        return prevSelected.filter((no) => no !== batchId);
      } else {
        return [...prevSelected, batchId];
      }
    });
  };

  const handleSelectionChange = (number) => {
    setSelectedBatches([]);
    setRequiredSelections(number);
  };

  const handleTimerFinish = () => {
    console.log("Timer finished!");
    const powderEndDate = dayjs().format("DD/MM/YY");
    const powderEndTime = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setTimerFinished(true);
    setPowderEndTime(powderEndTime);
    setPowderEndDate(powderEndDate);
    setDryLeavesBatches(
      dryLeavesBatches.filter(
        (batch) => !selectedBatches.includes(batch.batchId)
      )
    );
    setSelectedBatches([]);
    setProductionStarted(false);
    setPreviousBatchCompleted(false);
  };

  const isDisabled = (batchId) =>
    !previousBatchCompleted ||
    (selectedBatches.length >= requiredSelections &&
      !selectedBatches.includes(batchId));

  const handleStartPowderProduction = () => {
    console.log("dasli;fj;");
    const powderStartDate = dayjs().format("DD/MM/YY");
    const powderStartTime = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    setPowderStartedTime(powderStartTime);
    setPowderDate(powderStartDate);
    setTimeFieldShow(true);
    setResetTimer(false);
    setProductionStarted(true);
  };

  const handleCloseInput = () => {
    setInputPowderOpen(false);
  };

  const handleInputPowder = () => {
    if (!inputPowderWeight || !inputPowderDateValue) {
      alert("Please fill in all fields.");
      return;
    }

    setShowConfirmation(true);
    console.log("Never gonna give you up");
  };

  const handleMoveBack = () => {
    navigate("/centra/homepage");
  };

  const handleCloseConfirmation = () => {
    setInputPowderOpen(false);
    setTimerFinished(false);
    setPowderStartedTime("");
    setPowderDate("");
    setPowderEndTime("");
    setPowderEndDate("");
    setInputPowderWeight("");
    setInputPowderDateValue(null);
    setTimeFieldShow(false);
    setResetTimer(true);
    setShowConfirmation(false);
    setPreviousBatchCompleted(true);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="container-homepage">
        <div className="centra-top-section">
          <img className="centra-main-header" src={CentraHeader} alt="header" />
          <div className="centra-top-row">
            <img
              src={CentraBackArrow}
              alt="Back"
              className="back-arrow"
              onClick={handleMoveBack}
            />
            <h3 className="leaves-title">Powder</h3>
            <div className="right-icons">
              <ProfilePictureMini />
            </div>
          </div>
        </div>
        <h3 className="subtitle-centra">Dry Leaves Batch</h3>
        <div
          className={`drying-section ${
            timerFinished ? `progress-completed` : `progress-uncompleted2`
          } powder-version`}
        >
          <div className="drying-batch-header">Active Powder Batch</div>
          <CircularCountdownTimer
            onTimerFinish={handleTimerFinish}
            start={productionStarted}
            reset={resetTimer}
          />
          <div className="drying-batch-footer">
            <h6 className="batch-field-title">Batch Started</h6>
            <div
              className={`batch-time-field ${
                timeFieldShow ? "progress-uncompleted2" : "batch-grey-bg"
              }`}
            >{`${powderDate}  ${powderStartedTime}`}</div>
            <h6 className="batch-field-title">Batch Finished</h6>
            <div
              className={`batch-time-field ${
                timerFinished ? "progress-uncompleted2" : "batch-grey-bg"
              }`}
            >{`${powderEndDate}  ${powderEndTime}`}</div>
            <Button
              variant="contained"
              disabled={timerFinished ? false : true}
              startIcon={<AddIcon sx={{ marginRight: "3px" }} />}
              onClick={() => {
                setInputPowderOpen(true);
              }}
              sx={{
                borderRadius: "5vw",
                backgroundColor: "black",
                width: "73vw",
                fontWeight: "600",
                height: "4.6vh",
                marginTop: "2.3vh",
                marginBottom: "3vh",
                fontSize: "4.4vw",
                boxShadow: "0px 4px 7px rgba(0, 0, 0, 0.6)",
                textTransform: "none",
              }}
            >
              Input Powdering Details
            </Button>
          </div>
        </div>
        <div
          className={`leaves-batches-container ${
            productionStarted ? "progress-uncompleted2" : "progress-completed"
          }`}
        >
          <div className="powder-batch-number-button-container">
            <Button
              sx={{
                backgroundColor: requiredSelections === 1 ? "#ADBB7F" : "white",
                color: requiredSelections === 1 ? "white" : "black",
                borderRadius: "3vw",
                width: "27%",
                marginLeft: "1.5%",
                marginRight: "1.5%",
                border: "solid 1px #CCCCCC",
                "&:hover": {
                  backgroundColor:
                    requiredSelections === 1 ? "#ADBB7F" : "white",
                },
              }}
              onClick={() => handleSelectionChange(1)}
            >
              1 day
            </Button>
            <Button
              sx={{
                backgroundColor: requiredSelections === 3 ? "#ADBB7F" : "white",
                color: requiredSelections === 3 ? "white" : "black",
                borderRadius: "3vw",
                width: "27%",
                marginLeft: "1.5%",
                marginRight: "1.5%",
                border: "solid 1px #CCCCCC",
                "&:hover": {
                  backgroundColor:
                    requiredSelections === 3 ? "#ADBB7F" : "white",
                },
              }}
              onClick={() => handleSelectionChange(3)}
            >
              3 days
            </Button>
            <Button
              sx={{
                backgroundColor: requiredSelections === 7 ? "#ADBB7F" : "white",
                color: requiredSelections === 7 ? "white" : "black",
                borderRadius: "3vw",
                width: "27%",
                marginLeft: "1.5%",
                marginRight: "1.5%",
                border: "solid 1px #CCCCCC",
                "&:hover": {
                  backgroundColor:
                    requiredSelections === 7 ? "#ADBB7F" : "white",
                },
              }}
              onClick={() => handleSelectionChange(7)}
            >
              7 days
            </Button>
          </div>
          <div className="leaves-batches-header centra-version2">
            <div style={{ textAlign: "center" }}>Date </div>
            <div style={{ textAlign: "center" }}>Batch ID</div>
            <div style={{ textAlign: "center" }}>Weight</div>
          </div>
          <div className="dry-leaf-batch-container">
            {dryLeavesBatches.map((batch, index) => (
              <DryLeafBatch
                key={`dry-leaf-batch-${index}`}
                date={batch.date}
                time={batch.time}
                batchId={batch.batchId}
                weight={batch.weight}
                isSelected={selectedBatches.includes(batch.batchId)}
                isDisabled={isDisabled(batch.batchId)}
                onClick={() => handleBatchClick(batch.batchId)}
              />
            ))}
          </div>
          <div className="add-batches-notice">
            Add dry leaf batches to get started!
          </div>
        </div>

        {!productionStarted ? (
          <Button
            variant="contained"
            disabled={!(selectedBatches.length >= requiredSelections)}
            sx={{
              borderRadius: "1.5vw",
              backgroundColor: "black",
              width: "78vw",
              fontWeight: "bold",
              height: "4.6vh",
              marginTop: "2.3vh",
              marginBottom: "2.3vh",
              fontSize: "4.5vw",
              boxShadow: "0px 4px 7px rgba(0, 0, 0, 0.6)",
              "&:hover": {
                backgroundColor: "currentColor",
              },
            }}
            onClick={handleStartPowderProduction}
          >
            START PRODUCTION
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{
              borderRadius: "1.5vw",
              backgroundColor: "#ADBB7F",
              width: "78vw",
              fontWeight: "bold",
              height: "4.6vh",
              marginTop: "2.3vh",
              marginBottom: "2.3vh",
              fontSize: "4.5vw",
              boxShadow: "0px 4px 7px rgba(0, 0, 0, 0.6)",
              "&:hover": {
                backgroundColor: "#ADBB7F",
              },
            }}
          >
            PRODUCTION ONGOING
          </Button>
        )}
        <Dialog
          open={inputPowderOpen}
          onClose={handleCloseInput}
          PaperProps={{
            sx: {
              backgroundColor: "#EBEBEB",
              borderRadius: "5vw",
              width: "80vw",
            },
          }}
        >
          <DialogTitle sx={{ textAlign: "center", fontWeight: "600" }}>
            {!showConfirmation ? "Input Powdering Details" : null}
            <IconButton
              aria-label="close"
              onClick={handleCloseInput}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent
            sx={
              !showConfirmation
                ? {}
                : {
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                  }
            }
          >
            {!showConfirmation ? (
              <>
                <TextField
                  margin="dense"
                  label="Weight (kg)"
                  type="number"
                  fullWidth
                  value={inputPowderWeight}
                  onChange={(e) => setInputPowderWeight(e.target.value)}
                  sx={{ marginBottom: "16px", backgroundColor: "white" }}
                />
                <DatePicker
                  margin="dense"
                  fullWidth
                  label="Date"
                  value={inputPowderDateValue}
                  onChange={(newValue) => setInputPowderDateValue(newValue)}
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
              </>
            ) : (
              <>
                <img src={success} />
                <h4 className="confirmation-text">Powdering Completed!</h4>
                <div className="confirmation-info">
                  <div className="batch-overview-drying">Batch Overview</div>
                  <div className="confirmation-info-details confirmation-info-detail-full">
                    <div>ID: </div>
                    <div style={{ fontWeight: "bold" }}>DL001</div>
                  </div>
                  <div className="confirmation-info-details">
                    <div className="confirmation-info-detail-full">
                      <div>Weight: </div>
                      <div style={{ fontWeight: "bold" }}>{`${parseFloat(
                        inputPowderWeight
                      ).toFixed(1)} Kg`}</div>
                    </div>
                    <div className="confirmation-info-detail-full">
                      <div>Exp Date: </div>
                      <div style={{ fontWeight: "bold" }}>
                        {dayjs(inputPowderDateValue).format("DD/MM/YYYY")}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>

          <DialogActions
            sx={{
              justifyContent: "center",
              marginBottom: "1.5vh",
              marginTop: showConfirmation ? 0 : "1.5vh",
            }}
          >
            <Button
              onClick={
                showConfirmation ? handleCloseConfirmation : handleInputPowder
              }
              color="success"
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              Confirm
            </Button>
            {showConfirmation ? undefined : (
              <Button
                onClick={handleCloseInput}
                color="error"
                variant="contained"
                sx={{ textTransform: "none" }}
              >
                Cancel
              </Button>
            )}
          </DialogActions>
        </Dialog>
      </div>
    </LocalizationProvider>
  );
};

export default CentraPowder;
