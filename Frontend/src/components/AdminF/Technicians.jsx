import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react';
export const Technicians = () => {
  const [technicians,setTechnicians] = useState([])

  const [showForm, setShowForm] = useState(false);
  // Remove a technician (ban functionality)
  const handleRemoveTechnician = (id) => {
    setTechnicians(technicians.filter((tech) => tech.id !== id));
  };

  //displaying technicians
  useEffect(()=>{
    const fetchTech = async() => {
      try{
        const response = await axios.get('http://localhost:8088/userRoutes/technician/')
        setTechnicians(response.data)
      }
      catch(error){
        console.log('Error fetching Technicians',error)
      }
    }
    fetchTech();
  },[])
  return (
    <div className="technicians-management">
      <div className="head">
      <h2>Technicians Management</h2>
      </div>

      {/* Technician Table */}
      <table className="technicians-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Service</th>
            {/* /*<th>Rating</th>
            <th>Jobs Done</th> */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((technician) => (
            <tr key={technician.id}>
              <td>{technician.username}</td>
              <td>{technician.email}</td>
              <td>{technician.phoneNo}</td>
              <td>{technician.address}</td>
              <td>{technician.pincode}</td>
              <td>{technician.service}</td>
              {/* <td>{technician.rating.toFixed(1)}</td>
              <td>{technician.jobsDone}</td> */}
              <td>
                <button onClick={() => handleRemoveTechnician(technician.id)} className="remove">
                  Ban
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
