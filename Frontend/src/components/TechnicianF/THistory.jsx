import React, { useState } from 'react';

export const THistory = () => {
  const defaultHistory = [
    {
      id: 1,
      user: 'John Doe',
      serviceType: 'Plumbing',
      location: '123 Street, City',
      completedDate: '2024-08-15',
      status: 'Completed',
      rating: 4.5,
    },
    {
      id: 2,
      user: 'Jane Smith',
      serviceType: 'Electrical',
      location: '456 Avenue, City',
      completedDate: '2024-08-10',
      status: 'Declined',
    },
    {
      id: 3,
      user: 'Mark Johnson',
      serviceType: 'Carpentry',
      location: '789 Road, City',
      completedDate: '2024-08-20',
      status: 'Completed',
      rating: 5,
    },
  ];

  // Set history data in state
  const [history, setHistory] = useState(defaultHistory);

  return (
    <div>
      <h1>Job History</h1>

      {/* History Table */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4', borderBottom: '2px solid #ddd' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Service</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Customer</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Location</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Date Completed/Declined</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Rating</th>
          </tr>
        </thead>
        <tbody>
          {history.map((job) => (
            <tr key={job.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{job.serviceType}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{job.user}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{job.location}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{job.completedDate}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{job.status}</td>
              {/* If status is completed, display rating */}
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {job.status === 'Completed' ? job.rating : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

