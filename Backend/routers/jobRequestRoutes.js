const express = require('express');
const JobRequest = require('../modules/jobRequest'); // Import the JobRequest model
const UserDB = require('../modules/user')
const router = express.Router();
const mongoose = require('mongoose')
const moment = require('moment')
const nodemailer = require('nodemailer')

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
  try{

    const job = await JobRequest.find({
     serviceProviderId:req.body.user,
     status:'pending'
    })
    
    if(job.length === 0){
      return res.status(200).json({message:'No jobs found for this users'})
    }

    return res.status(200).json(job);
  }
  catch(error){
    return res.status(500).json({message:'Error while fetching',err:error.message})
  }

});

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
      return res.status(200).json({message:'No jobs found for this users'})
    }

    return res.status(200).json({job})
  }
  catch(error){
    return res.status(500).json({message:'Error while fetching',err:error.message})
  }

});

//sending job Request to admin
router.get('/fetchjobRequest',async(req,res) =>{
  try{
    const RequestList = await JobRequest.find({})
    return res.status(200).json({status:'success',RequestList})
  }
  catch(error){
    return res.status(500).json({error})
  }
})

//sending job Request count for admin
router.get('/jobrequestcount',async(req,res) => {
  try{
    const totalJob = await JobRequest.countDocuments()
    const pendingJob = await JobRequest.countDocuments({status:'In_Progress'})
    const completeJob = await JobRequest.countDocuments({status:'completed'})
    return res.status(200).json({status:'success',totalJob,completeJob,pendingJob})
  }
  catch(error){
    return res.status(500).json({error})
  }
})

//job request count for technician
router.post('/countjob',async(req,res) => {
  try{

    // const user = await JobRequest.find({_id:id})
    // if(!user){
    //   return res.status(404).json({message:'user not found'})
    // }

      const progress = await JobRequest.countDocuments({
        $or: [{ customerId: req.body.custId}, { serviceProviderId: req.body.servicerId}],
        status: "In_Progress" 
      })

      const pending = await JobRequest.countDocuments({
        $or: [{ customerId: req.body.custId}, { serviceProviderId: req.body.servicerId}],
        status:"pending"})

      const complete = await JobRequest.countDocuments({ 
        $or: [{ customerId: req.body.custId}, { serviceProviderId: req.body.servicerId}],
        status:"completed"})

        const cancel = await JobRequest.countDocuments({ 
          $or: [{ customerId: req.body.custId}, { serviceProviderId: req.body.servicerId}],
          status:"cancelled"})

    return res.status(200).json({progress,pending,complete,cancel})
  }
  catch(error){
    return res.status(500).json({error:error.message})
  }
})

//ongoing job Request
router.post('/ongoingjob', async (req, res) => {
  const {user} = req.body
  try{

    //validate that the ID is provided
    // if(!user){
    //   return res.status(404).json({message:'Users ID is required'})
    // } 

    const job = await JobRequest.find({
      $or:[{customerId:user } ,{serviceProviderId:user}],
      status:'In_Progress'
    })
    
    //check the job were found
    if(job.length === 0){
      return res.status(200).json({job:'No jobs found for this users'})
    }

    return res.status(200).json({job})
  }
  catch(error){
    return res.status(500).json({message:'Error while fetching',err:error.message})
  }

});

//accept job request
router.post('/acceptjobrequest', async (req, res) => {
  try {
    const id = req.body.custId;
    const user = await UserDB.findById(id);
    const job = await JobRequest.findOneAndUpdate({
      customerId: req.body.custId,
      serviceProviderId: req.body.servicerId
    },
    {
      $set : {
        status:"In_Progress"
      }
    },
    {
      new:true
    }
  );

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Check if the job exists
    if (!job) {
      return res.status(404).json({ message: 'Job request not found' });
    }

    // Configure Nodemailer transporter
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILID,
        pass: process.env.MAILPASS,
      },
    });

    // Configure the email options
const send = {
  from: `Loco's ${process.env.MAILID}`,
  to: user.email, // Use the customer's email
  subject: 'Job Request Accepted Notification',
  html: `
    <!DOCTYPE html>
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
        <h2>Hello ${user.username},</h2>
        <p>Good news! Your job request for the service <strong>${job.service}</strong> has been accepted by <strong>${job.serviceProviderName}</strong>.</p>
        <p>The service provider will contact you soon to discuss the details and schedule the service.</p>
        <p>If you have any questions or need further assistance, please feel free to reach out to our support team.</p>
        <div class="footer">
          <p>Best regards,<br>Loco's Service Team</p>
        </div>
      </div>
    </body>
    </html>`
};

    
    // Send the email
    await transport.sendMail(send);

    return res.status(200).json({ message: "Service cancelled successfully.", job });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Function to generate a random 4-digit OTP
const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000); // Generates a number between 1000 and 9999
};

router.post('/confirmationjobrequest', async (req, res) => {
  try {
    const id = req.body.custId;
    const user = await UserDB.findById(id);

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Generate a 4-digit OTP
    const otp = generateOTP();

    // Configure Nodemailer transporter
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILID,
        pass: process.env.MAILPASS,
      },
    });

    // Configure the email options
    const send = {
      from: `Loco's ${process.env.MAILID}`,
      to: user.email, // Use the user's email
      subject: 'Service Completion Notification',
      html: `
        <!DOCTYPE html>
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
            <h2>Hello ${user.username},</h2>
            <p>Your service request has been completed successfully!</p>
            <p>To confirm the completion, please use the following OTP:</p>
            <h4 style="font-weight: bold;">${otp}</h4>
            <p>If you did not request this, please ignore this email or contact support if you have questions.</p>
            <div class="footer">
              <p>Best regards,<br>Loco's Service Team</p>
            </div>
          </div>
        </body>
        </html>`
    };

    // Send the email
    await transport.sendMail(send);

    return res.status(200).json({ message: "Service completed successfully. OTP sent to your email." ,otp});
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//complete status update
router.post('/completejobrequest',async(req,res) => {
  try{
      const completeJob = await JobRequest.findOneAndUpdate(
        {
          customerId:req.body.custId,
          serviceProviderId:req.body.servicerId
        },
        {
          $set : {
            status:"completed"
          }
        },
        {
          new:true
        }
      )
      if(!completeJob){
        console.log(completeJob)
        return res.status(404).json({message:'no such as job request'})
      }
      return res.status(200).json({status:'success',completeJob})
  }
  catch(error){
    return res.status(500).json({error})
  }
})

//cancelling the job request for technician
router.post('/canceljobrequest', async (req, res) => {
  try {
    const id = req.body.custId;
    const user = await UserDB.findById(id);
    const job = await JobRequest.findOneAndUpdate({
      customerId: req.body.custId,
      serviceProviderId: req.body.servicerId
    },
    {
      $set : {
        status:"cancelled"
      }
    },
    {
      new:true
    }
  );

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Check if the job exists
    if (!job) {
      return res.status(404).json({ message: 'Job request not found' });
    }

    // Configure Nodemailer transporter
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILID,
        pass: process.env.MAILPASS,
      },
    });

    // Configure the email options
    const send = {
      from: `Loco's ${process.env.MAILID}`,
      to: user.email, // Use the user's email
      subject: 'Job Request Cancellation Notification',
      html: `
        <!DOCTYPE html>
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
            <h2>Hello ${user.username},</h2>
            <p>We regret to inform you that your job request for the service <strong>${job.service}</strong> provided by <strong>${job.serviceProviderName}</strong> has been cancelled.</p>
            <p>If you need further assistance or would like to connect with another service provider, please do not hesitate to reach out to our support team.</p>
            <p>We apologize for any inconvenience this may have caused and appreciate your understanding.</p>
            <div class="footer">
              <p>Best regards,<br>Loco's Service Team</p>
            </div>
          </div>
        </body>
        </html>`
    };

    // Send the email
    await transport.sendMail(send);

    return res.status(200).json({ message: "Service cancelled successfully.", job });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

//cancel job request for customer
router.post('/declinejobrequest', async (req, res) => {
  try {
    const id = req.body.servicerId;
    const user = await UserDB.findById(id);
    console.log(user)
    const job = await JobRequest.findOneAndUpdate({
      customerId: req.body.custId,
      serviceProviderId: req.body.servicerId
    },
    {
      $set : {
        status:"cancelled"
      }
    },
    {
      new:true
    }
  );

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    // Check if the job exists
    if (!job) {
      return res.status(404).json({ message: 'Job request not found' });
    }

    // Configure Nodemailer transporter
    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAILID,
        pass: process.env.MAILPASS,
      },
    });

    // Configure the email options
    const send = {
      from: `Loco's ${process.env.MAILID}`,
      to: user.email, // Use the service provider's email
      subject: 'Job Request Cancellation Notification',
      html: `
        <!DOCTYPE html>
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
            <h2>Hello ${job.serviceProviderName},</h2>
            <p>We would like to inform you that the customer <strong>${job.customerName}</strong> has cancelled their job request for the service <strong>${job.service}</strong>.</p>
            <p>If you have any questions or need further details, please do not hesitate to contact our support team.</p>
            <p>We appreciate your understanding and look forward to continuing to work with you.</p>
            <div class="footer">
              <p>Best regards,<br>Loco's Service Team</p>
            </div>
          </div>
        </body>
        </html>`
    };
    
    // Send the email
    await transport.sendMail(send);

    return res.status(200).json({ message: "Service cancelled successfully.", job });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
