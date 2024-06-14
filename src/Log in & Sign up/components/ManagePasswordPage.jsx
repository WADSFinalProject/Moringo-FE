import React from "react";
import "../styles/ManagePasswordPage.css";
import Back from "../../Assets/back.svg";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Button from "./modules/button.jsx";
import { useNavigate } from "react-router-dom";

const ManagePasswordPage = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [showPassword2, setShowPassword2] = React.useState(false);

  const navigate = useNavigate();

  const handleManageBack = () => {
    navigate("/profile");
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleTogglePassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  return (
    <>
      <div className="container">
        <div className="mobile-header small">
          <div className="top-settings small">
            <img src={Back} alt="back button" onClick={handleManageBack} />
            <h2 className="manage-title">Manage Password</h2>
            <div style={{ width: "35px" }} />
          </div>
          <div className="textfield-container-edit manage-password-container">
            <h3>Enter Old Password</h3>
            <TextField
              required
              label="Old Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError(false);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword}
                      edge="end"
                      sx={{
                        "&:focus": { outline: "none" },
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <h3>Enter New Password</h3>
            <TextField
              required
              label="New Password"
              type={showPassword2 ? "text" : "password"}
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setConfirmPasswordError(false);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePassword2}
                      edge="end"
                      sx={{
                        "&:focus": { outline: "none" },
                      }}
                    >
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <div className="button-container-manage">
              <Button
                text="Update password"
                color="black"
                width="60vw"
                height="45px"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManagePasswordPage;
