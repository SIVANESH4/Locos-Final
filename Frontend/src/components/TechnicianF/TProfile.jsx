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
    status: "Pending",
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
  })
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
  const user = userid._id
  //fetching the job request
  const fetchJobRequest = async(event) => {
    try{
      const response = await axios.post('http://localhost:8088/jobRequestRoutes/openjoblist',{user})
      //console.log(response.data)
      setJobs(response.data.job)
    }
    catch(error){
      console.log('Error while Fetching joblist ',error)
    }
  }
  //accepting job Request
  const handleAccept = (job) => {
    setCustomer(job); // Store the selected customer's data
    console.log(customer)
  };

  // Function to update the status of a job
  const updateJobStatus = (jobId, newStatus) => {
    const updatedJobs = jobs.map((job) =>
      job.id === jobId ? { ...job, status: newStatus } : job
    );
    setJobs(updatedJobs);
  };

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
              <div>
                {jobs.map((job) => (
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
                      <strong>Appoinment Date:</strong> {job.bookingDate}
                    </p>
                    <p>
                      <strong>Status:</strong> {job.status}
                    </p>

                    {/* Show Accept/Decline buttons if job is pending */}
                    {job.status === "open" && (
                      <div>
                        <button
                          onClick={()=> handleAccept(job)}
                          className="btn btn-dark"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => updateJobStatus(job.id, "Declined")}
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
                        <button
                          onClick={() => updateJobStatus(job.id, "Completed")}
                          className="btn btn-dark"
                        >
                          Complete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
