import React, { useState, useEffect } from "react";
import CentraHeader from "../../Assets/centra-main-header.svg";
import CentraBackArrow from "../../Assets/back-arrow-centra.svg";
import ProfilePictureMini from "../../Assets/modules/ProfilePictureMini.jsx";
import "../styles/CentraLeaves.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import SemiCircleProgressGauge from "./modules/SemicircleProgressGauge.jsx";
import LeafBatch from "./modules/LeafBatch.jsx";
import dayjs from "dayjs";
import success from "../../Assets/success-icon.svg";
import CircularCountdownTimer from "./modules/CircularCountdownTimer.jsx";
import { useNavigate } from "react-router-dom";

const CentraLeaves = () => {
  const [currentWeight, setCurrentWeight] = useState(0);
  const [isDisabled, setDisabled] = useState(true);
  const [dateValue, setDateValue] = useState(null);
  const [leavesBatches, setLeavesBatches] = useState([
    { date: "01/01/24", time: "13:00", batchId: "WL001", weight: 2.0 },
    { date: "01/01/24", time: "14:00", batchId: "WL002", weight: 5.5 },
    { date: "01/01/24", time: "14:30", batchId: "WL003", weight: 2.5 },
    { date: "01/01/24", time: "15:00", batchId: "WL004", weight: 3.2 },
  ]);
  const [showNotice, setShowNotice] = useState(true);
  const [open, setOpen] = useState(false);
  const [batchId, setBatchId] = useState("");
  const [weight, setWeight] = useState("");
  const [bgGaugeColor, setBgGaugeColor] = useState("progress-uncompleted");
  const [editBatchOpen, setEditBatchOpen] = useState(false);
  const [batchToEdit, setBatchToEdit] = useState(null);
  const [editWeight, setEditWeight] = useState("");
  const [editDateValue, setEditDateValue] = useState(null);
  const [timerFinished, setTimerFinished] = useState(false);
  const [productionStarted, setProductionStarted] = useState(false);
  const [dryStartedTime, setDryStartedTime] = useState("");
  const [dryDate, setDryDate] = useState("");
  const [dryEndTime, setDryEndTime] = useState("");
  const [dryEndDate, setDryEndDate] = useState("");
  const [timeFieldShow, setTimeFieldShow] = useState(false);
  const [inputDryOpen, setInputDryOpen] = useState(false);
  const [inputDryWeight, setInputDryWeight] = useState("");
  const [inputDryDateValue, setInputDryDateValue] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [resetTimer, setResetTimer] = useState(false);
  const [sufficientWeight, setSufficientWeight] = useState(false);
  const [previousBatchCompleted, setPreviousBatchCompleted] = useState(true);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  useEffect(() => {
    calculateTotalWeight();
  }, [leavesBatches]);

  const handleAddBatch = () => {
    if (!batchId || !weight || !dateValue) {
      alert("Please fill in all fields.");
      return;
    }

    const newBatch = {
      date: dayjs(dateValue).format("DD/MM/YY"),
      time: new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      batchId,
      weight: parseFloat(weight),
    };
    setLeavesBatches([...leavesBatches, newBatch]);
    handleClose();
    setBatchId("");
    setWeight("");
    setDateValue(null);
  };

  const calculateTotalWeight = () => {
    let totalWeight = leavesBatches.reduce(
      (acc, batch) => acc + batch.weight,
      0
    );

    if (totalWeight >= 30) {
      totalWeight = 30;
      setDisabled(false);
      setSufficientWeight(true);
      setShowNotice(false);
      setBgGaugeColor("progress-completed");
    }
    setCurrentWeight(totalWeight);
  };

  const handleOpenEdit = (batch) => {
    setBatchToEdit(batch);
    setEditWeight(batch.weight);
    setEditDateValue(dayjs(batch.date, "DD/MM/YY"));
    setEditBatchOpen(true);
  };

  const handleCloseEdit = () => setEditBatchOpen(false);

  const handleCloseInputDry = () => setInputDryOpen(false);

  const handleCloseConfirmation = () => {
    setInputDryOpen(false);
    setTimerFinished(false);
    setDryStartedTime("");
    setDryDate("");
    setDryEndTime("");
    setDryEndDate("");
    setInputDryWeight("");
    setInputDryDateValue(null);
    setTimeFieldShow(false);
    setResetTimer(true);
    setShowConfirmation(false);
    setPreviousBatchCompleted(true);
  };

  const handleConfirmEdit = () => {
    if (!editWeight || !editDateValue) {
      alert("Please fill in all fields.");
      return;
    }
    setLeavesBatches((prevBatches) =>
      prevBatches.map((batch) =>
        batch.batchId === batchToEdit.batchId
          ? {
              ...batch,
              weight: parseFloat(editWeight),
              date: dayjs(editDateValue).format("DD/MM/YY"),
            }
          : batch
      )
    );
    handleCloseEdit();
  };

  const handleDeleteBatch = () => {
    setLeavesBatches((prevBatches) =>
      prevBatches.filter((batch) => batch.batchId !== batchToEdit.batchId)
    );
    handleCloseEdit();
  };

  const handleTimerFinish = () => {
    console.log("Timer finished!");
    const dryEndDate = dayjs().format("DD/MM/YY");
    const dryEndTime = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setDryEndTime(dryEndTime);
    setDryEndDate(dryEndDate);
    setTimerFinished(true);
    setDisabled(true);
    setLeavesBatches([]);
    setSufficientWeight(false);
    setShowNotice(true);
    setProductionStarted(false);
    setPreviousBatchCompleted(false);
  };

  const handleStartProduction = () => {
    console.log("A");
    const dryStartDate = dayjs().format("DD/MM/YY");
    const dryStartTime = new Date().toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setProductionStarted(true);
    setResetTimer(false);
    setTimeFieldShow(true);
    setDryStartedTime(dryStartTime);
    setDryDate(dryStartDate);
    setCurrentWeight(0);
    setBgGaugeColor("progress-uncompleted");
  };

  const handleInputDry = () => {
    if (!inputDryWeight || !inputDryDateValue) {
      alert("Please fill in all fields.");
      return;
    }

    setShowConfirmation(true);
  };

  const handleMoveBack = () => {
    navigate("/centra/homepage");
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
            <h3 className="leaves-title">Leaves</h3>
            <div className="right-icons">
              <ProfilePictureMini />
            </div>
          </div>
        </div>
        <h3 className="subtitle-centra">Leaves Batches</h3>
        <Button
          variant="contained"
          disabled={
            (sufficientWeight && !showNotice) || !previousBatchCompleted
          }
          startIcon={<AddIcon sx={{ marginRight: "16px" }} />}
          sx={{
            borderRadius: "5vw",
            backgroundColor: "black",
            width: "78vw",
            fontWeight: "bold",
            textTransform: "none",
            height: "4.6vh",
            marginTop: "2.3vh",
            fontSize: "4vw",
          }}
          onClick={handleOpen}
        >
          Add
        </Button>
        <SemiCircleProgressGauge
          backgroundGaugeColor={bgGaugeColor}
          currentWeight={currentWeight}
        />
        <div
          className={`leaves-batches-container ${
            productionStarted ? "progress-uncompleted2" : "progress-completed"
          }`}
        >
          <div className="leaves-batches-header">
            <div style={{ textAlign: "center" }}>Date </div>
            <div style={{ textAlign: "center" }}>Batch ID</div>
            <div style={{ textAlign: "center" }}>Weight</div>
            <div className="color-change">Edit</div>
          </div>
          {leavesBatches.map((batch, index) => (
            <LeafBatch
              key={`leaf-batch-${index}`}
              date={batch.date}
              time={batch.time}
              batchId={batch.batchId}
              weight={batch.weight}
              onClick={() => handleOpenEdit(batch)}
              isDrying={productionStarted}
            />
          ))}
          {showNotice && (
            <div className="add-batches-notice">
              Add leaf batches to get started!
            </div>
          )}
        </div>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              backgroundColor: "#EBEBEB",
              borderRadius: "5vw",
            },
          }}
        >
          <DialogTitle sx={{ textAlign: "center" }}>
            Add Leaves Batch
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Batch ID"
              type="text"
              fullWidth
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              sx={{
                marginBottom: "16px",
                backgroundColor: "white",
              }}
            />
            <TextField
              margin="dense"
              label="Weight (kg)"
              type="number"
              fullWidth
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              sx={{
                marginBottom: "16px",
                backgroundColor: "white",
              }}
            />

            <DatePicker
              margin="dense"
              fullWidth
              label="Date"
              value={dateValue}
              onChange={(newValue) => setDateValue(newValue)}
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
          </DialogContent>

          <DialogActions
            sx={{ justifyContent: "center", marginBottom: "1.5vh" }}
          >
            <Button
              onClick={handleAddBatch}
              color="success"
              variant="contained"
            >
              Confirm
            </Button>
            <Button onClick={handleClose} color="error" variant="contained">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={editBatchOpen}
          onClose={handleCloseEdit}
          PaperProps={{
            sx: {
              backgroundColor: "#EBEBEB",
              borderRadius: "5vw",
            },
          }}
        >
          <DialogTitle sx={{ textAlign: "center" }}>
            {batchToEdit?.batchId}
            <IconButton
              aria-label="close"
              onClick={handleCloseEdit}
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent>
            <TextField
              margin="dense"
              label="Weight (kg)"
              type="number"
              fullWidth
              value={editWeight}
              onChange={(e) => setEditWeight(e.target.value)}
              sx={{ marginBottom: "16px", backgroundColor: "white" }}
            />

            <DatePicker
              margin="dense"
              fullWidth
              label="Date"
              value={editDateValue}
              onChange={(newValue) => setEditDateValue(newValue)}
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
          </DialogContent>

          <DialogActions
            sx={{ justifyContent: "center", marginBottom: "1.5vh" }}
          >
            <Button
              onClick={handleConfirmEdit}
              color="success"
              variant="contained"
            >
              Confirm Edit
            </Button>
            <Button
              onClick={handleDeleteBatch}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        {!productionStarted ? (
          <Button
            variant="contained"
            disabled={isDisabled}
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
            onClick={handleStartProduction}
          >
            START PRODUCTION
          </Button>
        ) : (
          <Button
            variant="contained"
            disabled={isDisabled}
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
        <h3 className="subtitle-centra">Leaves Drying</h3>
        <div
          className={`drying-section ${
            timerFinished ? `progress-completed` : `progress-uncompleted2`
          }`}
        >
          <div className="drying-batch-header">Active Drying Batch</div>
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
            >{`${dryDate}  ${dryStartedTime}`}</div>
            <h6 className="batch-field-title">Batch Finished</h6>
            <div
              className={`batch-time-field ${
                timerFinished ? "progress-uncompleted2" : "batch-grey-bg"
              }`}
            >{`${dryEndDate}  ${dryEndTime}`}</div>
            <Button
              variant="contained"
              disabled={timerFinished ? false : true}
              startIcon={<AddIcon sx={{ marginRight: "3px" }} />}
              onClick={() => {
                setInputDryOpen(true);
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
              Input Drying Details
            </Button>
          </div>
        </div>
        <Dialog
          open={inputDryOpen}
          onClose={handleCloseEdit}
          PaperProps={{
            sx: {
              backgroundColor: "#EBEBEB",
              borderRadius: "5vw",
              width: "80vw",
            },
          }}
        >
          <DialogTitle sx={{ textAlign: "center", fontWeight: "600" }}>
            {!showConfirmation ? "Input Drying Details" : null}
            <IconButton
              aria-label="close"
              onClick={handleCloseInputDry}
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
                  value={inputDryWeight}
                  onChange={(e) => setInputDryWeight(e.target.value)}
                  sx={{ marginBottom: "16px", backgroundColor: "white" }}
                />
                <DatePicker
                  margin="dense"
                  fullWidth
                  label="Date"
                  value={inputDryDateValue}
                  onChange={(newValue) => setInputDryDateValue(newValue)}
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
                <h4 className="confirmation-text">Drying Completed!</h4>
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
                        inputDryWeight
                      ).toFixed(1)} Kg`}</div>
                    </div>
                    <div className="confirmation-info-detail-full">
                      <div>Exp Date: </div>
                      <div style={{ fontWeight: "bold" }}>
                        {dayjs(inputDryDateValue).format("DD/MM/YYYY")}
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
                showConfirmation ? handleCloseConfirmation : handleInputDry
              }
              color="success"
              variant="contained"
              sx={{ textTransform: "none" }}
            >
              Confirm
            </Button>
            {showConfirmation ? undefined : (
              <Button
                onClick={handleCloseInputDry}
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

export default CentraLeaves;
