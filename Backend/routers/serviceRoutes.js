const express = require('express')
const router = express.Router()
const ServicesDB = require('../modules/services')

//sending Services
router.get('/service',async(req,res)=>{
    try{
      //fetch all service details and send to admin
      const service = await ServicesDB.find({})
      res.status(200).json({service})
    }
    catch(error){
      res.status(500).json({'Error fetching services':error})
    }
  }) 

//Creating Services
router.post('/newservice',async(req,res)=>{
    const {newService,description}=req.body;
  try{
    //check if the same service already exists
    const servicename = await ServicesDB.findOne({servicename:newService})
    if(servicename){
       return res.status(203).json({message:'Service is already exists'})
    }

    const newservice = new ServicesDB({
      servicename:newService,
      servicedescription:description
    });

    //save the new service
    await newservice.save()
    console.log(newservice)
    return res.status(200).json({message:'Service Added'})
  }
  catch(error){
    return res.status(500).json({message:'Internal error'})
  }
})

//updating service status
router.put('/statusupdate',async(req,res) => {
    const {id} = req.body;  
    try{
        //find the service by the condition
        const StatusUpdate = await ServicesDB.findById(id)
        if(!StatusUpdate){
          return res.status(404).json({message:'Service not found'})
        }
        //change the status by the condition
        const updatedata = StatusUpdate.status === 'Active'?'Inactive':'Active';
        StatusUpdate.status = updatedata

        //storing the updated value in database
        await StatusUpdate.save()
        return res.status(200).json({StatusUpdate})
      }
      catch(error){
        return res.status(400).json({'error while update status':error})
      }
  })

  //deleting a service 
  router.delete( '/deletingservice' , async( req,res ) => {
        const {id} = req.body;
        try{
            //check if the service is exists and delete
            const existingService = await ServicesDB.findOneAndDelete({_id:id})
            if(!existingService){
                return res.status(400).json({message:'Unable to delete the Service'})
            }
            console.log(existingService)
            return res.status(200).json({message:'service deleted successfully'})
        }
        catch(error){
            return res.status(500).json({error:'Internal error'})
        }
  })

  module.exports = router;