const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  microLocation: {
    type: String,
    required: true
  },
  pricing: {
    dedicatedSeat: {
      type: Number
    },
    cabinSeat: {
      type: Number
    }
  },
  images: [{
    type: String
  }],
  rating: {
    type: Number
  },
  amenities: [{
    type: String
  }]
}, {
  timestamps: true
});

const Space = mongoose.model('Space', spaceSchema);

module.exports = Space;