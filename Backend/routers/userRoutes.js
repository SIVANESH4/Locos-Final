const express = require('express');
const UserDB = require('../modules/user'); // Import the User model
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

      //check if the users already exists
      const existsUser = await UserDB.findOne({email:email})
      if (existsUser) {
          return res.status(200).json({ message: 'users already exists'})
     }

      //Register the user
      const newUser = new UserDB({
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
      const user = await newUser.save();

      //Generate a JWT token
      const token = jwt.sign(
        { id: user._id, username: user.username, email: user.email },
        SECRET_KEY,
    );


      res.status(200).json({ 
        message: 'Account created successfully' ,token
      });
    } catch (error) {
      
      return res.status(500).json({ message: 'Error during signup', error: error.message });
  }
});

//user login
router.post( '/userlogin' , async (req,res) => { 
  try{
      const {email,password}=req.body

      //Find the user by email
      const userInfo = await UserDB.findOne({email})
      if(!userInfo){
        return  res.status(401).json({message:'User Not Found'})
      }

      //Check if the password matches
      if(userInfo.password!=password){
        return  res.status(401).json({message:'Incorrect Password'})
      }

      //Generate the token
      const token = jwt.sign(
        {user: userInfo},
        SECRET_KEY
      );
      return res.json({
        message: ' Login succesful ',
        token,
        role:userInfo.role
      });
  }catch( error ){
    return res.status(500).json(error)
  }
});

//fogot password
router.post( '/ForgotPassword' , async (req,res) => {
    const { email } = req.body.email;
    try{
        //Find the user by email
        const user = await UserDB.findOne({email:email});
        if(!user){
          return res.status(404).json({message:'No such email in DB'});
        }
        
        // Configure Nodemailer transporter
        const Transport=nodemailer.createTransport(
          {
              service:"gmail",
              auth:{
                  user:process.env.MAILID,
                  pass:process.env.MAILPASS
              }
          }
      );
  
      // Configure the email options
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
  }catch(err)
      {
      return res.status(500).json({message:"Internal Error"});
      }
  });

//fetching all users
router.get('/allusers', async (req,res) => {
      try{
        //fetching all users detail send to admin except the admin
          const users = await UserDB.find({
            role: { $in: ['Customer' ,'Technician']} //except the admin send both customer and technician info
          }).select('-password -_id')
          res.status(200).json({users})
      }
      catch(error){
        console.log(error)
      }
})

//fetching technicians
router.get('/technician', async (req,res) => {
    try{
      //fetching the servicer detail by the role
        const tech = await UserDB.find({role:'Technician'}).select('-password -_id')
        res.json({tech})
      }
    catch(error){
        console.log(error)
    }
})

//fetching users count
router.get('/usercount', async(req,res) => {
    try{
      //count the customer and technician by the role
        const consumer = await UserDB.countDocuments({role:'Customer'})
        const tech = await UserDB.countDocuments({role:'Technician'})
        res.json({consumer,tech})
    }
    catch(error){
        console.log(error)
    }
})

//sending technician to users
router.get( '/techniciandetails', async (req,res) => {
  try{
      //fetch all the servicer by role 
      const tech = await UserDB.find({
        role:'Technician'
      }).select('username service address _id')
      
      res.json({tech})
  }
  catch(error){
      console.log(error)
  }
})

//no of techinician depending services
router.get( '/numberoftechnician' , async (req,res) => {
  try{
    //count service depending the catogery 
      const count = await UserDB.aggregate([
        {
          $match :{role:'Technician'}  //check the role is technician 
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
    console.log({message:'Error fetching technician'},error)
  }
})

//updating users status for admin
router.put('/userstatus' , async ( req,res ) => {
    const {email} = req.body;
    try{
      //check if the user exist or not
        const existingUser = await UserDB.findOne({email:email})
        if(!existingUser){
          return res.status(400).json({message:'No such User'})
        }
        
        //change the status
        const updateStatus = existingUser.status === 'Active' ? 'Inactive' : 'Active'
        existingUser.status = updateStatus;

        //storing the updated status
        await existingUser.save();
        res.status(200).json({existingUser})
    }
    catch(error){
        return res.status(500).json({error:'Internal error'})
    }
})

//updating user details 
router.put( '/userupdate', async ( req,res ) => {
      if( !req.body.email ){
          return res.status(400).json({message:'email is required'})
      }
      //store the update request data
      const updateData = {
        username:req.body.name,
        email:req.body.email,
        phoneNo:req.body.phoneno,
        address:req.body.address,
        pincode:req.body.pincode,
        service:req.body.service
      };

      try {
        const UpdateUser = await UserDB.findOneAndUpdate(
          { email:req.body.email }, //find by email
            updateData,
          { new: true , runValidators: true} //return updated document
        )

        if(!UpdateUser){
          return res.status(404).json({message:' User not Found'})
        }
        //sending updated document
        res.send(UpdateUser)
      }
      catch ( error ) {
          return res.status(500).json({message:'Internal Error'})
      }
})
// Additional endpoints for updating or deleting users
// Example: router.put('/api/users/:id', (req, res) => {});
// Example: router.delete('/api/users/:id', (req, res) => {});

module.exports = router;
