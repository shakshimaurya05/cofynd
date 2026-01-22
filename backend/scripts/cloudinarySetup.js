const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const {cloudinaryStorage} = require('multer-storage-cloudinary')
//multer is a NODE.js middleware used to handle files/images uploaded by user 
const mongoose = require('mongoose');
const Space = require('../src/models/space'); // Changed to uppercase 'Space'
const fs = require('fs');
const path = require('path');
require('dotenv').config();

//configue cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

mongoose.connect(process.env.MONGODB_URL);

const uploadImagesToCloudinary = async () => {
  try{
    console.log('Starting to upload images folder...');
    //path of images folder
    const imagesBasePath = './gurugram';

    //get all spaces from DB
    const spaces = await Space.find({}); // Changed to uppercase 'Space'

    let uploadedCnt = 0;
    for(const space of spaces){ // 'space' here is the loop variable, not the model
      // Check if the microLocation directory exists first
      const microLocationPath = path.join(imagesBasePath, space.microLocation);
      if (fs.existsSync(microLocationPath)) {
        // Get all company folders in the microLocation directory
        const companyFolders = fs.readdirSync(microLocationPath).filter(item =>
          fs.statSync(path.join(microLocationPath, item)).isDirectory()
        );
        
        // Find the matching company folder (fuzzy matching)
        // Find the matching company folder (more sophisticated fuzzy matching)
const matchingCompany = companyFolders.find(folder => {
  // Normalize both names by removing spaces and special characters for comparison
  const normalizeName = (name) => name.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  
  const normalizedFolder = normalizeName(folder);
  const normalizedSpace = normalizeName(space.companyName);
  
  // Check if they match when normalized (spaces and special chars removed)
  return normalizedFolder.includes(normalizedSpace) || normalizedSpace.includes(normalizedFolder);
});
        
        if (matchingCompany) {
          const finalCompanyPath = path.join(microLocationPath, matchingCompany);
          
          // Check if the company directory exists
          if (fs.existsSync(finalCompanyPath)) {
            const imageFiles = fs.readdirSync(finalCompanyPath).filter(file => 
              file.toLowerCase().endsWith('.webp') || 
              file.toLowerCase().endsWith('.jpg') || 
              file.toLowerCase().endsWith('.jpeg') || 
              file.toLowerCase().endsWith('.png')
            );
            
            const uploadedImageUrls = [];
            
            for (const imageFile of imageFiles) {
              const imagePathFull = path.join(finalCompanyPath, imageFile);
              
              // Upload to Cloudinary
              const result = await cloudinary.uploader.upload(imagePathFull, {
                folder: `cofynd/${space.city.replace(/\s+/g, '_')}/${space.microLocation.replace(/\s+/g, '_')}`,
                tags: [
                  space.companyName.toLowerCase().replace(/\s+/g, '-'),
                  space.microLocation.toLowerCase().replace(/\s+/g, '-'),
                  space.city.toLowerCase().replace(/\s+/g, '-')
                ],
                resource_type: 'image'
              });
              
              uploadedImageUrls.push(result.secure_url);
              console.log(`Uploaded: ${imageFile} for ${space.companyName}`);
            }
            
            // Update the space with the uploaded image URLs - FIXED: Use uppercase 'Space'
            if (uploadedImageUrls.length > 0) {
              await Space.updateOne( // Changed to uppercase 'Space'
                { _id: space._id },
                { images: uploadedImageUrls }
              );
              console.log(`Updated ${space.companyName} with ${uploadedImageUrls.length} images`);
              uploadedCnt++;
            }
          } else {
            console.log(`Company directory not found: ${finalCompanyPath}`);
          }
        } else {
          console.log(`No matching company folder found for: ${space.companyName} in ${space.microLocation}`);
        }
      } else {
        console.log(`Microlocation directory not found: ${microLocationPath}`);
      }
    }
    
    console.log(`Successfully uploaded images for ${uploadedCnt} spaces`);
    process.exit(0);
  } catch (error) {
    console.error('Error uploading images to Cloudinary:', error);
    process.exit(1);
  }
};

//command line argument handling
if(process.argv[2] == '-u'){
  uploadImagesToCloudinary();
}
else{
   console.log('Usage:');
  console.log('  node scripts/cloudinarySetup.js -u    # Upload images to Cloudinary');
}