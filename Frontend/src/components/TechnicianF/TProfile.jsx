import React, { useEffect, useState } from "react";
import axios from "axios";
var userid = localStorage.getItem("userInfo");
userid = JSON.parse(userid);

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

const defaultJobs = [
  {
    id: 1,
    user: "John Doe",
    serviceType: "Plumbing",
    location: "123 Street, City",
    bookingDate: "2024-09-22",
    status: "Pending",
  },
  {
    id: 2,
    user: "Jane Smith",
    serviceType: "Electrical",
    location: "456 Avenue, City",
    bookingDate: "2024-09-23",
    status: "Pending",
  },
  {
    id: 3,
    user: "Mark Johnson",
    serviceType: "Carpentry",
    location: "789 Road, City",
    bookingDate: "2024-09-21",
    status: "In_Progress",
  },
];

export const TProfile = () => {
   const [jobs, setJobs] = useState([]);
  const [name, setName] = useState(userid.username || "");
  const email = userid.email || "";
  const [phone, setPhone] = useState(userid.phoneNo || "");
  const [address, setAddress] = useState(userid.address || "");
  const [pincode, setPincode] = useState(userid.pincode || "");
  const [service, setService] = useState(userid.service || " ");
  const [customer,setCustomer] = useState('')
  useEffect(() => {
   fetchJobRequest();
  },[])
  //updating technician details
  const handleUpdateData = async (event) => {
    //event.preventDefault();
    const Updatedata = {
      name,
      email,
      phone,
      address,
      pincode,
      service,
    };
    const response = await axios.put(
      "http://localhost:8088/userRoutes/userupdate",
      Updatedata
    );
    console.log(response.data);
    localStorage.setItem("userInfo", JSON.stringify(response.data));
    alert("Profile updated Sucessfully");
    window.location.reload();
  };
  
  //fetching the job request
  const fetchJobRequest = async(event) => {
    try{
     const response = await axios.post('http://localhost:8088/jobRequestRoutes/openjoblist',{user:userid._id})
      setJobs(response.data||[])
    }
    catch(error){
      console.log('Error while Fetching joblist ',error)
    }
  }

  //accepting job Request
  const handleAccept = async(job) => {
    try{
      const response = await axios.put('http://localhost:8088/jobRequestRoutes/acceptjobrequest',{
        // custId:job.customerId,
        // servicerId:userid._id
        id:job._id
      })
      // fetchJobRequest();
      window.location.reload();
    }
    catch(error){
      console.log(error)
    }
  };

  //cancel the job request
  const handleDecline = async(job) => {
    try{
      const response = await axios.put('http://localhost:8088/jobRequestRoutes/canceljobrequest',{
        // custId:job.customerId,
        // servicerId:userid._id
        id:job._id
      })
      window.location.reload();
      fetchJobRequest();
    }
    catch(error){
      console.log(error)
    }
  };

  // Function to update the status of a job
  // const updateJobStatus = (jobId, newStatus) => {
  //   const updatedJobs = jobs.map((job) =>
  //     job.id === jobId ? { ...job, status: newStatus } : job
  //   );
  //   setJobs(updatedJobs);
  // };

  return (
    <>
      <div className="head">
        {/* Personal Details */}
        <form onSubmit={handleUpdateData}>
          <div className="tech-personal-details">
            <h3>Personal Information</h3>

            <div className="form-group-tech">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group-tech">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                disabled
                className="form-control"
              />
            </div>

            <div className="form-group-tech">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group-tech">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group-tech">
              <label htmlFor="pincode">Pincode</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="form-group-tech">
              <label htmlFor="service">Service</label>
              <select
                id="service"
                name="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="form-control"
                disabled
              >
                <option value="">{service}</option>
                {services.map((service, index) => (
                  <option key={index} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>

            <br />
            <button className="btn btn-dark" type="submit">
              Save Changes
            </button>
          </div>
        </form>
        <div className="tech-notify">
          <h3>Job Requests</h3>
          <div className="tech-not">
  <div className="tech-jobreq">
    {/* List of Job Requests */}
    {jobs && jobs.length > 0 ? (
      jobs.map((job) => (
        <div
          key={job.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
          }}
          className="job-card"
        >
          <h3>Service: {job.service}</h3>
          <p>
            <strong>Customer:</strong> {job.customerName}
          </p>
          <p>
            <strong>Location:</strong> {job.location}
          </p>
          <p>
            <strong>Appoinment Date:</strong> {new Date(job.bookingDate).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <p>
            <strong>Status:</strong> {job.status}
          </p>

          {/* Show Accept/Decline buttons if job is pending */}
          {job.status === "pending" && (
            <div>
              <button
                onClick={() => handleAccept(job)}
                className="btn btn-dark"
              >
                Accept
              </button>
              <button
                onClick={() => handleDecline(job)}
                className="btn btn-dark"
              >
                Decline
              </button>
            </div>
          )}

          {/* Show Cancel and Complete buttons if job is in progress */}
          {job.status === "In_Progress" && (
            <div>
              <button
                onClick={() => updateJobStatus(job.id, "Cancelled")}
                className="btn btn-dark"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      ))
    ) : (
      <p>No job requests found.</p>
    )}
  </div>
</div>
        </div>

      </div>
    </>
  );
};
