import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js";
import { registerables } from "chart.js";
Chart.register(...registerables);

export const CDashboard = () => {
  const [ongoingJobs, setOngoingJobs] = useState([]);
  const [serviceStats, setServiceStats] = useState({
    booked: 20,
    finished: 15,
    cancelled: 5,
  });
  useEffect(() => {
    const fetchOngoingJobs = async () => {
      const ongoingJobData = [
        {
          id: 1,
          service: "Electrical Repair",
          provider: "John Electrician",
          date: "2024-09-25",
          status: "In Progress",
        },
        {
          id: 2,
          service: "Plumbing Maintenance",
          provider: "Anna Plumber",
          date: "2024-09-26",
          status: "Scheduled",
        },
      ];
      setOngoingJobs(ongoingJobData);
    };
    fetchOngoingJobs();
    fetchServiceStats();
  }, []);
  const fetchServiceStats = () => {
    setServiceStats({ booked: 20, finished: 15, cancelled: 5 });
  };
  const barData = {
    labels: ["Booked", "Finished", "Cancelled"],
    datasets: [
      {
        label: "Service Status",
        data: [
          serviceStats.booked,
          serviceStats.finished,
          serviceStats.cancelled,
        ],
        backgroundColor: ["grey", "#acaba9", "black"],
        borderColor: ["none", "none", "none"],
        borderWidth: 0,
      },
    ],
  };

  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Springfield",
    pincode: "987654",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    // Logic to save/update profile data
    alert("Profile updated successfully");
  };
  return (
    <>
      <div className="customer-dash">
        <h3>Ongoing Works</h3>
        <div className="ongoing-works">
          {ongoingJobs.length > 0 ? (
            <ul className="ongoing-jobs-list">
              {ongoingJobs.map((job) => (
                <li key={job.id} className="ongoing-job-item">
                  <h4>{job.service}</h4>
                  <p>Provider: {job.provider}</p>
                  <p>Date: {job.date}</p>
                  <p>Status: {job.status}</p>
                  <button className="btn btn-dark">Cancel</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No ongoing works at the moment.</p>
          )}
        </div>
        <div className="chart-section">
          <h5>Service Statistics</h5>
          <Bar data={barData} />
        </div>
        {/* Personal Details */}
        <form >
        <div className="personal-details">
          <h3>Personal Information</h3>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={userData.email}
              disabled
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={userData.phone}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={userData.address}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="pincode">Pincode</label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={userData.pincode}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <br />
          <button className="btn btn-dark" onClick={handleSave}>
            Save Changes
          </button>
        </div>
        </form>
        <div className="empty-black">
          <div className="circle" id="c1"></div>
          <div className="circle" id="c2"></div>
          <div className="circle" id="c3"></div>
          <div className="circle" id="c4"></div>
          <div className="circle" id="c5"></div>
          <div className="circle" id="c6"></div>
          <div className="circle" id="c7"></div>
          <div className="circle" id="c8"></div>
          <div className="circle" id="c9"></div>
          <div className="circle" id="c10"></div>
        </div>
      </div>
    </>
  );
};
