const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  date: String,
  approved: Boolean,
  user:{
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  spot:{
    type: mongoose.Types.ObjectId,
    ref: 'Spot'
  },
});

module.exports = mongoose.model('Booking', BookingSchema);