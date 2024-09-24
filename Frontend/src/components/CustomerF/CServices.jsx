import React, { useState, useEffect } from "react";
// import data from "../../../demo.json"; // Ensure the path is correct
import axios from "axios";

export const CServices = () => {
  const [workers, setWorkers] = useState([]);
  const [bookedServices, setBookedServices] = useState([]);
  const [selectedService, setSelectedService] = useState("All Services");
  const [selectedLocation, setSelectedLocation] = useState("Default");
  const [selectedRating, setSelectedRating] = useState("Default");

  // Define your services array
  const services = [
    { title: "Electrical" },
    { title: "Plumbing" },
    { title: "Installation" },
    { title: "Maintenance" },
    { title: "Television" },
    { title: "System" },
    { title: "AC" },
    { title: "RO" },
    { title: "Washing Machine" },
    { title: "Refrigerator" },
    { title: "Microwave Oven" },
    { title: "Cleaning" },
  ];

  useEffect(() => {
    // Initialize workers with the imported data
    const fetchTechnician = async() => {
      try{
      const response = await axios.get('http://localhost:8088/userRoutes/techniciandetails')
      setWorkers(response.data.tech)
      console.log(response.data)
      }
      catch(error){
        console.log('Error fetching Technicians Details',error)
      }
    }
    fetchTechnician();
  }, []);

  const handleBookService = (worker) => {
    const updatedBookedServices = [...bookedServices, worker];
    setBookedServices(updatedBookedServices);
    localStorage.setItem(
      "bookedServices",
      JSON.stringify(updatedBookedServices)
    );
    alert(`Service booked for ${worker.name}`);
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
      (selectedService === "All Services" ||
        worker.service === selectedService) &&
      (selectedLocation === "Default" ||
        worker.location === selectedLocation) &&
      worker.rating >= minRating &&
      worker.rating <= maxRating
    );
  });

  return (
    <div className="services-page-dash">
      <div className="head">
        <h2>{selectedService}</h2>
        <div className="drop-down">
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="All Services">All Services</option>
            {services.map((service, index) => (
              <option key={index} value={service.title}>
                {service.title}
              </option>
            ))}
          </select>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="Default">By Location</option>
            <option value="Near me">Near Me</option>
            <option value="Madurai">Madurai</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
          </select>
          <select
            value={selectedRating}
            onChange={(e) => setSelectedRating(e.target.value)}
          >
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
              <center><i className="fa-solid fa-circle-user"></i>
              <h4>{worker.username}</h4>
              <p>Service: {worker.service}</p>
              <p>Location: {worker.address}</p>
              {/* <p>Rating: {worker.rating}</p> */}
              <button
                onClick={() => handleBookService(worker)}
                className="btn btn-dark"
              >
                Book Now
              </button></center>
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
