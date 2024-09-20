const express = require('express');
const JobRequest = require('./models/jobRequest'); // Import the JobRequest model
const router = express.Router();

// Create a new job request
router.post('/api/job-requests', async (req, res) => {
  // Handle job request creation
});

// Fetch all job requests (for admin or customers)
router.get('/api/job-requests', async (req, res) => {
  // Fetch job requests from the database
});

// Additional endpoints for updating or deleting job requests
