const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNo: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ['Customer', 'Technician', 'Admin'], required: true },
  service: {
    type: String,
    required: function() {
      return this.role === 'Technician'; // Only required for technicians
    }
  },
  status: { type: String, default: 'Active' },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: function() {
        return this.role === 'Technician'; // Only required for technicians
      }
    },
    coordinates: {
      type: [Number],
      required: function() {
        return this.role === 'Technician'; // Only required for technicians
      }
    }
  }
}, { timestamps: true });

userSchema.index({ location: '2dsphere' });

const User = mongoose.model('User', userSchema);
module.exports = User;
