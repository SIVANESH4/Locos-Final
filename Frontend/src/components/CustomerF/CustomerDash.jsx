import React from 'react'
import { CDashboard } from './CDashboard';
import { CServices } from './CServices';
import { CSidebar } from './CSidebar';
import { CHistory } from './CHistory';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerDash.css';
export const CustomerDash = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("dashboard");
    const [bookedServices, setBookedServices] = useState([]); // <--- Add this line

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <CDashboard />;
      case "services":
        return <CServices bookedServices={bookedServices} setBookedServices={setBookedServices}/>;
        case "history":
        return <CHistory />;
      default:
        return <CDashboard />;
    }
  };
  return (
    <>
    <div className="customer-dashboard">
        <div className="sidebar-content">
          <CSidebar
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
