const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const nodemailer = require('nodemailer');
require('dotenv').config();

//create a transporter for sending mails
const transporter =  nodemailer.createTransport({
  service : "gmail",
  auth: {
    user : process.env.MAIL_USER,
    pass : process.env.MAIL_PASS
  }
});

//POST A NEW LEAD
router.post('/',async(req,res) => {
  try{
    const leadData = {
      name : req.body.name,
      email: req.body.email,
      phone : req.body.phone,
      spaceType : req.body.spaceType,
      city: req.body.city
    };

    const savedLead = await Lead.create(leadData);

    //send mail to admin
    const mailOptions = {
      from : process.env.MAIL_USER,
      to : process.env.MAIL_USER,
      subject : 'New Lead Submission - CoworkSpaze',
      html : `
      <h2> New Lead Submitted </h2>
      <p><strong> Name : </strong> ${leadData.name} </p>
      <p><strong> Email : </strong> ${leadData.email} </p>
      <p><strong> Phone : </strong> ${leadData.phone} </p>
      <p><strong> City : </strong> ${leadData.city} </p>
      <p><strong> Submitted at : </strong> ${new Date().toLocaleString()}</p>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(201).json(savedLead);
  }
  catch(err){
    res.status(400).json({
      message : err.message
    });
  }
})

