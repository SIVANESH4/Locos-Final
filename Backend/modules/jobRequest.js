const mongoose = require('mongoose');

const jobRequestSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  //title: { type: String, required: true },
  //description: { type: String, required: true },
  location: { type: String, required: true },
  service: { type: String, required: true }, // Service required
  status: { type: String, enum: ['pending', 'In_Progress', 'completed', 'cancelled'], default: 'pending' },
  serviceProviderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Optional initially
  customerName:{type:String,required:true},
  serviceProviderName:{type:String,required:true},
  issue:{type:String,required:true},
  createdAt: { type: Date, default: Date.now },
  bookingDate:{type:Date,required:true},
  customerPhNo:{type:String}
});

const JobRequest = mongoose.model('JobRequest', jobRequestSchema);

module.exports = JobRequest;
