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

//GET spaces by space type(coworking, coliving, virtual office)
router.get('/type/:type', async (req, res) => {
  try {
    const query = { spaceType: req.params.type };

    // If city is passed as query param, add it
    if (req.query.city) {
      query.city = req.query.city;
    }

    const spaces = await space.find(query);
    res.json(spaces);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


//GET spaces by city
router.get('/city/:city', async(req,res) => {
  try{
    const spaces = await space.find({city : req.params.city});
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




// POST route to add sample data (for testing purposes)


module.exports = router;
