const express = require('express');

const router = express.Router();
const space = require('../models/space');

//GET all spaces
router.get('/',async(req,res) => {
  try{
    const spaces = await space.find();
    res.json(spaces);
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



//GET spaces by city
router.get('/city/:city', async(req,res) => {
  try{
    const spaces = await space.find({
      city : new RegExp(req.params.city,'i') });
    res.json(spaces);
  }
  catch(err){
    res.status(500).json({message : err.message});
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
