import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Dashboard } from "./Dashboard";
import { AllUsers } from "./AllUsers";
import { Technicians } from "./Technicians";
import { Services } from "./Services";
import { JobRequests } from "./JobRequests";
import { Sidebar } from "./Sidebar";
import "./AdminDash.css";
export const AdminDash = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "allusers":
        return <AllUsers />;
      case "technicians":
        return <Technicians />;
      case "jobrequests":
        return <JobRequests />;
      case "services":
        return <Services />;
      default:
        return <Dashboard />;
    }
  };
  return (
    <>
      <div className="admin-dashboard">
        <div className="sidebar-content">
          <Sidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            onLogout={() => navigate("/")}
            history={navigate}
          />
        </div>
        <div className="main-content">{renderContent()}</div>
      </div>
    </>
  );
};
