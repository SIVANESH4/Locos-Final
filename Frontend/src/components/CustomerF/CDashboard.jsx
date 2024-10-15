import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js";
import { registerables } from "chart.js";
import axios from "axios";
Chart.register(...registerables);
var userid = localStorage.getItem("userInfo");
userid=JSON.parse(userid);
console.log(userid)

export const CDashboard = () => {
  const [ongoingJobs, setOngoingJobs] = useState([]);
  const [serviceStats, setServiceStats] = useState({
    booked: 20,
    finished: 15,
    cancelled: 5,
  });
  useEffect(() => {
    fetchOngoingJob();
    fetchJobCount();
  }, []);

  const fetchOngoingJob = async(event) => {
    try{
      const response = await axios.post('http://localhost:8088/jobRequestRoutes/ongoingjob',{user:userid._id})
      const fetchedJobs = Array.isArray(response.data.job) ? response.data.job : []; 
      setOngoingJobs(fetchedJobs)
    }
    catch(error){
      console.log(error)
    }
  }
  
  //fetch job request count
  const fetchJobCount = async(event) => {
    try{
      const response = await axios.post('http://localhost:8088/jobRequestRoutes/countjob',{custId:userid._id})
      console.log(response.data)
      setServiceStats({
        booked: response.data.pending || 0,
        finished: response.data.complete || 0,
        cancelled: response.data.cancel || 0,
      });
    }
    catch(error){
      console.log(error)
    }
  }
  const barData = {
    labels: ["Booked", "Finished", "Cancelled"],
    datasets: [
      {
        label: "Service Status",
        data: [
          serviceStats.booked,
          serviceStats.finished,
          serviceStats.cancelled,
        ],
        backgroundColor: ["grey", "#acaba9", "black"],
        borderColor: ["none", "none", "none"],
        borderWidth: 0,
      },
    ],
  };

  const [name,setName]=useState(userid.username || "")
  const email=userid.email || ""
  const [phone,setPhone]=useState(userid.phoneNo || "")
  const [address,setAddress]=useState(userid.address || "")
  const [pincode,setPincode]=useState(userid.pincode || "")

  //updating userdetails
  const handleUpdateData = async(event) => {
    event.preventDefault();
    const Updatedata = ({
      name,email,phone,address,pincode
    })
    const response = await axios.put('http://localhost:8088/userRoutes/userupdate',Updatedata)
    console.log(response.data)
    localStorage.setItem('userInfo',JSON.stringify(response.data))
    alert('Profile updated Sucessfully')
    window.location.reload()
  }

  //cancel job request
  const handleDeclineJob = async(job) => {
    try{
      const response = await axios.put('http://localhost:8088/jobRequestRoutes/declinejobrequest',{
        // custId:userid._id,servicerId:job.serviceProviderId
        id:job._id
      })
      window.location.reload();
      // console.log(response.data)
    }
    catch(error){
      console.log(error)
    }
  }
  return (
    <>
      <div className="customer-dash">
        <h3>Ongoing Works</h3>
        <div className="ongoing-works">
            <ul className="ongoing-jobs-list">
              {
                Array.isArray(ongoingJobs) && ongoingJobs.length === 0 ? (
                  <p>No Ongoing Jobs Found</p>
                ) : (
              ongoingJobs.map((job) => (
                <li key={job.id} className="ongoing-job-item">
                  <h4>{job.service}</h4>
                  <p>Provider: {job.serviceProviderName}</p>
                  <p>Date: {new Date(job.bookingDate).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    })}</p>
                  <p>Status: {job.status}</p>
                  <button className="btn btn-dark" onClick={() => handleDeclineJob(job)}>Cancel</button>
                </li>
              ))
            )}
            </ul>
        </div>
        <div className="chart-section">
          <h5>Service Statistics</h5>
          <Bar data={barData} />
        </div>
        {/* Personal Details */}
        <form onSubmit={handleUpdateData}>
        <div className="personal-details">
          <h3>Personal Information</h3>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e)=> setName(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
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

          <div className="form-group">
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

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="form-group">
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
          <br />
          <button className="btn btn-dark" type="submit">
            Save Changes
          </button>
        </div>
        </form>
        {/* <div className="empty-black">
          <div className="circle" id="c1"></div>
          <div className="circle" id="c2"></div>
          <div className="circle" id="c3"></div>
          <div className="circle" id="c4"></div>
          <div className="circle" id="c5"></div>
          <div className="circle" id="c6"></div>
          <div className="circle" id="c7"></div>
          <div className="circle" id="c8"></div>
          <div className="circle" id="c9"></div>
          <div className="circle" id="c10"></div>
        </div> */}
      </div>
    </>
  );
};
