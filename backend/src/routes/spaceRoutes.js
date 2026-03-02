const express = require('express');

const router = express.Router();
const space = require('../models/space');

// Default placeholder image URL (using reliable placeholder service)
const DEFAULT_IMAGE = 'https://placehold.co/600x400/e2e8f0/475569?text=No+Image+Available';

// Helper function to add default image if images array is empty
const addDefaultImage = (spaces) => {
  if (Array.isArray(spaces)) {
    return spaces.map(space => ({
      ...space.toObject(),
      images: space.images && space.images.length > 0
        ? space.images
        : [DEFAULT_IMAGE]
    }));
  }
  // For single space object
  if (spaces) {
    const spaceObj = spaces.toObject();
    return {
      ...spaceObj,
      images: spaceObj.images && spaceObj.images.length > 0
        ? spaceObj.images
        : [DEFAULT_IMAGE]
    };
  }
  return spaces;
};

//GET all spaces (with pagination)
router.get('/',async(req,res) => {
  try{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [spaces, total] = await Promise.all([
      space.find()
        .select('companyName microLocation city pricing images rating')
        .skip(skip)
        .limit(limit),
      space.countDocuments()
    ]);

    res.json({
      spaces: addDefaultImage(spaces),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalSpaces: total,
        hasMore: skip + spaces.length < total
      }
    });
  }
  catch(err){
    res.status(500).json({
      message : err.message
    });
  }
});

//GET spaces by microLocation

//GET spaces by microLocation - IMPROVED TO HANDLE SPACES AND CASE DIFFERENCES
router.get('/microLocation/:microLocation', async(req,res) =>{
  try{
    // Normalize the search term by removing spaces and special characters
    const normalizeSearchTerm = (term) => term.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
    const normalizedInput = normalizeSearchTerm(req.params.microLocation);

    // Find spaces where the normalized microLocation matches the normalized search term
    const spaces = await space.find({
      $expr: {
        $regexMatch: {
          input: { $replaceAll: { input: { $toLower: "$microLocation" }, find: " ", replacement: "" } },
          regex: normalizedInput,
          options: "i"
        }
      }
    });

    res.json(spaces);
  }
  catch(err){
    res.status(500).json({
      message: err.message
    });
  }
});



//GET spaces by city (with pagination)
router.get('/city/:city', async(req,res) => {
  try{
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const [spaces, total] = await Promise.all([
      space.find({ city: new RegExp(req.params.city, 'i') })
        .select('companyName microLocation city pricing images rating')
        .skip(skip)
        .limit(limit),
      space.countDocuments({ city: new RegExp(req.params.city, 'i') })
    ]);

    res.json({
      spaces: addDefaultImage(spaces),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalSpaces: total,
        hasMore: skip + spaces.length < total
      }
    });
  }
  catch(err){
    res.status(500).json({message : err.message});
  }
});

//GET spaces by city and microLocation (with pagination)
router.get('/city/:city/microLocation/:microLocation', async(req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const normalizeSearchTerm = (term) => term.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
    const normalizedInput = normalizeSearchTerm(req.params.microLocation);

    const [spaces, total] = await Promise.all([
      space.find({
        city: new RegExp(req.params.city, 'i'),
        $expr: {
          $regexMatch: {
            input: { $replaceAll: { input: { $toLower: "$microLocation" }, find: " ", replacement: "" } },
            regex: normalizedInput,
            options: "i"
          }
        }
      })
        .select('companyName microLocation city pricing images rating')
        .skip(skip)
        .limit(limit),
      space.countDocuments({
        city: new RegExp(req.params.city, 'i'),
        $expr: {
          $regexMatch: {
            input: { $replaceAll: { input: { $toLower: "$microLocation" }, find: " ", replacement: "" } },
            regex: normalizedInput,
            options: "i"
          }
        }
      })
    ]);

    res.json({
      spaces: addDefaultImage(spaces),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalSpaces: total,
        hasMore: skip + spaces.length < total
      }
    });
  }
  catch(err) {
    res.status(500).json({ message: err.message });
  }
});

//GET a specific space by ID
router.get('/:id', async(req,res) => {
  try{
    const spaces = await space.findById(req.params.id);
    if(!spaces) {
      return res.json({
        message : 'Space not found'
      });
    }
    res.json(spaces);
  }
  catch(err){
    res.status(500).json({message : err.message});
  }
});




//GET spaces by company name

router.get('/company/:companyName', async(req,res) => {
  try{
    // Get the search term and normalize it
    const searchTerm = req.params.companyName.toLowerCase();

    // Create a regex that removes spaces from both search term and database entries for comparison
    const normalizedSearchTerm = searchTerm.replace(/\s+/g, '');

    // Find companies where the normalized name matches
    const spaces = await space.find({
      $expr: {
        $regexMatch: {
          input: { $replaceAll: { input: { $toLower: "$companyName" }, find: " ", replacement: "" } },
          regex: normalizedSearchTerm,
          options: "i"
        }
      }
    });

    res.json(spaces);
  }
  catch(err){
    res.status(500).json({message : err.message});
  }
});

module.exports = router;