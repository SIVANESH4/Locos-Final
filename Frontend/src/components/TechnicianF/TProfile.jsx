import React, { useState } from 'react';
import axios from 'axios';
var userid = localStorage.getItem("userInfo")
userid=JSON.parse(userid);

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

export const TProfile = () => {
  
  // const [userData, setUserData] = useState({
  //   name: 'John Doe',
  //   email: 'johndoe@example.com',
  //   phone: '123-456-7890',
  //   address: '123 Main St, Springfield',
  //   pincode: '987654',
  //   service: '',
  // });
  const [name,setName]=useState(userid.username || "")
  const email=userid.email || ""
  const [phone,setPhone]=useState(userid.phoneNo || "")
  const [address,setAddress]=useState(userid.address || "")
  const [pincode,setPincode]=useState(userid.pincode || "")
  const [service,setService]=useState(userid.service || " ")

  //updating technician details
  const handleUpdateData = async(event) => {
    event.preventDefault();
    const Updatedata = ({
      name,email,phone,address,pincode,service
    })
    const response = await axios.put('http://localhost:8088/userRoutes/userupdate',Updatedata)
    console.log(response.data)
    localStorage.setItem('userInfo',JSON.stringify(response.data))
    alert('Profile updated Sucessfully')
    window.location.reload()
  }

  // const [selectedService, setSelectedService] = useState("System");

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserData({ ...userData, [name]: value });
  // };

  // const handleServiceChange = (e) => {
  //   setSelectedService(e.target.value);
  //   setUserData({ ...userData, service: e.target.value });
  // };

  // const handleSave = () => {
  //   // Logic to save/update profile data
  //   alert("Profile updated successfully");
  // };

  return (
    <>
      <div className="head">
        {/* Personal Details */}
        <form onSubmit={handleUpdateData}>
          <div className="tech-personal-details">
            <h3>Personal Information</h3>

            <div className="form-group">
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
                onChange={(e) => setAddress(e.target.value)}
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

            <div className="form-group">
              <label htmlFor="service">Service</label>
              <select
                id="service"
                name="service"
                value={service}
                onChange={(e)=>setService(e.target.value)}
                className="form-control"
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
            <button className="btn btn-dark" type='submit'>
              Save Changes
            </button>
          </div>
        </form>
        <div className="tech-not">
          <h3>Notification</h3>
          <br />
          <div className="tech-notification">
            <p>No Notifications</p>
          </div>
        </div>
      </div>
    </>
  );
};
