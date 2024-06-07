import React, { useState } from "react";
import "../styles/LoggedOut.css";
import Leaf from "../../Assets/VectorLeaf.svg";
import Arrow from "../../Assets/Arrow.svg";
import { useNavigate } from "react-router-dom";

function LoggedOut({ onNavigate }) {
  const [shifted, setShifted] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isWrongInput, setIsWrongInput] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupAnim, setIsPopupAnim] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    console.log("Logging in with:", username, password);
    if (username == "TEST" && password == "TEST") {
      setIsWrongInput(false);
      setIsPopupOpen(false);
      navigate("/admin");
    } else if (username == "XYZ" && password == "XYZ") {
      setIsWrongInput(false);
      setIsPopupOpen(false);
      navigate("/admin");
    } else {
      setIsWrongInput(true);
      setIsPopupOpen(true);
    }
  };

  const handleShift = (shift) => {
    setShifted(shift);
  };

  const isFilled = (value) => {
    return value
      ? "a-top-bottom-container-input filled"
      : "a-top-bottom-container-input";
  };

  const isFormValid = username !== "" && password !== "";

  const handleClosePopup = () => {
    setIsPopupAnim(true);
    setTimeout(() => {
      setIsPopupOpen(false);
      setIsPopupAnim(false);
    }, 75);
  };

  return (
    <div className="logged-out">
      <div className={`login-container ${shifted ? "shifted" : ""}`}>
        <div className="a-top">
          {isPopupOpen && (
            <div
              className={`popup ${
                isPopupAnim ? "fade-out-up" : isPopupOpen ? "fade-in-down" : ""
              }`}
            >
              <span className="popup-text">
                Username: TEST / XYZ <br />
                Password: TEST / XYZ
              </span>
              <button
                className="popup-close"
                onClick={() => handleClosePopup()}
              >
                &times;
              </button>
            </div>
          )}
          <div className="a-top-top-container">
            <button
              className="a-top-top-button"
              onClick={() => handleShift(false)}
            >
              <img src={Arrow} />
            </button>
            <div className="a-top-top-container-text">
              <div className="a-top-top-container-text-title">MORINGO</div>
              <div className="a-top-top-container-text-subtitle">
                Admin & XYZ Login
              </div>
            </div>
          </div>
          <div className="a-top-bottom-container">
            <div className="a-top-bottom-container-text">
              Username or Email
              <input
                type="text"
                className={`${isFilled(username)} ${
                  isWrongInput ? "wrong-input" : ""
                }`}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              Password
              <input
                type="password"
                className={`${isFilled(password)} ${
                  isWrongInput ? "wrong-input" : ""
                }`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className={`a-top-bottom-button ${
                  !isFormValid ? "disabled" : ""
                }`}
                onClick={() => handleLogin()}
                disabled={!isFormValid}
              >
                Log In &gt;
              </button>
            </div>
          </div>
        </div>
        <div className="a-bottom">
          <div className="a-title1">Welcome to</div>
          <div className="a-title2">MORINGO</div>
          <button className="a-button" onClick={() => handleShift(true)}>
            Log In
          </button>
          <img className="a-image" src={Leaf} />
        </div>
      </div>
    </div>
  );
}

export default LoggedOut;
