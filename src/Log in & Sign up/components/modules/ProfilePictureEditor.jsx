import React, { useState, useRef } from "react";
import AvatarEditor from "react-avatar-editor";
import Monke from "../../../Assets/monke.png";
import Edit from "../../../Assets/Ledit.svg";
import "../../styles/ProfileSettingsPage.css";

const ProfilePictureEditor = () => {
  const [image, setImage] = useState(Monke);
  const fileInputRef = useRef(null);

  const handleEditClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const containerStyle = {
    display: "flex", // Adjust as needed
  };

  const frameStyle = {
    position: "relative",
    borderRadius: "50%",
    border: "2px solid black",
    width: "175px", // Adjust as needed
    height: "175px", // Adjust as needed
    overflow: "hidden",
  };

  const editIconStyle = {
    position: "absolute",
    bottom: "7.5px",
    right: "7.5px",
    cursor: "pointer",
    zIndex: 2, // Ensure the edit icon appears above the frame
  };

  return (
    <div style={containerStyle} className="profile-picture">
      <div style={{ position: "relative" }}>
        <div style={frameStyle}>
          <AvatarEditor
            image={image}
            width={175} // Same as frame width
            height={175} // Same as frame height
            border={0}
            color={[255, 255, 255, 0.6]} // RGBA
            scale={1}
            rotate={0}
            disableCanvas={true} // Disable dragging and scaling
            borderRadius={100} // Half of frame width/height
          />
        </div>
        <img
          src={Edit}
          alt="Edit"
          style={editIconStyle}
          onClick={handleEditClick}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ProfilePictureEditor;
