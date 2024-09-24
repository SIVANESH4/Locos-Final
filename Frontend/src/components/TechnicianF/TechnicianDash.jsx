import React from 'react'
import { useState } from 'react';
import { TSidebar } from './TSidebar';
import { THistory } from './THistory';
import { TDashboard } from './TDashboard';
import { useNavigate } from 'react-router-dom';
import './TechnicianDash.css';
import { TJobReq } from './TJobReq';
import { TProfile } from './TProfile';
export const TechnicianDash = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("dashboard");
    const [bookedServices, setBookedServices] = useState([]); // <--- Add this line

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <TDashboard />;
      case "profile":
        return <TProfile/>
      case "jobrequests":
        return <TJobReq/>
        case "history":
        return <THistory />;
      default:
        return <TDashboard />;
    }
  };
  return (
    <>
    <div className="technician-dashboard">
        <div className="sidebar-content">
          <TSidebar
            activeSection={activeSection}
            setActiveSection={setActiveSection}
            onLogout={() => navigate("/")}
            history={navigate}
          />
        </div>
        <div className="main-content">{renderContent()}</div>
      </div>
    </>
  )
}
