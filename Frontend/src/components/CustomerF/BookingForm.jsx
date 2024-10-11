import React, { useState } from "react";

const BookingForm = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [issue, setIssue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Submit the form data to your backend API or perform any other action
    console.log("Form submitted:", { name, location, phoneNumber, issue });
  };

  const handleCancel = () => {
    // Reset the form fields and hide the form
    setName("");
    setLocation("");
    setPhoneNumber("");
    setIssue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </label>
      <br />
      <label>
        Phone Number:
        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      </label>
      <br />
      <label>
        Issue:
        <textarea value={issue} onChange={(e) => setIssue(e.target.value)} />
      </label>
      <br />
      <button type="submit">Submit</button>
      <button type="button" onClick={handleCancel}>
        Cancel
      </button>
    </form>
  );
};

export default BookingForm;