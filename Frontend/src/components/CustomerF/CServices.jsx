// import React, { useState, useEffect } from "react";
// import axios from "axios";

// export const CServices = () => {
//   const [workers, setWorkers] = useState([]);
//   const [bookedServices, setBookedServices] = useState([]);
//   const [selectedService, setSelectedService] = useState("All Services");
//   const [selectedLocation, setSelectedLocation] = useState("Default");
//   const [selectedRating, setSelectedRating] = useState("Default");
//   const [services, setServices] = useState([]);
//   const [showForm, setShowForm] = useState({});
//   const [name, setName] = useState("");
//   const [location, setLocation] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [issue, setIssue] = useState("");
//   const [appointmentDate, setAppointmentDate] = useState("");
//   const [selectedWorker,setSelectedWorker] = useState(null)
//   const handleBookNow = (worker) => {
//     console.log("Book Now button clicked");
//     setSelectedWorker(worker)
//     console.log(selectedWorker)
//     setShowForm((prevShowForm) => ({ ...prevShowForm, [worker]: true }));
//   };

//   const handleSubmit = (event, workerId) => {
//     event.preventDefault();
//     console.log("Form submitted:", { name, location, phoneNumber, issue,appointmentDate  });
//     setShowForm((prevShowForm) => ({ ...prevShowForm, [workerId]: false }));
//   };

//   const handleCancel = (workerId) => {
//     setShowForm((prevShowForm) => ({ ...prevShowForm, [workerId]: false }));
//   };

//   useEffect(() => {
//     fetchTechnician();
//     fetchService();
//   }, []);

//   const fetchTechnician = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8088/userRoutes/techniciandetails"
//       );
//       setWorkers(response.data.tech);
//     } catch (error) {
//       console.log("Error fetching Technicians Details", error);
//     }
//   };

//   const fetchService = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8088/serviceRoutes/service"
//       );
//       setServices(response.data.service);
//     } catch (error) {
//       console.log("Error fetching service", error);
//     }
//   };

//   const handleBookService = (worker) => {
//     const updatedBookedServices = [...bookedServices, worker];
//     setBookedServices(updatedBookedServices);
//     localStorage.setItem(
//       "bookedServices",
//       JSON.stringify(updatedBookedServices)
//     );
//     alert(`Service booked for ${worker.name}`);
//   };

//   const getRatingValue = (rating) => {
//     switch (rating) {
//       case "more than 4.5":
//         return [4.5, 5];
//       case "more than 4.0":
//         return [4.0, 4.5];
//       case "more than 3.5":
//         return [3.5, 4.0];
//       default:
//         return [0, 5];
//     }
//   };

//   const filteredWorkers = workers.filter((worker) => {
//     const [minRating, maxRating] = getRatingValue(selectedRating);
//     return (
//       (selectedService === "All Services" ||
//         worker.service === selectedService) &&
//       (selectedLocation === "Default" ||
//         worker.location === selectedLocation) &&
//       worker.rating >= minRating &&
//       worker.rating <= maxRating
//     );
//   });

//   return (
//     <div className="services-page-dash">
//       <div className="head">
//         <h2>{selectedService}</h2>
//         <div className="drop-down">
//           <select
//             value={selectedService}
//             onChange={(e) => setSelectedService(e.target.value)}
//           >
//             <option value="All Services">All Services</option>
//             {services.map((service, index) => (
//               <option key={index} value={service.servicename}>
//                 {service.servicename}
//               </option>
//             ))}
//           </select>
//           <select
//             value={selectedLocation}
//             onChange={(e) => setSelectedLocation(e.target.value)}
//           >
//             <option value="Default">By Location</option>
//             <option value="Near me">Near Me</option>
//             <option value="Madurai">Madurai</option>
//             <option value="Chennai">Chennai</option>
//             <option value="Bangalore">Bangalore</option>
//           </select>
//           <select
//             value={selectedRating}
//             onChange={(e) => setSelectedRating(e.target.value)}
//           >
//             <option value="Default">Ratings</option>
//             <option value="more than 4.5">More than 4.5</option>
//             <option value="more than 4.0">More than 4.0</option>
//             <option value="more than 3.5">More than 3.5</option>
//           </select>
//         </div>
//       </div>
//       <div className="services-grid-dash">
//         {workers.length > 0 ? (
//           workers.map((worker) => (
//             <div className="worker-card" key={worker.id}>
//               <center>
//                 <i className="fa-solid fa-circle-user"></i>
//                 <h4>{worker.username}</h4>
//                 <p>Service: {worker.service}</p>
//                 <p>Location: {worker.address}</p>
//                 <p>Rating: {worker.rating}</p> 
//                 <button
//                   onClick={() => handleBookNow(worker.id)}
//                   className="btn btn-dark"
//                 >
//                   Book Now
//                 </button>
//               </center>
//               {showForm[worker.id] && (
//                 <div className="modal" style={{ display: "block" }}>
//                   <div className="modal-content-customer">
//                     <center>
//                       <h2>Book a Service</h2>
//                     </center>
//                     <form onSubmit={(e) => handleSubmit(e, worker.id)}>
//                       <label>
//                         Name:
//                         <input
//                           type="text"
//                           value={name}
//                           onChange={(e) => setName(e.target.value)}
//                           className="form-control"
//                         />
//                       </label>
//                       <br />
//                       <label>
//                         Location:
//                         <input
//                           type="text"
//                           value={location}
//                           onChange={(e) => setLocation(e.target.value)}
//                           className="form-control"
//                         />
//                       </label>
//                       <br />
//                       <label>
//                         Phone Number:
//                         <input
//                           type="tel"
//                           value={phoneNumber}
//                           onChange={(e) => setPhoneNumber(e.target.value)}
//                           className="form-control"
//                         />
//                       </label>
//                       <br />
//                       <label>
//                         Issue:
//                         <textarea
//                           value={issue}
//                           onChange={(e) => setIssue(e.target.value)}
//                           className="form-control"
//                         />
//                       </label>
//                       <br />
//                       <label>
//                         Appointment Date:
//                         <input
//                           type="date"
//                           value={appointmentDate}
//                           onChange={(e) => setAppointmentDate(e.target.value)}
//                           className="form-control"
//                         />
//                       </label>
//                       <br />
//                       <button type="submit" className="btn btn-dark">
//                         Submit
//                       </button>
//                       <button
//                         type="button"
//                         className="btn btn-dark"
//                         onClick={() => handleCancel(worker.id)}
//                       >
//                         Cancel
//                       </button>
//                     </form>
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))
//         ) : (
//           <div className="no-results">
//             <p>No results found.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
import React, { useState, useEffect } from "react";
import axios from "axios";
var userid = localStorage.getItem("userInfo");
userid=JSON.parse(userid);

export const CServices = () => {
  const [workers, setWorkers] = useState([]);
  const [bookedServices, setBookedServices] = useState([]);
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedLocation, setSelectedLocation] = useState("Default");
  const [selectedRating, setSelectedRating] = useState("Default");
  const [services, setServices] = useState([]);
  const [showForm, setShowForm] = useState({});
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [issue, setIssue] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [selectedWorker, setSelectedWorker] = useState(null);

  const handleBookNow = (worker) => {
    console.log("Book Now button clicked");
    setSelectedWorker(worker); // Store the selected worker's data
    setShowForm((prevShowForm) => ({ ...prevShowForm, [worker.id]: true }));
  };
  const user = userid._id
//creating job Request
  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log("Form submitted:", { user,name, location, phoneNumber, issue, appointmentDate, workerId: selectedWorker._id,workerName:selectedWorker.username });
    try{
      const newJob = {
        custId:user,
        custName:name,
        servicerName:selectedWorker.username,
        issue,
        location,
        phoneNo:phoneNumber,
        service:selectedWorker.service,
        servicerId:selectedWorker._id,
        bookedDate:appointmentDate
      };
      const response =await axios.post('http://localhost:8088/jobRequestRoutes/creatingjob',newJob)
      console.log(response.data)
      alert(response.data.message)
      setName('')
      setAppointmentDate('')
      setLocation('')
      setIssue('')
      setPhoneNumber('')
      setShowForm(false);
    }
    catch(error){
      console.log('error while registering job request',error)
    }
  };

  const handleCancel = (worker) => {
    setShowForm((prevShowForm) => ({ ...prevShowForm, [worker]: false }));
  };

  useEffect(() => {
    fetchTechnician();
    fetchService();
  }, []);

  const fetchTechnician = async () => {
    try {
      const response = await axios.get("http://localhost:8088/userRoutes/techniciandetails");
      setWorkers(response.data.tech);
    } catch (error) {
      console.log("Error fetching Technicians Details", error);
    }
  };

  const fetchService = async () => {
    try {
      const response = await axios.get("http://localhost:8088/serviceRoutes/service");
      setServices(response.data.service);
    } catch (error) {
      console.log("Error fetching service", error);
    }
  };

  const getRatingValue = (rating) => {
    switch (rating) {
      case "more than 4.5":
        return [4.5, 5];
      case "more than 4.0":
        return [4.0, 4.5];
      case "more than 3.5":
        return [3.5, 4.0];
      default:
        return [0, 5];
    }
  };

  const filteredWorkers = workers.filter((worker) => {
    const [minRating, maxRating] = getRatingValue(selectedRating);
    return (
      (selectedService === "All Services" || worker.service === selectedService) &&
      (selectedLocation === "Default" || worker.location === selectedLocation) &&
      worker.rating >= minRating &&
      worker.rating <= maxRating
    );
  });

  return (
    <div className="services-page-dash">
      <div className="head">
        <h2>{selectedService}</h2>
        <div className="drop-down">
          <select value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
            <option value="All Services">All Services</option>
            {services.map((service, index) => (
              <option key={index} value={service.servicename}>
                {service.servicename}
              </option>
            ))}
          </select>
          <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)}>
            <option value="Default">By Location</option>
            <option value="Near me">Near Me</option>
            <option value="Madurai">Madurai</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
          </select>
          <select value={selectedRating} onChange={(e) => setSelectedRating(e.target.value)}>
            <option value="Default">Ratings</option>
            <option value="more than 4.5">More than 4.5</option>
            <option value="more than 4.0">More than 4.0</option>
            <option value="more than 3.5">More than 3.5</option>
          </select>
        </div>
      </div>
      <div className="services-grid-dash">
        {workers.length > 0 ? (
          workers.map((worker) => (
            <div className="worker-card" key={worker.id}>
              <center>
                <i className="fa-solid fa-circle-user"></i>
                <h4>{worker.username}</h4>
                <p>Service: {worker.service}</p>
                <p>Location: {worker.address}</p>
                <p>Rating: {worker.rating}</p>
                <button onClick={() => handleBookNow(worker)} className="btn btn-dark">
                  Book Now
                </button>
              </center>
              {showForm[worker.id] && (
                <div className="modal" style={{ display: "block" }}>
                  <div className="modal-content-customer">
                    <center>
                      <h2>Book a Service</h2>
                    </center>
                    <form onSubmit={handleSubmit}>
                      <label>
                        {/* Worker ID: */}
                        <input type="hidden" value={selectedWorker._id} disabled className="form-control" />
                      </label>
                      <br />
                      <label>
                        {/* Worker Name: */}
                        <input type="hidden" value={selectedWorker.username} disabled className="form-control" />
                      </label>
                      <br />
                      <label>
                        {/* Service Name: */}
                        <input type="hidden" value={selectedWorker.service} disabled className="form-control" />
                      </label>
                      <br />
                      <label>
                        Name:
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" />
                      </label>
                      <br />
                      <label>
                        Phone Number:
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="form-control"
                        />
                      </label>
                      <br />
                      <label>
                        Location:
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="form-control"
                        />
                      </label>
                      <br />
                      <label>
                        Issue:
                        <textarea
                          value={issue}
                          onChange={(e) => setIssue(e.target.value)}
                          className="form-control"
                        />
                      </label>
                      <br />
                      <label>
                        Appointment Date:
                        <input
                          type="date"
                          value={appointmentDate}
                          onChange={(e) => setAppointmentDate(e.target.value)}
                          className="form-control"
                        />
                      </label>
                      <br />
                      <button type="submit" className="btn btn-dark">
                        Submit
                      </button>
                      <button type="button" className="btn btn-dark" onClick={() => handleCancel(worker.id)}>
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>No results found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
