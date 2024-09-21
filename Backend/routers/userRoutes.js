const express = require('express');
const User = require('../modules/user'); // Import the User model
const router = express.Router();
const jwt = require('jsonwebtoken')
const SECRET_KEY = 'secret-key'

// Create a new user (Signup route)
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, phoneNo, address, role,service} = req.body;
    const newUser = new User({
      username,
      email,
      password,
      phoneNo,
      address,
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
  res.json({token})
  }

  catch(error){
    res.status(404).json({message:'Error while login'})
    console.log(error)
  }
});

// Additional endpoints for updating or deleting users
// Example: router.put('/api/users/:id', (req, res) => {});
// Example: router.delete('/api/users/:id', (req, res) => {});

module.exports = router;
