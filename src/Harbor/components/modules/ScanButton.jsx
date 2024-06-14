import PropTypes from "prop-types";
import "../../styles/HarborMainPage.css";
import scanbutton from "../../../Assets/scan.svg";

const ScanButton = ({ onClick }) => {
  return (
    <div className="button-box-container" onClick={onClick}>
      <button className="button-box">
        <img src={scanbutton} alt="Scan Button" />
        <span className="h-font-bold">Scan Barcode</span>
      </button>
    </div>
  );
};

ScanButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default ScanButton;
