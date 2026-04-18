const mongoose = require('mongoose');

const virtualOfficeLeadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      default: 'virtual-office',
      trim: true,
    },
    status: {
      type: String,
      default: 'new',
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const VirtualOfficeLead = mongoose.model('VirtualOfficeLead', virtualOfficeLeadSchema);
module.exports = VirtualOfficeLead;
