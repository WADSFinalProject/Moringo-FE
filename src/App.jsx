import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";

import TitlePage from "./Log in & Sign up/components/TitlePage.jsx";
import SignUpPage from "./Log in & Sign up/components/SignUpPage.jsx";
import UserSelectPage from "./Log in & Sign up/components/UserSelectPage.jsx";
import ProfileSettingsPage from "./Log in & Sign up/components/ProfileSettingsPage.jsx";
import ProfileEditorPage from "./Log in & Sign up/components/ProfileEditorPage.jsx";
import ManagePasswordPage from "./Log in & Sign up/components/ManagePasswordPage.jsx";

import ASidebar from "./Admin/components/AdminSidebar";
import ADashboard from "./Admin/components/AdminDashboard";
import AManageExistingUser from "./Admin/components/AdminManageExistingUser";
import AManagePendingUser from "./Admin/components/AdminManagePendingUser";
import AManageBatches from "./Admin/components/AdminManageBatches";
import AManageShipment from "./Admin/components/AdminManageShipment";
import AManageNotification from "./Admin/components/AdminManageNotification";

import XYZSidebar from "./XYZ/components/XYZSidebar";
import XYZDashboard from "./XYZ/components/XYZDashboard";
import XYZManageShipment from "./XYZ/components/XYZManageShipment";
import XYZUnPackages from "./XYZ/components/XYZUnscaledPackages";
import XYZRePackages from "./XYZ/components/XYZRescaledPackages";
import XYZNotification from "./XYZ/components/XYZManageNotification.jsx";

import CentraHomepage from "./Centra/components/CentraHomepage.jsx";
import CentraLeaves from "./Centra/components/CentraLeaves.jsx";
import CentraPowder from "./Centra/components/CentraPowder.jsx";
import CentraDeliveries from "./Centra/components/CentraDeliveries.jsx";

import HarborMainPage from "./Harbor/components/HarborMainPage";
import HarborScanPage from "./Harbor/components/HarborScanPage";
import HarborDetailPage from "./Harbor/components/HarborDetailPage";
import HarborNotifPage from "./Harbor/components/HarborNotificationPage";

function App() {
  const [currentAdminContent, setCurrentAdminContent] = useState("dashboard");
  const [currentXYZContent, setCurrentXYZContent] = useState("dashboard");

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
    }
  };

  const renderXYZContent = () => {
    switch (currentXYZContent) {
      case "dashboard":
        return <XYZDashboard onNavigate={setCurrentXYZContent} />;
      case "manageShip":
        return <XYZManageShipment onNavigate={setCurrentXYZContent} />;
      case "unPackages":
        return <XYZUnPackages onNavigate={setCurrentXYZContent} />;
      case "rePackages":
        return <XYZRePackages onNavigate={setCurrentXYZContent} />;
      case "notification":
        return <XYZNotification onNavigate={setCurrentXYZContent} />;
    }
  };

  const AdminRenderDashboard = () => (
    <div className="dashboard">
      <ASidebar
        onNavigate={setCurrentAdminContent}
        currentPage={currentAdminContent}
      />
      <div className="dashboard-content">{renderAdminContent()}</div>
    </div>
  );

  const XYZRenderDashboard = () => (
    <div className="dashboard">
      <XYZSidebar
        onNavigate={setCurrentXYZContent}
        currentPage={currentXYZContent}
      />
      <div className="dashboard-content">{renderXYZContent()}</div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Navigate to="/login" />} />
        <Route path="/login" Component={TitlePage} />
        <Route path="/signup" Component={SignUpPage} />
        <Route path="/userselect" Component={UserSelectPage} />
        <Route path="/profile" Component={ProfileSettingsPage} />
        <Route path="/profile-edit" Component={ProfileEditorPage} />
        <Route path="/manage-password" Component={ManagePasswordPage} />

        <Route path="/admin" element={<AdminRenderDashboard />} />
        <Route path="/xyz" element={<XYZRenderDashboard />} />

        <Route path="/centra/homepage" element={<CentraHomepage />} />
        <Route path="/centra/leaves" element={<CentraLeaves />} />
        <Route path="/centra/powder" element={<CentraPowder />} />
        <Route path="/centra/deliveries" element={<CentraDeliveries />} />

        <Route path="/harbor/homepage" element={<HarborMainPage />} />
        <Route path="/harbor/detail" element={<HarborDetailPage />} />
        <Route path="/harbor/scan" element={<HarborScanPage />} />
        <Route path="/harbor/notifications" element={<HarborNotifPage />} />
      </Routes>
    </Router>
  );
}

export default App;
