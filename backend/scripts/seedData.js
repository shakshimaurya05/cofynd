const mongoose = require('mongoose');
const Space = require('../src/models/space');
require('dotenv').config();

// Connect to Atlas database
mongoose.connect(process.env.MONGODB_URL)
.then(async () => {
  try {
    console.log('Connected to Atlas database');
    
    // Clear existing data
    await Space.deleteMany({});
    console.log('Cleared existing data');
    
    // Load data from data.json file
   const data = require('../data.json');
    
    // Insert the data into Atlas
    await Space.insertMany(data);
    console.log(`Successfully inserted ${data.length} spaces into Atlas database`);
    
    // Close connection
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding data:', error);
    mongoose.disconnect();
  }
});