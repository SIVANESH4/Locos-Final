import React from 'react'
import { useNavigate } from 'react-router-dom';
export const TSidebar = ({ activeSection, setActiveSection }) => {
    const navigate = useNavigate();
    return (
      <div className="sidebar">
        <center>
          <i class="fa-solid fa-circle-user"></i>
        </center>
        <center>
          <h3>Technician</h3>
        </center>
        <ul>
          <li
            className={activeSection === "dashboard" ? "active" : ""}
            onClick={() => setActiveSection("dashboard")}
          >
            Dashboard
          </li>
          <li
            className={activeSection === "profile" ? "active" : ""}
            onClick={() => setActiveSection("profile")}
          >
            Profile
          </li>
          <li
            className={activeSection === "jobrequests" ? "active" : ""}
            onClick={() => setActiveSection("jobrequests")}
          >
            Job Request
          </li>
          <li
            className={activeSection === "history" ? "active" : ""}
            onClick={() => setActiveSection("history")}
          >
            History
          </li>
          <li className="logout-link">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (confirm("Are you sure you want to logout?")) {
                  // Navigate to homepage
                  navigate("/");
                } else {
                  // Reload the same page
                  window.location.reload();
                }
              }}
            >
              Logout
            </a>
          </li>
        </ul>
      </div>
    );
}
