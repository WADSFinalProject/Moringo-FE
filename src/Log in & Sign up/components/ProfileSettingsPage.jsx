import Back from "../../Assets/back.svg";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import ProfilePictureEditor from "./modules/ProfilePictureEditor.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileSettingsPage.css";

export default function ProfileSettingsPage() {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/profile-edit");
  };

  const handleManagePassword = () => {
    navigate("/manage-password");
  };

  return (
    <>
      <div className="container-settings">
        <div className="mobile-header">
          <div className="top-settings">
            <img src={Back} alt="back button" />
            <h3>Profile</h3>
            <div style={{ width: "35px" }} />
          </div>
          <div style={{ zIndex: "1" }}>
            <ProfilePictureEditor />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h3 className="name">{"Placeholder name"}</h3>
            <p className="email">{"@Placeholder email"}</p>
          </div>
        </div>
        <Button
          variant="contained"
          endIcon={<EditIcon />}
          sx={{
            borderRadius: "50px",
            backgroundColor: "#2C533E",
            "&:hover": {
              backgroundColor: "#2C533E",
            },
            marginTop: "-3vh",
            width: "50vw",
            height: "6vh",
            textTransform: "none",
            fontSize: "16px",
          }}
          onClick={handleEditProfile}
        >
          Edit Profile
        </Button>
        <div className="bottom-section">
          <div className="rectangle">
            <Button
              startIcon={<LockIcon />}
              variant="contained"
              sx={{
                borderRadius: "10px",
                backgroundColor: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#FFFFFF",
                },
                color: "black",
                width: "70vw", // Adjust width as needed
                height: "6vh", // Adjust height as needed
                textTransform: "none",
                boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.4)", // Shadow
                fontSize: "15px",
              }}
              onClick={handleManagePassword}
            >
              Manage Password
            </Button>
          </div>
          <Button
            variant="contained"
            endIcon={<LogoutIcon />}
            sx={{
              borderRadius: "50px",
              backgroundColor: "#000000",
              "&:hover": {
                backgroundColor: "#000000",
              },
              width: "70vw",
              height: "6vh",
              marginTop: "auto",
              marginBottom: "40px",
              textTransform: "none",
              fontSize: "16px",
              position: "relative",
            }}
          >
            Log out
          </Button>
        </div>
      </div>
    </>
  );
}
