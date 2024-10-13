import React from 'react'
import { useState } from 'react';
export const JobRequests = () => {
  const [jobRequests, setJobRequests] = useState([
    { id: 1, user: 'Alice Doe', service: 'Electrical', address: '12 Main St', pincode: '123456', technician: 'John Doe', status: 'Pending' },
    { id: 2, user: 'Bob Smith', service: 'Plumbing', address: '456 Oak St', pincode: '654321', technician: '', status: 'Pending' },
    { id: 3, user: 'Charlie Brown', service: 'Cleaning', address: '789 Pine St', pincode: '987654', technician: 'Mike Johnson', status: 'Completed' },
  ]);

  const [filterStatus, setFilterStatus] = useState('');

  // Update job status
  const handleUpdateStatus = (jobId, newStatus) => {
    const updatedJobs = jobRequests.map((job) =>
      job.id === jobId ? { ...job, status: newStatus } : job
    );
    setJobRequests(updatedJobs);
  };

  // Handle filtering job requests by status
  const filteredJobRequests = jobRequests.filter((job) =>
    filterStatus ? job.status === filterStatus : true
  );

  return (
    <div className="job-requests-management">
     <div className="head">
     <h2>Job Requests Management</h2>

{/* Filter by Status Dropdown */}
<div className="filter-dropdown">
  <label htmlFor="status-filter">Filter by Status: </label>
  <select
    id="status-filter"
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
  >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      </div>

      {/* Job Requests Table */}
      <table className="job-requests-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>User</th>
            <th>Service</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Technician</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobRequests.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.user}</td>
              <td>{job.service}</td>
              <td>{job.address}</td>
              <td>{job.pincode}</td>
              <td>{job.technician || 'Unassigned'}</td>
              <td>{job.status}</td>
              <td>
                {job.status !== 'Cancelled' && (
                  <button onClick={() => handleUpdateStatus(job.id, 'Cancelled')}>
                    Cancel
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
