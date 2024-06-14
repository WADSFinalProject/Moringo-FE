import Header2 from "../../Assets/centra-main-header.svg";
import arrow from "../../Assets/Arrow.svg";
import bell from "../../Assets/BellTemp.svg";
import "../styles/HarborDetailPage.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import success from "../../Assets/success.svg";
import { Dialog, DialogContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfilePictureMini from "../../Assets/modules/ProfilePictureMini.jsx";

const DetailPage = () => {
  const [shipmentId, setShipmentId] = useState("");
  const [receiverDetails, setReceiverDetails] = useState("");
  const [senderDetails, setSenderDetails] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [packageWeight, setPackageWeight] = useState("");
  const [confirmationDetailOpen, setConfirmationDetailOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    /* read from database */
    /* separate results from query to each attribute */
    /* assign each attribute */

    setShipmentId("#ID 13245678");
    setReceiverDetails("987 fuck");
    setSenderDetails("bronie");
    setPhoneNumber("+62 kokomi");
    setPhoneNumber2("+432 mahjong gremlin");
    setPackageWeight("your mom");
  }, []);

  const handleCloseConfirmationDetail = () => {
    setConfirmationDetailOpen(false);
  };

  return (
    <div className="harbor-page-container">
      <div className="harbor-top-section">
        <img className="harbor-main-header-extra" src={Header2} alt="header" />
        <div className="harbor-top-row">
          <img
            className="arrow"
            src={arrow}
            alt="Arrow"
            onClick={() => {
              navigate("/harbor/homepage");
            }}
          />
          <h3 className="harbor-other-title-extra">Package Detail</h3>
          <div className="right-icons">
            <img
              className="bell"
              src={bell}
              alt="Bell"
              onClick={() => {
                navigate("/harbor/notifications");
              }}
            />
            <ProfilePictureMini />
          </div>
        </div>
      </div>
      <div className="detail-page-textfields-container">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "90%",
          }}
        >
          <TextField
            id="package-id"
            label="Package ID"
            variant="outlined"
            value={shipmentId}
            disabled
            sx={{ width: "100%", marginBottom: "2vh", marginTop: "2vh" }}
          />
          <TextField
            id="receiver-details"
            label="Receiver Details"
            variant="outlined"
            value={receiverDetails}
            disabled
            sx={{ width: "100%", marginBottom: "2vh", marginTop: "2vh" }}
          />
          <TextField
            id="sender-details"
            label="Sender Details"
            variant="outlined"
            value={senderDetails}
            disabled
            sx={{ width: "100%", marginBottom: "2vh", marginTop: "2vh" }}
          />
          <TextField
            id="phone-number"
            label="Phone Number"
            variant="outlined"
            value={phoneNumber}
            disabled
            sx={{ width: "100%", marginBottom: "2vh", marginTop: "2vh" }}
          />
          <TextField
            id="phone-number-2"
            label="Phone Number"
            variant="outlined"
            value={phoneNumber2}
            disabled
            sx={{ width: "100%", marginBottom: "2vh", marginTop: "2vh" }}
          />
          <TextField
            id="package-weight"
            label="Package Weight"
            variant="outlined"
            value={packageWeight}
            disabled
            sx={{ width: "100%", marginBottom: "2vh", marginTop: "2vh" }}
          />
        </div>
        <div
          style={{
            display: "flex",
            width: "80%",
          }}
        >
          <Button
            variant="contained"
            style={{
              width: "100%",
              height: "50px",
              color: "white",
              borderRadius: "7.5vw",
              background: "black",
              "&:hover": {
                backgroundColor: "black",
              },
            }}
            onClick={() => {
              setConfirmationDetailOpen(true);
            }}
          >
            Send Notification
          </Button>
        </div>
      </div>
      <Dialog
        open={confirmationDetailOpen}
        onClose={handleCloseConfirmationDetail}
        PaperProps={{
          sx: {
            backgroundColor: "#EBEBEB",
            borderRadius: "2vw",
            width: "80vw",
          },
        }}
      >
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <img
            src={success}
            alt="success"
            className="success-img-confirmation"
          />
          <h3 className="success-text-confirmation">Notification Sent!</h3>
          <Button
            variant="contained"
            style={{
              width: "40%",
              height: "4vh",
              marginTop: "3vh",
              marginBottom: "2vh",
              color: "white",
              borderRadius: "7.5vw",
              background: "#2C3F31",
              "&:hover": {
                backgroundColor: "#2C3F31",
              },
            }}
            onClick={handleCloseConfirmationDetail}
          >
            Confirm
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DetailPage;
