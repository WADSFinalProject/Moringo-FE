import React from "react";
import AvatarEditor from "react-avatar-editor";
import "../../styles/ProfileSettingsPage.css";
import { useState, useRef } from "react";

const ProfilePictureEditorSmaller = () => {
  const [image, setImage] = useState(
    "https://64.media.tumblr.com/2f65520a2b9a83f65c9e2ad92b1c7765/de931da06d9bdfcb-d8/s1280x1920/dddf56d88761221aca6ac5ada3d5ad7108838722.png"
  );
  const fileInputRef = useRef(null);

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

  // Define styles for the container and the circular frame
  const containerStyle = {
    display: "flex",
  };

  const frameStyle = {
    position: "relative",
    borderRadius: "50%",
    border: "2px solid black",
    width: "140px", // Adjust as needed
    height: "140px", // Adjust as needed
    overflow: "hidden",
  };

  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        <AvatarEditor
          image={image}
          width={140} // Same as frame width
          height={140} // Same as frame height
          border={0}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1}
          rotate={0}
          disableCanvas={true} // Disable dragging and scaling
          borderRadius={100} // Half of frame width/height
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

export default ProfilePictureEditorSmaller;
