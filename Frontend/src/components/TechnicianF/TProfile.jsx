import React, { useState } from "react";

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
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    address: "123 Main St, Springfield",
    pincode: "987654",
    service: "",
  });

  const [selectedService, setSelectedService] = useState("System");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleServiceChange = (e) => {
    setSelectedService(e.target.value);
    setUserData({ ...userData, service: e.target.value });
  };

  const handleSave = () => {
    // Logic to save/update profile data
    alert("Profile updated successfully");
  };

  return (
    <>
      <div className="head">
        {/* Personal Details */}
        <form>
          <div className="tech-personal-details">
            <h3>Personal Information</h3>

            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
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
                value={userData.phone}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={userData.address}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="pincode">Pincode</label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                value={userData.pincode}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="service">Service</label>
              <select
                id="service"
                name="service"
                value={selectedService}
                onChange={handleServiceChange}
                className="form-control"
              >
                <option value="">Select a service</option>
                {services.map((service, index) => (
                  <option key={index} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>
            </div>

            <br />
            <button className="btn btn-dark" onClick={handleSave}>
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
