const express = require('express');
const JobRequest = require('../modules/jobRequest'); // Import the JobRequest model
const router = express.Router();
const mongoose = require('mongoose')
const moment = require('moment')

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
    return res.status(200).json({message:'Service already exists'})
  }

  // Convert the date to the correct format (YYYY-MM-DD) using moment.js
  const formattedDate = moment(req.body.bookedDate, 'DD-MM-YY').toDate();
  //create service data
  const JobData = {
    customerId:new mongoose.Types.ObjectId(req.body.custId),
    customerName:req.body.custName,
    serviceProviderName:req.body.servicerName,
    bookingDate:formattedDate,
    issue:req.body.issue,
    location:req.body.location,
    service:req.body.service,
    serviceProviderId:new mongoose.Types.ObjectId(req.body.servicerId),
    customerPhNo:req.body.phoneNo
  }

  //save new job request in database
  const newJob = new JobRequest(JobData)
  await newJob.save()
  return res.status(201).json({message:'Job Request Created Successfully'})
  }
  catch(error){
    console.log(error.message)
    return res.status(500).json({message:'An error Occured',error:error.message})  
  }
});

// Fetch all job requests ( customers or technician)
router.post('/openjoblist', async (req, res) => {
  const {user} = req.body
  try{

    //validate that the ID is provided
    if(!user){
      return res.status(404).json({message:'Users ID is required'})
    } 

    const job = await JobRequest.find({
     serviceProviderId:user,
     status:'open'
    })
    
    //check the job were found
    if(job.length === 0){
      return res.status(200).json({message:'No jobs found for this users'})
    }

    return res.status(200).json({job})
  }
  catch(error){
    return res.status(500).json({message:'Error while fetching',err:error.message})
  }

});

// decline job requests
router.put('/declinejob',async(req, res) => {
  try{
    //check that the jobRequest existing
    // const existingJob = await JobRequest.findOne({
    //   customerId:req.body.custId,
    //   serviceProviderId:req.body.servicerId
    // })

    const statusUpdate = await JobRequest.findOneAndUpdate(
      {
        customerId:req.body.custId,
        serviceProviderId:req.body.servicerId
      },
      {
        $set : {
          status:"cancelled"
        }
      },
      {
        new:true , runValidators:true
      }
    )

    if(!statusUpdate){
      return res.status(404).json({message:'No mathcing Requested'})
    }
    res.status(200).json({message:'JobRequest Declined',status:'success'})
  }
  catch(error){
    console.log(error.message)
    return res.status(500).json({message:'internal error',error:error.message})
  }
})

//accepting job Request
router.put('/acceptingjob',async(req, res) => {
  try{
    const statusUpdate = await JobRequest.findOneAndUpdate(
      {
        customerId:req.body.custId,
        serviceProviderId:req.body.servicerId
      },
      {
        $set : {
          status:"In_Progress"
        }
      },
      {
        new:true , runValidators:true
      }
    )
    if(!statusUpdate){
      return res.status(404).json({message:'No mathcing Requested'})
    }
    res.status(200).json({message:'JobRequest Accepted',status:'success'})
  }
  catch(error){
    console.log(error.message)
    return res.status(500).json({message:'internal error',error:error.message})
  }
})

// Fetch all job requests ( customers or technician)
router.post('/joblisthistory', async (req, res) => {
  const {user} = req.body
  try{

    //validate that the ID is provided
    if(!user){
      return res.status(404).json({message:'Users ID is required'})
    } 

    const job = await JobRequest.find({
      $or:[{customerId:user } ,{serviceProviderId:user}]
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

module.exports = router;
