import React, { useState } from 'react';
export const TJobReq = () => {
  const defaultJobs = [
    {
      id: 1,
      user: 'John Doe',
      serviceType: 'Plumbing',
      location: '123 Street, City',
      bookingDate: '2024-09-22',
      status: 'Pending',
    },
    {
      id: 2,
      user: 'Jane Smith',
      serviceType: 'Electrical',
      location: '456 Avenue, City',
      bookingDate: '2024-09-23',
      status: 'Accepted',
    },
    {
      id: 3,
      user: 'Mark Johnson',
      serviceType: 'Carpentry',
      location: '789 Road, City',
      bookingDate: '2024-09-21',
      status: 'Completed',
    },
  ];

  // Set the default jobs in the state
  const [jobs, setJobs] = useState(defaultJobs);

  // Function to update the status of a job
  const updateJobStatus = (jobId, newStatus) => {
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, status: newStatus } : job
    );
    setJobs(updatedJobs);
  };

  return (
    <div className='tech-jobreq'>
      <h3>Job Request Management</h3>

      {/* List of Job Requests */}
      <div >
        {jobs.map((job) => (
          <div key={job.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }} className='job-card'>
            <h3>Service: {job.serviceType}</h3>
            <p><strong>Customer:</strong> {job.user}</p>
            <p><strong>Location:</strong> {job.location}</p>
            <p><strong>Date:</strong> {job.bookingDate}</p>
            <p><strong>Status:</strong> {job.status}</p>

            {/* Show Accept/Decline buttons if job is pending */}
            {job.status === 'Pending' && (
              <div>
                <button onClick={() => updateJobStatus(job.id, 'Accepted')}className="btn btn-dark">Accept</button>
                <button onClick={() => updateJobStatus(job.id, 'Declined')} className="btn btn-dark">Decline</button>
              </div>
            )}

            {/* Show Mark as Complete button if job is accepted */}
            {job.status === 'Accepted' && (
              <div>
                <button onClick={() => updateJobStatus(job.id, 'In Progress')} className="btn btn-dark" >Start Work</button>
                <button onClick={() => updateJobStatus(job.id, 'Completed')} className="btn btn-dark" >Mark as Complete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
