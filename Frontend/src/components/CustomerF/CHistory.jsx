import React, { useEffect, useState } from 'react';
var userid = localStorage.getItem("userInfo");
userid=JSON.parse(userid);
import axios from 'axios';

export const CHistory = () => {
  // Sample service history data
  // const [services, setServices] = useState([
  //   { id: 1, serviceType: 'Electrical', provider: 'John Doe', date: '2024-09-15', status: 'Completed', rating: 4.5 },
  //   { id: 2, serviceType: 'Cleaning', provider: 'Jane Smith', date: '2024-09-10', status: 'In-progress', rating: null },
  //   { id: 3, serviceType: 'Plumbing', provider: 'Mike Johnson', date: '2024-09-05', status: 'Completed', rating: null },
  // ]);

  const [selectedRating, setSelectedRating] = useState({});

  const handleRatingChange = (id, rating) => {
    setServices(services.map(service => service.id === id ? { ...service, rating } : service));
    setSelectedRating({ ...selectedRating, [id]: rating });
  };

  const [services,setServices]= useState([])
  const user = userid._id

  useEffect(()=>{
    fetchServiceData();
  },[])

  //fetching service history
  const fetchServiceData = async(event) => {
    // event.preventDefault()
    try{ 
      const response = await axios.post('http://localhost:8088/jobRequestRoutes/joblisthistory',{user})
      console.log(response.data)
      setServices(response.data.job)
    }
    catch(error){
      console.log('error fetching service history',error)
    }
  }

  return (
    <div className="service-history">
      <h2>Your Service History</h2>

      {/* Service List Table */}
      <table className="service-history-table">
        <thead>
          <tr>
            <th>Service Type</th>
            <th>Provider</th>
            <th>Date</th>
            <th>Status</th>
            <th>Rating</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service) => (
            <tr key={service.id}>
              <td>{service.service}</td>
              <td>{service.serviceProviderName}</td>
              <td>{service.bookingDate}</td>
              <td>{service.status}</td>
              <td>{service.rating ? service.rating.toFixed(1) : 'Not Rated'}</td>
              <td>
                {service.status === 'Completed' && !service.rating && (
                  <select
                    value={selectedRating[service.id] || ''}
                    onChange={(e) => handleRatingChange(service.id, parseFloat(e.target.value))}
                  >
                    <option value="" disabled>Select Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

