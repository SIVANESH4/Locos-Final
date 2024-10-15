const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNo: { type: String, required: true },
  address: { type: String, required: true },
  pincode: { type: String, required: true },
  role: { type: String, enum: ['Customer', 'Technician', 'Admin'], required: true },
  service: { type: String }, // For service providers
  status: { type: String, default: 'Active' },
  location: {
    type: { type: String, enum: ['Point'], required: true }, // 'Point' for geojson
    coordinates: { type: [Number], required: true } // [longitude, latitude]
  }
}, { timestamps: true });

userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);
module.exports = User;
