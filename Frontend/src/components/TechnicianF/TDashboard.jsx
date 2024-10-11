import React from 'react';
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

export const TDashboard = () => {
  const [ongoingJobs, setOngoingJobs] = useState([]);
  const [completedJobs, setCompletedJobs] = useState(2); // default value
  const [inProgressJobs, setInProgressJobs] = useState(2); // default value
  const [pendingJobs, setPendingJobs] = useState(5); // default value

  useEffect(() => {
    const fetchOngoingJobs = async () => {
      const ongoingJobData = [
        { id: 1, service: 'Electrical Repair', provider: 'John Electrician', date: '2024-09-25', status: 'In Progress' },
        { id: 2, service: 'Plumbing Maintenance', provider: 'Anna Plumber', date: '2024-09-26', status: 'Scheduled' },
      ];
      setOngoingJobs(ongoingJobData);
    };
    fetchOngoingJobs();
  }, []);

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
          {ongoingJobs.length > 0 ? (
            <ul className="tech-ongoing-jobs-list">
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
      </div>
      <div className="tech-chart-container">
        
        <Bar data={chartData} />
      </div>
    </>
  );
};