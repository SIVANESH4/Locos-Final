const express = require('express');
const JobRequest = require('../modules/jobRequest'); // Import the JobRequest model
const router = express.Router();
const mongoose = require('mongoose')

// Create a new job request
router.post('/creatingjob', async (req, res) => {
  // Handle job request creation
  console.log(req.body)
  try{
  //check for existing service
  const existingService = await JobRequest.findOne({
    customerId:req.body.custId,
    service:req.body.service,
    serviceProviderId:req.body.servicerId
  })

  if(existingService){
    console.log('exist')
    return res.status(409).json({message:'Service already exists'})
  }

  //create service data
  const JobData = {
    customerId:req.body.custId,
    description:req.body.description,
    location:req.body.location,
    service:req.body.service,
    serviceProviderId:req.body.servicerId
  }

  //save new job request in database
  const newJob = new JobRequest(JobData)
  await newJob.save()
  return res.status(201).json({message:'Job Request Created Successfully'})
  }
  catch(error){
    return res.status(500).json({message:'An error Occured',error:error.message})  
  }
});

// Fetch all job requests ( customers or technician)
router.get('/joblist', async (req, res) => {
  const {id} = req.body
  try{

    //validate that the ID is provided
    if(!id){
      return res.status(404).json({message:'Users ID is required'})
    } 

    const job = await JobRequest.find({
      $or:[{customerId:id } ,{serviceProviderId:id}]
    })
    
    //check the job were found
    if(job.length === 0){
      return res.status(404).json({message:'No jobs found for this users'})
    }

    return res.status(200).json({job})
  }
  catch(error){
    return res.status(500).json({message:'Error while fetching',err:error.message})
  }

});

// Additional endpoints for updating or deleting job requests

module.exports = router;
