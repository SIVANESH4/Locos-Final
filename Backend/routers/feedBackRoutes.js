const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const FeedDB = require('../modules/feedback')
const UserDB = require('../modules/user')

router.post('/feedbackform',async(req,res) => {
     try {
          const { servicerId, serviceId, custId, rating, feedbackText } = req.body;
          const feedback = new FeedDB({
            serviceProviderId :servicerId,
            serviceId,
            CustomerId:custId,
            rating,
            feedbackText,
          });
      
          await feedback.save();
          res.status(201).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
          res.status(500).json({ message: 'Error submitting feedback', error });
    }
});

// Route to get feedback for a specific servicer
router.get('/feedbacklist', async (req, res) => {
    try {
      const feedbackList = await Feedback.find({ servicerId: req.params.servicerId });
      const Customer = await UserDB.findOne({_id:feedbackList.CustomerId})
      res.status(200).json({ feedback: feedbackList ,name:Customer.username });
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving feedback', error });
    }
 });


module.exports = router;