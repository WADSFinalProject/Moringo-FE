import { useState } from "react";
import Back from "../../Assets/back.svg";
import ProfilePictureEditorSmaller from "./modules/ProfilePictureEditorSmaller.jsx";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "./modules/button.jsx";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../styles/ProfileEditorPage.css";
import React from "react";

const ProfileEditorPage = () => {
  const [firstName, setFirstName] = React.useState("John");
  const [lastName, setLastName] = React.useState("Appleseed");
  const [username, setUsername] = React.useState("Apple.seed");
  const [email, setEmail] = React.useState("johnapp@gmail.com");
  const [phone, setPhone] = React.useState("(+1-876) 0812566789");
  const [gender, setGender] = useState("other");
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(false);
  const [emailError, setEmailError] = React.useState(false);
  const [usernameError, setUsernameError] = React.useState(false);
  const [phoneError, setPhoneError] = React.useState(false);
  const [upcomingPhoneError, setUpcomingPhoneError] = React.useState(false);

  const navigate = useNavigate();

  const handleEditBack = () => {
    navigate("/profile");
  };

  const handleConfirmChanges = () => {
    // Reset all error states
    setFirstNameError(!firstName);
    setLastNameError(!lastName);
    setUsernameError(!username);
    setEmailError(!email);
    setPhoneError(upcomingPhoneError);

    // Check if all fields are filled
    if (firstName && lastName && username && email && phone) {
      console.log("All not empty");
      // Handle form submission here
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;

    // Regex to match the country code part "(...any characters...) "
    const countryCodeRegex = /^\(.*?\)\s/;
    const match = value.match(countryCodeRegex);

    // If the input doesn't match the expected format, reset to the initial phone value
    if (!match) {
      setPhone(phone);
      setUpcomingPhoneError(true);
      return;
    }

    // Preserve the matched country code
    const countryCode = match[0];

    // Extract the rest of the input after the country code
    const phoneNumber = value.slice(countryCode.length).replace(/\D/g, "");

    // Update the phone state with the preserved country code and the numeric phone number
    setPhone(`${countryCode}${phoneNumber}`);
    setUpcomingPhoneError(false);
    setPhoneError(false);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div className="container-settings">
      <div className="mobile-header temp">
        <div className="top-settings" style={{ zIndex: "1" }}>
          <img src={Back} alt="back button" onClick={handleEditBack} />{" "}
          <h3>Profile</h3>
          <div style={{ width: "35px" }} />
        </div>
        <ProfilePictureEditorSmaller />
        <div className="textfield-container-edit">
          <TextField
            label="First Name"
            variant="outlined"
            error={firstNameError}
            helperText={firstNameError && "First Name is required"}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
              if (e.target.value) setFirstNameError(false);
            }}
          />

          <TextField
            label="Last Name"
            variant="outlined"
            error={lastNameError}
            helperText={lastNameError && "Last Name is required"}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
              if (e.target.value) setLastNameError(false);
            }}
          />

          <TextField
            label="Username"
            variant="outlined"
            error={usernameError}
            helperText={usernameError && "Username is required"}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (e.target.value) setUsernameError(false);
            }}
          />

          <TextField
            label="Email"
            variant="outlined"
            error={emailError}
            helperText={emailError && "Email is required"}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (e.target.value) setEmailError(false);
            }}
          />

          <TextField
            label="Phone"
            variant="outlined"
            error={phoneError}
            helperText={phoneError && "Phone number is required"}
            value={phone}
            onChange={handlePhoneChange}
          />
          <div className="form-container">
            <FormControl sx={{ width: "100%" }}>
              <FormLabel style={{ textAlign: "left", fontSize: "15px" }}>
                Gender
              </FormLabel>
              <RadioGroup
                row
                style={{ justifyContent: "space-between" }}
                value={gender}
                onChange={handleGenderChange}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                  style={{ textAlign: "left" }}
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                  style={{ textAlign: "center" }}
                />
                <FormControlLabel
                  value="other"
                  control={<Radio />}
                  label="Other"
                  style={{ textAlign: "right" }}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="button-container">
            <Button
              text="Confirm Changes"
              color="black"
              width="55vw"
              height="45px"
              onClick={handleConfirmChanges}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditorPage;
