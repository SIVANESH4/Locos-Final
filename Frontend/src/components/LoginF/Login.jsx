import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import axios from 'axios';
export const Login = () => {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate = useNavigate()

  const handleLogin = async(event)=>{
    event.preventDefault()
    try{
    // const userDetail = {email,password}
    const response = await axios
    .post('http://localhost:8088/userRoutes/userlogin',{email,password})
      setEmail()
      setPassword()
      alert('Login Successful')
      navigate('/')
      window.location.reload()
    }
    catch(error){
      alert('Invalid Credentials',error)
      console.log(error)
    }
  }

  return (
    <>
    <div className="login-container">
            <form onSubmit={handleLogin}>
            <center><h2>Login</h2></center>
            <center><h5>Welcome Back!</h5></center>
            <div className="login-box">  
                <input type="text"
                 name="username" 
                 class="form-control"
                  placeholder="Username"
                  value={email} 
                  onChange={(e)=> setEmail(e.target.value)}
                  required/>   <br />
                <input type="password" 
                name="password" 
                class="form-control" 
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}/>
                 <p>Lost Password? <span>Click here</span></p>
                <button type="submit" id='login-btn' class="btn btn-dark">Login</button>
                <p>New User? <Link to='/signup'><span>Signup</span></Link></p>
                </div>
            </form>
        </div>
    </>
  )
}
