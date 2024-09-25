const express = require('express');
const User = require('../modules/user'); // Import the User model
const Services = require('../modules/services')
const router = express.Router();
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'secret-key'
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')
dotenv.config()

// Create a new user (Signup route)
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, phoneNo, address,pincode, role,service} = req.body;
    const newUser = new User({
      username,
      email,
      password,
      phoneNo,
      address,
      pincode,
      role,
      // Only add services if the user is a service provider
      service: role === 'Technician' ? service : null
    });
    
    await newUser.save();
    res.status(200).json({ message: 'Account created successfully' });
  } 
  catch (error) {
    res.status(500).json({ message: 'Error during signup', error: error.message });
  }
});

// Fetch all users (for admin use)
router.get('/fetchusers', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({error:'Unable to get User'});
  }
});

router.post('/userlogin',async(req,res) =>{
  try{
  const {email,password}=req.body
  const user = await User.findOne({email})
  if(!user){
    res.status(401).json({message:'User Not Found'})
  }
  if(user.password!=password){
    res.status(401).json({message:'Incorrect Password'})
  }
  const token = jwt.sign({userId: user._id},SECRET_KEY,{expiresIn:'1hr'})
  res.json({token,role:user.role})
  }

  catch(error){
    res.status(404).json({message:'Error while login'})
    console.log(error)
  }
});

//fogot password
router.post('/ForgotPassword',async(req,res)=>{

  const email=req.body.email;
  try{
      //Find the user by email
      const user = await User.findOne({email:email});
      if(!user){
          return res.status(404).json({message:'No such email in DB'});
      }
  
      const Transport=nodemailer.createTransport(
          {
              service:"gmail",
              auth:{
                  user:process.env.MAILID,
                  pass:process.env.MAILPASS
              }
          }
      );
  
      //sending mail to requested users 
          const send={
              from:`Loco's ${process.env.MAILID}`,
              to:`${email}`,
              subject:'Regarding forgot password',
              html:`<!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; margin: 0; padding: 0; }
      .container { max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }
      h2 { color: #333; }
      p { color: #555; }
      a { color: #1a73e8; text-decoration: none; }
      .footer { font-size: 12px; color: #777; margin-top: 20px; }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Hello ${user.email},</h2>
      <p>We received a request to for your password. </p>
      <p><h5>Here is Your Password:<mark>${user.password}</mark></h5></p>
      <p>If you did not request this change, please ignore this email or contact support if you have questions.</p>
      <div class="footer">
        <p>Best regards,<br>Loco's Service Team</p>
      </div>
    </div>
  </body>
  </html>`
  };
     
  
      await Transport.sendMail(send);
      return res.status(200).json({message:"Password is send successfully"});
  
  }
  
  catch(err)
      {
      return res.status(501).json({message:"Internal Error"});
      }
  });


//fetching  all users
router.get('/allusers',async(req,res)=>{
  try{
    const users = await User.find({}).select('-password -_id')
    res.json(users)
  }
  catch(error){
    res.status(501).json({'Error fetching users ':error})
  }
})
//fetching technicians
router.get('/technician',async(req,res)=>{
  try{
    const tech = await User.find({role:'Technician'}).select('-password -_id')
    res.json(tech)
  }
  catch(error){
    res.status(501).json({error:'Error fetching technician'})
  }
})
//fetching users cound
router.get('/usercount',async(req,res)=>{
  try{
    const consumer = await User.countDocuments({role:'Customer'})
    const tech = await User.countDocuments({role:'Technician'})
    res.json({consumer,tech})
  }
  catch(error){
    res.status(501).json({error:'Error fetching users count'})
  }
})

//Creating Services
router.post('/newservice',async(req,res)=>{
  try{
    const {newService,description}=req.body;
    const servicename = await Services.findOne({servicename:newService})
    if(servicename){
      res.status(203).json({message:'Service is already exists'})
    }
    const newservice = new Services({servicename:newService,servicedescription:description})
    await newservice.save()
    res.status(200).json({message:'Service Added'})
  }
  catch(error){
    res.status(500).json({message:'Internal error'})
  }
})

//sending Services
router.get('/service',async(req,res)=>{
  try{
    const service = await Services.find({})
    res.status(200).json({service})
  }
  catch(error){
    res.status(500).json({'Error fetching services':error})
  }
}) 

//sending technician to users
router.get('/techniciandetails',async(req,res)=>{
  try{
    const tech = await User.find({role:'Technician'}).select('username service address -_id')
    res.json({tech})
  }
  catch(error){
    res.status(400).json({error:'error sending servicer details'})
  }
})

//no of techinician depending services
router.get('/numberoftechnician',async(req,res) => {
  try{
    const count = await User.aggregate([
      {
        $match :{role:'Technician'}
      },
      {
      $group: {
        _id:"$service",
        count:{$sum: 1}
      }
    }
    ])
    res.status(200).json({count})
  }
  catch(error){
    res.status.apply(400).json({message:'Error fetching technician'})
  }
})

router.put('/statusupdate',async(req,res) => {
  const {id} = req.body;  
  try{
      const StatusUpdate = await Services.findById(id)
      if(!StatusUpdate){
        res.status(404).json({message:'Service not found'})
      }
      const updatedata = StatusUpdate.status === 'Active'?'Inactive':'Active';
      StatusUpdate.status = updatedata
      await StatusUpdate.save();
      res.status(200).json({StatusUpdate})
    }
    catch(error){
      res.status(400).json({'error while update status':error})
    }
})
// Additional endpoints for updating or deleting users
// Example: router.put('/api/users/:id', (req, res) => {});
// Example: router.delete('/api/users/:id', (req, res) => {});

module.exports = router;
