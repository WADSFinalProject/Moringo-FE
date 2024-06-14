import React from "react";
import AvatarEditor from "react-avatar-editor";
import "../../Centra/styles/CentraHomepage.css";
import { useState, useRef } from "react";

const ProfilePictureMini = () => {
  const [image, setImage] = useState(
    "https://64.media.tumblr.com/2f65520a2b9a83f65c9e2ad92b1c7765/de931da06d9bdfcb-d8/s1280x1920/dddf56d88761221aca6ac5ada3d5ad7108838722.png"
  );
  const fileInputRef = useRef(null);

  // Define styles for the container and the circular frame
  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "0vh", // Adjust as needed
  };

  const frameStyle = {
    borderRadius: "50%",
    border: "2px solid black",
    width: "40px", // Adjust as needed
    height: "40px", // Adjust as needed
    overflow: "hidden",
    position: "relative",
  };

  return (
    <div style={containerStyle}>
      <div style={frameStyle}>
        <AvatarEditor
          image={image}
          width={40} // Same as frame width
          height={40} // Same as frame height
          border={0}
          color={[255, 255, 255, 0.6]} // RGBA
          scale={1}
          rotate={0}
          borderRadius={100} // Half of frame width/height
        />
      </div>
    </div>
  );
};

export default ProfilePictureMini;
