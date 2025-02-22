import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import './Signup.css';

export const Signup = () => {
    const [isTechnician, setIsTechnician] = useState(false);
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');
    const [service, setService] = useState([]); // Initialize as an array
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
    const [services, setServices] = useState([]); // Renamed to avoid confusion
    const navigate = useNavigate();

    // Register new customer or technician
    const handleRegister = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords don't match!");
            return;
        }

        const userdata = {
            username,
            email,
            password,
            phoneNo,
            address,
            role: isTechnician ? 'Technician' : 'Customer',
            service: isTechnician ? service : null,
            location: isTechnician ? { latitude: latitude, longitude: longitude } : null // Store geolocation here
        };

        // Post data to your backend API
        axios
            .post('http://localhost:8088/userRoutes/signup', userdata)
            .then(() => {
                setEmail('');
                setPassword('');
                setPhoneNo('');
                setAddress('');
                setService([]); // Reset to an empty array
                setLatitude(''); // Reset latitude
                setLongitude(''); // Reset longitude
                alert('Registration successful!');
                navigate('/login');
            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    alert(error.response.data.message);
                } else {
                    console.log('Unable to register', error);
                    alert('An error occurred while registering');
                }
            });
    };

    useEffect(() => {
        fetchService();
    }, []);

    const fetchService = async () => {
        try {
            const response = await axios.get("http://localhost:8088/serviceRoutes/service");
            console.log(response.data);
            // Ensure response.data.service is an array before setting it
            if (Array.isArray(response.data.service)) {
                setServices(response.data.service); // Use setServices instead of setService
            } else {
                console.error("Expected an array but got:", response.data.service);
                setServices([]); // Fallback to an empty array
            }
        } catch (error) {
            console.log("Error fetching service", error);
        }
    };

    const handleRole = (role) => {
        setIsTechnician(role === 'Technician');
    };

    const fetchLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);
                },
                (error) => {
                    console.error('Error fetching geolocation:', error);
                    alert('Unable to fetch your location. Please enable location services.');
                }
            );
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    return (
        <>
            <div className="signup-container">
                <form onSubmit={handleRegister}>
                    <center><h2>Sign up</h2></center>
                    <div className="role-btn">
                        <button
                            type="button"
                            onClick={() => handleRole('Customer')}
                            className={`btn ${isTechnician ? 'btn-secondary' : 'btn-dark'}`}
                        >
                            Customer
                        </button>
                        <button
                            type="button"
                            onClick={() => handleRole('Technician')}
                            className={`btn ${isTechnician ? 'btn-dark' : 'btn-secondary'}`}
                        >
                            Technician
                        </button>
                    </div>

                    <div className="form-container">
                        <label className="form-label">Username</label><br />
                        <input type="text" className="form-control" value={username} onChange={(e) => setUserName(e.target.value)} required /><br />
                        <label className="form-label">Email Address</label><br />
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
                        <label className="form-label">Password</label><br />
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
                        <label className="form-label">Confirm Password</label><br />
                        <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required /><br />
                        {isTechnician && (
                            <div>
                                <label className="form-label">Services You Provide</label><br />
                                <select className="form-control" value={service} onChange={(e) => setService(e.target.value)} required>
                                    <option value="">Select a Service</option>
                                    {services.map((service, index) => ( // Use services instead of service
                                        <option key={index} value={service.servicename}>{service.servicename}</option>
                                    ))}
                                </select><br />
                                <label className="form-label">Location</label><br />
                                <input type="text" className="form-control" value={`${latitude}, ${longitude}`} disabled /><br />
                                <button type="button" className="btn btn-dark" onClick={fetchLocation}>
                                    Get Location
                                </button><br />
                            </div>
                        )}
                        <label className="form-label">Address</label><br />
                        <textarea className="form-control" value={address} onChange={(e) => setAddress(e.target.value)} required></textarea><br />
                        <label className="form-label">Phone No</label><br />
                        <input type="text" className="form-control" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} required /><br />

                        <p>Already have an account?<Link to='/login'><span> Login</span></Link></p>
                        <center><button type="submit" id="signup-btn" className="btn btn-dark">Sign up</button></center>
                    </div>
                </form>
            </div>
        </>
    );
};