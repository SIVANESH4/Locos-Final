const mongoose = require('mongoose')

const FeedbackSchema = new mongoose.Schema({
    serviceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
      required: true, // Required if feedback is service-specific
    },
    serviceProviderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Servicer',
      required: true,
    },
    CustomerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customer',
      required: true, // Required to ensure feedback is tied to a real user
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    feedbackText: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });

  const FeedBack = mongoose.model('FeedBack', FeedbackSchema);

  module.exports = FeedBack;

  