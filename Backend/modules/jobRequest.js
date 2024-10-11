const mongoose = require('mongoose');

const jobRequestSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  //title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  service: { type: String, required: true }, // Service required
  status: { type: String, enum: ['open', 'in_progress', 'completed', 'cancelled'], default: 'open' },
  serviceProviderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Optional initially
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const JobRequest = mongoose.model('JobRequest', jobRequestSchema);

module.exports = JobRequest;
