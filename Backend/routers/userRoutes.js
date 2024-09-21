const express = require('express');
const User = require('../modules/user'); // Import the User model
const router = express.Router();

// Create a new user
router.post('/signup', async (req, res) => {
  // Handle user creation (signup)
  try{
  const {name,email,password,role}=req.body
  const newUser = new User({
    name,email,password,role,
    services:role === 'service_provider' ? services :null
  });

  await newUser.save()
  res.status(200).json({message:'account created successfully'})
}
catch(error){
  res.status(500).json({message:'error while signup',error:error.message})
}
});

// Fetch all users (for admin use)
router.get('/api/users', async (req, res) => {
  // Fetch users from the database
});

// Additional endpoints for updating or deleting users
module.exports = router;