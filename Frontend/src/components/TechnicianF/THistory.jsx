import axios from 'axios';
import React, { useEffect, useState } from 'react';
var userid = localStorage.getItem("userInfo");
userid = JSON.parse(userid);

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
  const [history, setHistory] = useState([]);
  const user = userid._id
  useEffect( ()=> {
    fetchJobHistory()
  },[])
  const fetchJobHistory = async() => {
    try{
      const response = await axios.post('http://localhost:8088/jobRequestRoutes/joblisthistory',{user})
      setHistory(response.data.job || [])
      console.log(response.data)
    }
    catch(error){
      console.log('error fetching job history',error)
    }
  }
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
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Appointment Date </th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Rating</th>
          </tr>
        </thead>
        <tbody>
          {  history === 0 ? ( 
          <p>No Job Records</p> 
          ) : (
          history.map((job) => (
            <tr key={job.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{job.service}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{job.customerName}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{job.location}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{new Date(job.bookingDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })}</td>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{job.status}</td>
              {/* If status is completed, display rating */}
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                {job.status === 'Completed' ? job.rating : '-'}
              </td>
            </tr>
          ))
        )}
        </tbody>
      </table>
    </div>
  );
};

