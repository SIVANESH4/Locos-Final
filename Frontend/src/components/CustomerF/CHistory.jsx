// import React, { useEffect, useState } from 'react';
// var userid = localStorage.getItem("userInfo");
// userid=JSON.parse(userid);
// import axios from 'axios';

// export const CHistory = () => {
//   // Sample service history data
//   // const [services, setServices] = useState([
//   //   { id: 1, serviceType: 'Electrical', provider: 'John Doe', date: '2024-09-15', status: 'Completed', rating: 4.5 },
//   //   { id: 2, serviceType: 'Cleaning', provider: 'Jane Smith', date: '2024-09-10', status: 'In-progress', rating: null },
//   //   { id: 3, serviceType: 'Plumbing', provider: 'Mike Johnson', date: '2024-09-05', status: 'Completed', rating: null },
//   // ]);

//   const [selectedRating, setSelectedRating] = useState({});

//   // const handleRatingChange = (id, rating) => {
//   //   setServices(services.map(service => service.id === id ? { ...service, rating } : service));
//   //   setSelectedRating({ ...selectedRating, [id]: rating });
//   // };

//   const [services,setServices]= useState([])
//   const user = userid._id

//   useEffect(()=>{
//     fetchServiceData();
//   },[])

//   //fetching service history
//   const fetchServiceData = async(event) => {
//     // event.preventDefault()
//     try{ 
//       const response = await axios.post('http://localhost:8088/jobRequestRoutes/joblisthistory',{user})
//       const fetchedJobs = Array.isArray(response.data.job) ? response.data.job : []; 
//       setServices(fetchedJobs)
//     }
//     catch(error){
//       console.log('error fetching service history',error)
//     }
//   }

//   return (
//     <div className="service-history">
//       <h2>Your Service History</h2>

//       {/* Service List Table */}
//       <table className="service-history-table">
//         <thead>
//           <tr>
//             <th>Service Type</th>
//             <th>Provider</th>
//             <th>Date</th>
//             <th>Status</th>
//             {/* <th>Rating</th>
//             <th>Rate</th> */}
//           </tr>
//         </thead>
//         <tbody>
//           {Array.isArray(services) && services.length === 0 ? ( 
//                 <p>No Job Records</p> 
//           ) : (
//           services.map((service) => (
//             <tr key={service.id}>
//               <td>{service.service}</td>
//               <td>{service.serviceProviderName}</td>
//               <td>{new Date(service.bookingDate).toLocaleDateString('en-GB', {
//       day: '2-digit',
//       month: 'long',
//       year: 'numeric',
//     })}</td>
//               <td>{service.status}</td>
//               {/* <td>{service.rating ? service.rating.toFixed(1) : 'Not Rated'}</td> */}
//               {/* <td>
//                 {service.status === 'Completed' && !service.rating && (
//                   <select
//                     value={selectedRating[service.id] || ''}
//                     onChange={(e) => handleRatingChange(service.id, parseFloat(e.target.value))}
//                   >
//                     <option value="" disabled>Select Rating</option>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     <option value="5">5</option>
//                   </select>
//                 )}
//               </td> */}
//             </tr>
//           ))
//         )}
//         </tbody>
//       </table>
//     </div>
//   );
// };
import React, { useEffect, useState } from 'react';
import axios from 'axios';

var userid = localStorage.getItem("userInfo");
userid = JSON.parse(userid);

export const CHistory = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [feedback, setFeedback] = useState({ rating: '', feedbackText: '' });
  const user = userid._id;
  const [selectedServicer,setSelectedServicer] = useState([]);

  useEffect(() => {
    fetchServiceData();
  }, []);

  // Fetching service history
  const fetchServiceData = async () => {
    try {
      const response = await axios.post('http://localhost:8088/jobRequestRoutes/joblisthistory', { user });
      const fetchedJobs = Array.isArray(response.data.job) ? response.data.job : [];
      setServices(fetchedJobs);
    } catch (error) {
      console.log('Error fetching service history', error);
    }
  };

  // Handle feedback form submission
  const handleFeedbackSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8088/feedBackRoutes/feedbackform', {
        serviceId: selectedServicer._id,
        servicerId: selectedServicer.serviceProviderId,
        custId: user,
        rating: feedback.rating,
        feedbackText: feedback.feedbackText,
      });
      console.log('Feedback submitted successfully:', response.data);
      setSelectedService(null); // Close the feedback form
      setFeedback({ rating: '', feedbackText: '' }); // Reset feedback form
    } catch (error) {
      console.log('Error submitting feedback', error);
    }
  };

  // Display feedback form when the "Leave Feedback" button is clicked
  const handleFeedbackClick = (service) => {
    setSelectedService(service);
  };

  return (
    <div className="service-history">
      <h2>Your Service History</h2>

      {/* Service List Table */}
      <table className="service-history-table">
        <thead>
          <tr>
            <th>Service Type</th>
            <th>Provider Name</th>
            <th>Date</th>
            <th>Status</th>
            {/* <th>Feedback</th> */}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(services) && services.length === 0 ? (
            <p>No Job Records</p>
          ) : (
            services.map((service) => (
              <tr key={service.id}>
                <td>{service.service}</td>
                <td>{service.serviceProviderName}</td>
                <td>{new Date(service.bookingDate).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}</td>
                <td>{service.status}</td>
                  {/* <td>
                    {service.status === 'completed' && !service.rating && (
                      <button onClick={() => handleFeedbackClick(service)}>Leave Feedback</button>
                    )}
                  </td> */}
              </tr>
            ))
          )}
        </tbody>
      </table>
<br />
      {/* Feedback Form
      {selectedService && (
        <div className="feedback-form">
          <h3>Leave Feedback for {selectedService.serviceProviderName}</h3>
          <form onSubmit={handleFeedbackSubmit}>
            <label>
              Rating:
              <select
                value={feedback.rating}
                onChange={(e) => setFeedback({ ...feedback, rating: e.target.value })}
                required
                className='form-control'
              >
                <option value="" disabled>Select Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </label>
            <br />
            <label>
              Feedback:
              <textarea
                value={feedback.feedbackText}
                onChange={(e) => setFeedback({ ...feedback, feedbackText: e.target.value })}
                placeholder="Write your feedback here"
                required
                className='form-control'
              />
            </label>
            <br />
            <button type="submit" className='btn btn-dark'>Submit Feedback</button>
            <button type="button" className="btn btn-dark"onClick={() => setSelectedService(null)}>Cancel</button>
          </form>
          <br/>
        </div>
      )} */}
    </div>
  );
};

