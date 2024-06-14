import Greetings from "./modules/Greetings";
import ScanButton from "./modules/ScanButton";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="harbor-page-container">
      <Greetings />
      <ScanButton
        onClick={() => {
          navigate("/harbor/scan");
        }}
      />
    </div>
  );
};

export default MainPage;
