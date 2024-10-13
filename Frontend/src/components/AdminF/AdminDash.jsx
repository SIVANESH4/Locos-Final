import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLocalStorage } from "react-use";
import { Dashboard } from "./Dashboard";
import { AllUsers } from "./AllUsers";
import { Technicians } from "./Technicians";
import { JobRequests } from "./JobRequests";
import { Services } from "./Services";
import { Sidebar } from "./Sidebar";
import "./AdminDash.css";

export const AdminDash = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useLocalStorage(
    "activeSection",
    "dashboard"
  );

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <Dashboard />;
      case "allusers":
        return <AllUsers />;

      case "jobrequest":
        return <JobRequests />;
      case "technicians":
        return <Technicians />;
      case "services":
        return <Services />;
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
