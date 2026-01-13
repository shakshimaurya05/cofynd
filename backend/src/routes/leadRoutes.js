const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');

//POST a new lead
router.post('/',async(req,res) => {
  try{
    const leadData = {
      name : req.body.name,
      email : req.body.email,
      phone : req.body.phone,
      spaceType : req.body.spaceType,
      city : req.body.city
    };

    const savedLead = await Lead.create(leadData);
    res.status(201).json(savedLead);

  }
  catch(err){
    res.status(400).json({
      message : err.message
    });
  }
});

//GET all leads only for admin 
router.get('/',async(req,res) => {
  try{
    const leads = (await Lead.find()).sort({createdAt: -1});//show leads in descending order(most recent first)
    //.sort() is a mongoose query method
    res.json(leads);
  }
  catch(err){
    res.status(500).json({message : err.message});
  }
});

module.exports = router;
