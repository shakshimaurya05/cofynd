const express = require('express');

const router = express.Router();
const space = require('..models/space');

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

//GET spaces by space type(coworking, coliving, virtual office)
router.get('/type/:type', async(req,res) => {
  try{
    const spaces = await space.find({spaceType : req.params.type}) //req.params gives object containing all dynamic parts of URL
    res.json(spaces);
  }
  catch(err){
    res.status(500).json({
      message : err.message
    });
  }
});

//GET a specific space by ID
router.get('/:id', async(req,res) => {
  try{
    const space = await space.findById(req.params.id);
    if(!space) {
      return res.json({
        message : 'Space not found'
      });
    }
  }
  catch(err){
    res.status(500).json({message : error.message});
  }
});

//GET spaces by city
router.get(':city', async(req,res) => {
  try{
    const spaces = await space.find({city : req.params.city});
    res.json(spaces);
  }
  catch(err){
    res.status(500).json({message : err.message});
  }
});

module.exports = router;
