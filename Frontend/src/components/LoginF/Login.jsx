import React from 'react'
import { Link } from "react-router-dom";
import './Login.css'
export const Login = () => {
  return (
    <>
    <div className="login-container">
            <form action="">
            <center><h2>Login</h2></center>
            <center><h5>Welcome Back!</h5></center>
            <div className="login-box">  
                <input type="text" name="username" class="form-control" placeholder="Username"/><br />
                <input type="password" name="password" class="form-control" placeholder="Password"/>
                 <p>Lost Password? <span>Click here</span></p>
                <button type="submit" id='login-btn' class="btn btn-dark">Login</button>
                <p>New User? <Link to='/signup'><span>Signup</span></Link></p>
                </div>
            </form>
        </div>
    </>
  )
}
