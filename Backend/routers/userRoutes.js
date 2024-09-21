const express = require('express');
const User = require('../modules/user'); // Import the User model
const router = express.Router();

// Create a new user (Signup route)
router.post('/signup', async (req, res) => {
  try {
    // Extract data from the request body
    const { name, email, password, phoneNo, address, role, services } = req.body;

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password,
      phoneNo,
      address,
      role,
      // Only add services if the user is a service provider
      services: role === 'service_provider' ? services : null
    });

    // Save the new user to the database
    await newUser.save();
    
    // Send a success response
    res.status(200).json({ message: 'Account created successfully' });
  } catch (error) {
    // Handle any errors that occur during signup
    res.status(500).json({ message: 'Error during signup', error: error.message });
  }
});

// Fetch all users (for admin use)
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// Additional endpoints for updating or deleting users
// Example: router.put('/api/users/:id', (req, res) => {});
// Example: router.delete('/api/users/:id', (req, res) => {});

module.exports = router;
