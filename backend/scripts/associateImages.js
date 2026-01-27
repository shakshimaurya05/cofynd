const mongoose = require('mongoose');
const space = require("../src/models/space");
require('dotenv').config();


mongoose.connect(process.env.MONGODB_URL);

const associateImages = async () =>{
  try{
    console.log('Starting image association...');
    const spaces = await space.find({});
    let updatedCount = 0;
     for (const space of spaces) {
      // Simulate the Google Drive structure mapping
      // In reality, you would need to connect to Google Drive API or have a mapping file
      const driveStructure = {
        'Gurugram': {
          'DLF Cyber Hub': {
            '91Springboard': [
              'https://drive.google.com/drive/folders/91Springboard/1.webp',
              'https://drive.google.com/drive/folders/91Springboard/2.webp',
              'https://drive.google.com/drive/folders/91Springboard/3.webp',
              'https://drive.google.com/drive/folders/91Springboard/4.webp',
              'https://drive.google.com/drive/folders/91Springboard/5.webp',
              'https://drive.google.com/drive/folders/91Springboard/6.webp',
              'https://drive.google.com/drive/folders/91Springboard/7.webp',
              'https://drive.google.com/drive/folders/91Springboard/8.webp',
              'https://drive.google.com/drive/folders/91Springboard/9.webp'
            ]
          },
          'Golf Course Road': {
            'CoWrks': [
              'https://drive.google.com/drive/folders/CoWrks/1.webp',
              'https://drive.google.com/drive/folders/CoWrks/2.webp',
              'https://drive.google.com/drive/folders/CoWrks/3.webp'
            ]
          },
          'Golf Course Extension Road': {
            'Incuspaze Office Solutions': [
              'https://drive.google.com/drive/folders/Incuspaze/1.webp',
              'https://drive.google.com/drive/folders/Incuspaze/2.webp',
              'https://drive.google.com/drive/folders/Incuspaze/3.webp'
            ]
          }
        }
      };
      
      // Find matching images based on city, microLocation, and company name
      const cityImages = driveStructure[space.city];
      if (cityImages) {
        const microLocationImages = cityImages[space.microLocation];
        if (microLocationImages) {
          const companyImages = microLocationImages[space.companyName];
          if (companyImages) {
            // Update the space with the found images
            await space.updateOne(
              { _id: space._id },
              { images: companyImages }
            );
            console.log(`Updated ${space.companyName} with ${companyImages.length} images`);
            updatedCount++;
          }
        }
      }
    }
  }

  catch(err){
    console.error('Error associating images:', error);
    process.exit(1);
  }
}


const clearImages = async () => {
  try {
    await Space.updateMany({}, { images: [] });
    console.log('Cleared all images from spaces');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing images:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-c') {
  clearImages();
} else {
  associateImages();
}