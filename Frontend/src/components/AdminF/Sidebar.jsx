import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export const Sidebar = ({ activeSection, setActiveSection }) => {
  
  return (
    <div className="sidebar">
        <center><i class="fa-solid fa-circle-user"></i></center>
        <center><h3>Admin</h3></center>
      <ul>
        <li className={activeSection === 'dashboard' ? 'active' : ''} onClick={() => setActiveSection('dashboard')}>
          Dashboard
        </li>
        <li className={activeSection === 'allusers' ? 'active' : ''} onClick={() => setActiveSection('allusers')}>
          All Users
        </li>
        <li className={activeSection === 'services' ? 'active' : ''} onClick={() => setActiveSection('services')}>
          Services
        </li>
        <li className={activeSection === 'technicians' ? 'active' : ''} onClick={() => setActiveSection('technicians')}>
          Technicians
        </li>
        <li className={activeSection === 'jobrequests' ? 'active' : ''} onClick={() => setActiveSection('jobrequests')}>
          JobRequests
        </li>
        <Link className='logout-link'><li>
        Logout
      </li></Link>
      </ul>
    </div>
  );
};

