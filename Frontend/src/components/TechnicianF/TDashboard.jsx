import React from 'react';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
var userid = localStorage.getItem("userInfo");
userid = JSON.parse(userid);

export const TDashboard = () => {
  const [ongoingJobs, setOngoingJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState(''); // default value
  const [inProgressJobs, setInProgressJobs] = useState(''); // default value
  const [pendingJobs, setPendingJobs] = useState(''); // default value

  useEffect(() => {
    fetchOngoingJob();
    fetchJobCount();
  },[])
  
  const fetchOngoingJob = async(event) => {
    try{
      const response = await axios.post('http://localhost:8088/jobRequestRoutes/ongoingjob',{user:userid._id})
      const fetchedJobs = Array.isArray(response.data.job) ? response.data.job : []; 
      setOngoingJobs(fetchedJobs)
    }
    catch(error){
      console.log(error)
    }
  }

  //decline the job request
  const handleCancelJob = async(job) => {
    console.log(job)
    try{
      const response = await axios.post('http://localhost:8088/jobRequestRoutes/canceljobrequest',{custId:job.customerId,
        servicerId:job.serviceProviderId
      })
      console.log(response.data)
      fetchOngoingJob();
      window.location.reload();
    }
    catch(error){
      console.log(error)
    }
  }
  //count of job request
  const fetchJobCount = async(event) => {
    try{
      const response = await axios.post('http://localhost:8088/jobRequestRoutes/countjob',{id:userid._id})
      console.log(response.data)
      setCompletedJobs(response.data.complete)
      setInProgressJobs(response.data.progress)
      setPendingJobs(response.data.pending)
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
            <h3>In-Progress</h3></div><span>{inProgressJobs}</span>
          </div>
          <div className="stat-box">
            <div><p>Total Jobs</p>
            <h3>Pending</h3></div><span>{pendingJobs}</span>
          </div>
          <div className="stat-box">
            <div><p>Total Jobs </p>
            <h3>Finished</h3></div><span>{completedJobs}</span>
          </div>
        </div>
      </div>
      <div className="techdash">
        <h3>Ongoing Works</h3>
        <div className="tech-ongoing-works">
            <ul className="tech-ongoing-jobs-list">
            {/* {ongoingJobs.length === 0 ? (
            <p>No Ongoing Jobs Found</p>
             ) : ( */}
             {Array.isArray(ongoingJobs) && ongoingJobs.length === 0 ? (
              <p>No Ongoing Jobs Found</p>
            ) : (
              ongoingJobs.map((job) => (
                <li key={job.id} className="ongoing-job-item">
                  <h4>{job.service}</h4>
                  <p>Provider: {job.customerName}</p>
                  <p>Date: {job.bookingDate}</p>
                  <p>Status: {job.status}</p>
                  <button className="btn btn-dark" onClick={() => handleCancelJob(job)}>Cancel</button>
                </li>
              ))
             )}
            </ul>
        </div>
      </div>
      <div className="tech-chart-container">
        
        <Bar data={chartData} />
      </div>
    </>
  );
};