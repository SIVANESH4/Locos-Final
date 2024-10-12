import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'

export const Login = () => {
  const[user,setUser]=useState('')
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate = useNavigate()
  const [showPopup,setShowPopup] = useState(false);
  const [forgotEmail,setForgotEmail]= useState('');


  const handleLogin = async(event)=>{
    event.preventDefault()
    try{
    // const userDetail = {email,password}
    const response = await axios
    .post('http://localhost:8088/userRoutes/userlogin',{email,password})
      setEmail()
      setPassword()
      const token=response.data.token;
      const role =response.data.role;
      const status = response.data.status;
      const userInfo=jwtDecode(token,response.data.JWT_SECRET).user;
      //storing the logged user details in localstorage
      localStorage.setItem("userInfo",JSON.stringify(userInfo));
      if( status === 'Inactive'){
        alert('This Accout Currently Inactive by the Admin')
      }
      else{
        alert('Login Successful')
      if( role === 'Admin'){
        navigate('/admin')
      }
      else if( role === 'Customer'){
        navigate('/customer')
      }
      else if( role === 'Technician'){
      navigate('/technician')
      }
    }
      window.location.reload()
    }
    catch(error){
      alert('Invalid Credentials',error)
      console.log(error)
    }
  }
  const handleForgotPasswordClick = ()=>{
    setShowPopup(true);
  }

  const handleForgotPasswordSubmit = () =>{
    axios
    .post('http://localhost:8088/userRoutes/ForgotPassword',{email:forgotEmail})
    .then( (res) => {
      alert('Email is Correct. Please Check Your Inbox')
      setShowPopup(false)
    })
    .catch((error) =>{
      alert('The email address you entered is not correct')
      console.log('forgot password error:',error)
    })
  }

  return (
    <>
    <div className="login-container">
            <form onSubmit={handleLogin}>
            <center><h2>Login</h2></center>
            <center><h5>Welcome Back!</h5></center>
            <div className="login-box">  
                <input type="mail"
                 name="username" 
                 class="form-control"
                  placeholder="Email Address"
                  value={email} 
                  onChange={(e)=> setEmail(e.target.value)}
                  required/>   <br />
                <input type="password" 
                name="password" 
                class="form-control" 
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}/>
                 <p onClick={handleForgotPasswordClick}>
                 Lost Password? 
                 </p>
                <button type="submit" id='login-btn' class="btn btn-dark">Login</button>
                <p>New User? <Link to='/signup' className='link'><span>Signup</span></Link></p>
                </div>
            </form>
        </div>
        {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h3>Forgot Password</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              required
            />
            <button onClick={handleForgotPasswordSubmit}>Submit</button>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};