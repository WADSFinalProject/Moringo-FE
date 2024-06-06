import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import "./App.css";
import ASidebar from "./Admin/Components/AdminSidebar";
import ADashboard from "./Admin/Components/AdminDashboard";
import AManageExistingUser from "./Admin/Components/AdminManageExistingUser";
import AManagePendingUser from "./Admin/Components/AdminManagePendingUser";
import AManageBatches from "./Admin/Components/AdminManageBatches";
import AManageShipment from "./Admin/Components/AdminManageShipment";
import AManageNotification from "./Admin/Components/AdminManageNotification";
import LoggedOut from "./Log in & Sign up/Components/LoggedOut";

function App() {
  const [currentAdminContent, setCurrentAdminContent] = useState("dashboard");

  const renderAdminContent = () => {
    switch (currentAdminContent) {
      case "dashboard":
        return <ADashboard onNavigate={setCurrentAdminContent} />;
      case "manageExist":
        return <AManageExistingUser onNavigate={setCurrentAdminContent} />;
      case "managePend":
        return <AManagePendingUser onNavigate={setCurrentAdminContent} />;
      case "manageBatch":
        return <AManageBatches onNavigate={setCurrentAdminContent} />;
      case "manageShip":
        return <AManageShipment onNavigate={setCurrentAdminContent} />;
      case "notification":
        return <AManageNotification onNavigate={setCurrentAdminContent} />;
      default:
        return <ADashboard />;
    }
  };

  const AdminDashboard = () => (
    <div className="dashboard">
      <ASidebar
        onNavigate={setCurrentAdminContent}
        currentPage={currentAdminContent}
      />
      <div className="dashboard-content">{renderAdminContent()}</div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoggedOut />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/xyz" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
