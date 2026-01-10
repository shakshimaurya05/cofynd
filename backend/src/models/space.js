const mongoose = require('mongoose');

const spaceSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  spaceType : {
    type : String,
    required : true,
    enum : ['coworking','coliving','virtual-office']
  },
  city : {
    type : String,
    required : true
  },
  location : {
    type : String,
    required : true
  },
  pricePerMonth : {
    type : Number,
    required : true
  },
  rating : {
    type : Number,
    required : true
  },
  amenities : [{
    type : String
  }],
  image : {
    type :  String
  }
},
  {
    timestamps : true //for getting createdAt and updatedAt fields
  

});