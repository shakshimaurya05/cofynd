const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['dedicated-desk', 'private-cabin', ''],
    default: ''
  },
  seats: {
    type: String,
    default: ''
  },
  spaceTitle: {
    type: String,
    required: true
  },
  spaceLocation: {
    type: String,
    required: true
  }
},
{
  timestamps: true
}
);

const Quote = mongoose.model('Quote', quoteSchema);
module.exports = Quote;
