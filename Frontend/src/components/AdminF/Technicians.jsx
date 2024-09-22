import React from 'react'
import { useState } from 'react';
export const Technicians = () => {
  const [technicians, setTechnicians] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '1234567890', address: '123 Street', pincode: '123456', service: 'Electrical', rating: 4.5, jobsDone: 20 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '9876543210', address: '456 Avenue', pincode: '654321', service: 'Cleaning', rating: 4.0, jobsDone: 15 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '6549871230', address: '789 Boulevard', pincode: '987654', service: 'Plumbing', rating: 3.8, jobsDone: 10 },
  ]);

  const [newTechnician, setNewTechnician] = useState({ name: '', email: '', phone: '', address: '', pincode: '', service: '', rating: 0, jobsDone: 0 });

  const [showForm, setShowForm] = useState(false);
  // Remove a technician (ban functionality)
  const handleRemoveTechnician = (id) => {
    setTechnicians(technicians.filter((tech) => tech.id !== id));
  };

  // Add new technician
  const handleAddTechnician = (e) => {
    e.preventDefault();
    const newId = technicians.length ? technicians[technicians.length - 1].id + 1 : 1;
    const newTechnicianData = { ...newTechnician, id: newId };
    setTechnicians([...technicians, newTechnicianData]);
    setNewTechnician({ name: '', email: '', phone: '', address: '', pincode: '', service: '', rating: 0, jobsDone: 0 });
    setShowForm(false);
  };
  const handleShowForm = () => {
    setShowForm(!showForm); // Show the form when the button is clicked
  };
  return (
    <div className="technicians-management">
      <div className="head">
      <h2>Technicians Management</h2>
      <button onClick={handleShowForm} className='add-btn'>Add New Technician</button>
      </div>
      {/* Add Technician Form */}
      {showForm && (<form className="add-technician-form" onSubmit={handleAddTechnician}>
        <h3>Add New Technician</h3>
        <input
          type="text"
          placeholder="Technician Name"
          value={newTechnician.name}
          onChange={(e) => setNewTechnician({ ...newTechnician, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Technician Email"
          value={newTechnician.email}
          onChange={(e) => setNewTechnician({ ...newTechnician, email: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={newTechnician.phone}
          onChange={(e) => setNewTechnician({ ...newTechnician, phone: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={newTechnician.address}
          onChange={(e) => setNewTechnician({ ...newTechnician, address: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Pincode"
          value={newTechnician.pincode}
          onChange={(e) => setNewTechnician({ ...newTechnician, pincode: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Service (e.g., Electrical)"
          value={newTechnician.service}
          onChange={(e) => setNewTechnician({ ...newTechnician, service: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Rating"
          value={newTechnician.rating}
          onChange={(e) => setNewTechnician({ ...newTechnician, rating: parseFloat(e.target.value) })}
          min="0"
          max="5"
          step="0.1"
          required
        />
        <input
          type="number"
          placeholder="No. of Jobs Done"
          value={newTechnician.jobsDone}
          onChange={(e) => setNewTechnician({ ...newTechnician, jobsDone: parseInt(e.target.value, 10) })}
          min="0"
          required
        />
        <button type="submit">Add Technician</button>
      </form>
      )}

      {/* Technician Table */}
      <table className="technicians-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Pincode</th>
            <th>Service</th>
            <th>Rating</th>
            <th>Jobs Done</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((technician) => (
            <tr key={technician.id}>
              <td>{technician.name}</td>
              <td>{technician.email}</td>
              <td>{technician.phone}</td>
              <td>{technician.address}</td>
              <td>{technician.pincode}</td>
              <td>{technician.service}</td>
              <td>{technician.rating.toFixed(1)}</td>
              <td>{technician.jobsDone}</td>
              <td>
                <button onClick={() => handleRemoveTechnician(technician.id)} className="remove">
                  Ban
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
