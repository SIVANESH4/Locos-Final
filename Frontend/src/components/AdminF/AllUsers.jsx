import React, { useEffect } from 'react'
import { useState } from 'react';
import axios from 'axios';
export const AllUsers = () => {
    // const [users, setUsers] = useState([
    //     {
    //       id: 1,
    //       name: 'John Doe',
    //       email: 'john@example.com',
    //       phone: '123-456-7890',
    //       address: '123 Main St',
    //       pincode: '123456',
    //       role: 'Admin',
    //       banned: false,
    //     },
    //     {
    //       id: 2,
    //       name: 'Jane Smith',
    //       email: 'jane@example.com',
    //       phone: '987-654-3210',
    //       address: '456 Elm St madurai tamilnadu india asia world universe',
    //       pincode: '654321',
    //       role: 'User',
    //       banned: false,
    //     },
    //     {
    //       id: 3,
    //       name: 'Mike Ross',
    //       email: 'mike@example.com',
    //       phone: '555-555-5555',
    //       address: '789 Oak St',
    //       pincode: '789123',
    //       role: 'User',
    //       banned: false,
    //     },
    //     {
    //       id: 4,
    //       name: 'Rachel Green',
    //       email: 'rachel@example.com',
    //       phone: '111-222-3333',
    //       address: '1234 Pine St',
    //       pincode: '456789',
    //       role: 'Worker',
    //       banned: false,
    //     },
    //   ]);
    const [users,setUsers]=useState([])
    
    //diplaying all users
    useEffect(()=>{
      const fetchAllUsers = async() => {
        try{
          const response = await axios.get('http://localhost:8088/userRoutes/allusers')
          setUsers(response.data.users)
        }
        catch(error){
          console.log('Error fetching users',error)
        }
      }
      fetchAllUsers();
    },[])
      const handleBan = (id) => {
        // Ban/unban logic
        setUsers(
          users.map((user) =>
            user.id === id ? { ...user, banned: !user.banned } : user
          )
        );
      };

      if (users.length === 0) {
        return (
          <div className="no-users-found">
            <h2>No Users Found</h2>
            <p>No users have been added yet.</p>
          </div>
        );
      }
      else{
      return (
        <>
        <div className="users-management">
          <h2>Users Management</h2>
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Pincode</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNo}</td>
                  <td className='address'>{user.address}</td>
                  <td>{user.pincode}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      onClick={() => handleBan(user.id)}
                      className={user.banned ? 'banned' : 'ban'}
                    >
                      {user.banned ? 'Unban' : 'Ban'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      );
    };
};
