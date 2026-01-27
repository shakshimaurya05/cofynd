const mongoose = require('mongoose');
const Space = require('../src/models/space');
require('dotenv').config(); //loads environment varibales present in .env file

const spaceData = require('../src/gurgaonCoworking.json');

const importData = async() =>{
  try{
      await mongoose.connect(process.env.MONGODB_URL);
      await Space.deleteMany({});
      await Space.insertMany(spaceData);
      console.log('data imported successfully')
      process.exit(0); //exits the script with success code 0 , program terminates immediately 
      
  }
  catch(err){
    console.error('Error importing data:',err);
    process.exit(1);
  };
}


const destroyData = async () => {
  try {
    await Space.deleteMany({});
    console.log('Data destroyed!');
    process.exit(0);
  } catch (error) {
    console.error('Error destroying data:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}