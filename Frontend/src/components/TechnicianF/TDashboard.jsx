import React from 'react';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
var userid = localStorage.getItem("userInfo");
userid = JSON.parse(userid);

export const TDashboard = () => {
  const [ongoingJobs, setOngoingJobs] = useState([]||"No Ongoing Jobs");
  const [completedJobs, setCompletedJobs] = useState(2); // default value
  const [inProgressJobs, setInProgressJobs] = useState(2); // default value
  const [pendingJobs, setPendingJobs] = useState(5); // default value

  useEffect(() => {
    fetchOngoingJob();
  },[])
 
  const fetchOngoingJob = async(event) => {
    try{
      const response = await axios.post('http://localhost:8088/jobRequestRoutes/ongoingjob',{user:userid._id})
      setOngoingJobs(response.data.job)
      console.log(response.data)
    }
    catch(error){
      console.log(error)
    }
  }
  const chartData = {
    labels: [ 'In Progress', 'Pending', 'Completed'],
    datasets: [{
      label: 'Jobs',
      data: [inProgressJobs, pendingJobs, completedJobs],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
      ],
      borderColor: [
        'none',
        'none',
        'none',
      ],
      borderWidth: 0,
    }],
  };

  return (
    <>
      <div className="dashboard-boxes">
        <h2>Locos</h2>
        <div className="stats-grid">
          <div className="stat-box">
            <div><p>Total Jobs</p>
            <h3>In-Progress</h3></div><span>0</span>
          </div>
          <div className="stat-box">
            <div><p>Total Jobs</p>
            <h3>Pending</h3></div><span>0</span>
          </div>
          <div className="stat-box">
            <div><p>Total Jobs </p>
            <h3>Finished</h3></div><span>0</span>
          </div>
        </div>
      </div>
      <div className="techdash">
        <h3>Ongoing Works</h3>
        <div className="tech-ongoing-works">
            <ul className="tech-ongoing-jobs-list">
              {ongoingJobs.map((job) => (
                <li key={job.id} className="ongoing-job-item">
                  <h4>{job.service}</h4>
                  <p>Provider: {job.serviceProviderName}</p>
                  <p>Date: {job.bookingDate}</p>
                  <p>Status: {job.status}</p>
                  <button className="btn btn-dark">Cancel</button>
                </li>
              ))}
            </ul>
        </div>
      </div>
      <div className="tech-chart-container">
        
        <Bar data={chartData} />
      </div>
    </>
  );
};