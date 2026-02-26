const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const nodemailer = require('nodemailer');
require('dotenv').config();

//create a transporter for sending mails
const transporter =  nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS?.replace(/\s/g, '') // Remove spaces from password
  },
  tls: {
    rejectUnauthorized: false
  }
});

//POST A NEW LEAD
router.post('/',async(req,res) => {
  try{
    console.log('Lead request received:', req.body);
    
    const leadData = {
      name : req.body.name,
      email: req.body.email,
      phone : req.body.phone,
      spaceType : req.body.spaceType,
      city: req.body.city
    };

    console.log('Saving lead to DB...');
    const savedLead = await Lead.create(leadData);
    console.log('Lead saved successfully!');

    // 1. Send mail to admin
    console.log('Sending admin email...');
    const adminMailOptions = {
      from : process.env.MAIL_USER,
      to : process.env.MAIL_USER,
      subject : 'New Lead Submission - CoworkSpaze',
      html : `
      <h2>New Lead Submitted</h2>
      <p><strong>Name:</strong> ${leadData.name}</p>
      <p><strong>Email:</strong> ${leadData.email}</p>
      <p><strong>Phone:</strong> ${leadData.phone}</p>
      <p><strong>City:</strong> ${leadData.city}</p>
      <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
      `
    };

    // 2. Send confirmation mail to user
    const userMailOptions = {
      from : process.env.MAIL_USER,
      to : leadData.email,
      subject : 'Thank You for Contacting CoworkSpaze! 🏢',
      html : `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .logo { font-size: 48px; margin-bottom: 10px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="logo">🏢</div>
              <h1>CoworkSpaze</h1>
            </div>
            <div class="content">
              <h2>Hi ${leadData.name}! 👋</h2>
              <p>Thank you for reaching out to us!</p>
              <p>We have successfully received your inquiry for a <strong>${leadData.spaceType}</strong> space in <strong>${leadData.city}</strong>.</p>
              <p>Our team will review your requirements and get back to you within <strong>24-48 hours</strong>.</p>
              
              <p style="margin-top: 20px;">In the meantime, feel free to explore our workspace options!</p>
              
              <div class="footer">
                <p>Best Regards,<br><strong>The CoworkSpaze Team</strong></p>
                <p>📧 ${process.env.MAIL_USER} | 📞 +91-XXXXXXXXXX</p>
              </div>
            </div>
          </div>
        </body>
      </html>
      `
    };

    // Send both emails
    console.log('Sending admin email...');
    await transporter.sendMail(adminMailOptions);
    console.log('Admin email sent!');
    
    console.log('Sending user email...');
    await transporter.sendMail(userMailOptions);
    console.log('User email sent!');

    res.status(201).json(savedLead);
  }
  catch(err){
    console.error('Lead submission error:', err);
    res.status(400).json({
      message : err.message
    });
  }
});

module.exports = router;