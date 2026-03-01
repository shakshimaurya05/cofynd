const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
// const Quote = require('../models/Quote');
// const { Resend } = require('resend');
// require('dotenv').config();

// Initialize Resend
// const resend = new Resend(process.env.RESEND_API_KEY);

// POST A NEW QUOTE REQUEST

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "coworkspaze@gmail.com",
    pass: process.env.MAIL_PASSWORD
  },
  logger: true,
  debug: true,
  tls: {
    rejectUnauthorized: false, // important for some cloud env
  },
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 20000
});
router.post("/", async (req, res) => {
  // try {
  //   const quoteData = {
  //     name: req.body.name,
  //     email: req.body.email,
  //     phone: req.body.phone,
  //     type: req.body.type,
  //     seats: req.body.seats,
  //     spaceTitle: req.body.spaceTitle,
  //     spaceLocation: req.body.spaceLocation
  //   };

  //   const savedQuote = await Quote.create(quoteData);

  //   // 1. Send mail to admin
  //   const adminMailOptions = {
  //     from: process.env.MAIL_USER,
  //     to: process.env.MAIL_USER,
  //     subject: 'New Quote Request - CoworkSpaze',
  //     html: `
  //     <!DOCTYPE html>
  //     <html>
  //       <head>
  //         <style>
  //           body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
  //           .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px; }
  //         </style>
  //       </head>
  //       <body>
  //         <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
  //           <div class="header">
  //             <h1 style="margin: 0; font-size: 24px;">CoworkSpaze</h1>
  //           </div>
  //           <div style="background: #f9f9f9; padding: 30px; border-radius: 10px; margin-top: 20px;">
  //             <h2>New Quote Request Received</h2>
  //             <p><strong>Name:</strong> ${quoteData.name}</p>
  //             <p><strong>Email:</strong> ${quoteData.email}</p>
  //             <p><strong>Phone:</strong> ${quoteData.phone}</p>
  //             <p><strong>Interested In:</strong> ${quoteData.type || 'Not specified'}</p>
  //             <p><strong>Seats Required:</strong> ${quoteData.seats || 'Not specified'}</p>
  //             <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
  //             <h3>Space Details</h3>
  //             <p><strong>Property:</strong> ${quoteData.spaceTitle}</p>
  //             <p><strong>Location:</strong> ${quoteData.spaceLocation}</p>
  //             <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
  //           </div>
  //         </div>
  //       </body>
  //     </html>
  //     `
  //   };

  //   // 2. Send confirmation mail to user
  //   const userMailOptions = {
  //     from: process.env.MAIL_USER,
  //     to: quoteData.email,
  //     subject: `Quote Request for ${quoteData.spaceTitle} - CoworkSpaze`,
  //     html: `
  //     <!DOCTYPE html>
  //     <html>
  //       <head>
  //         <style>
  //           body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
  //           .container { max-width: 600px; margin: 0 auto; padding: 20px; }
  //           .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
  //           .property-box { background: white; border: 2px solid #667eea; border-radius: 10px; padding: 20px; margin: 20px 0; }
  //           .property-title { font-size: 18px; font-weight: bold; color: #667eea; margin-bottom: 5px; }
  //           .property-location { color: #666; font-size: 14px; }
  //           .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
  //           .details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
  //           .details-table td { padding: 10px; border-bottom: 1px solid #ddd; }
  //           .details-table td:first-child { font-weight: bold; color: #555; }
  //           .footer { text-align: center; margin-top: 20px; color: #666; font-size: 14px; }
  //         </style>
  //       </head>
  //       <body>
  //         <div class="container">
  //           <div class="header">
  //             <h1 style="margin: 0; font-size: 28px;">CoworkSpaze</h1>
  //           </div>
  //           <div class="content">
  //             <h2>Hi ${quoteData.name}! 👋</h2>
  //             <p>Thank you for your interest in this workspace!</p>

  //             <div class="property-box">
  //               <div class="property-title">📍 ${quoteData.spaceTitle}</div>
  //               <div class="property-location">${quoteData.spaceLocation}</div>
  //             </div>

  //             <p>We have received your quote request with the following details:</p>

  //             <table class="details-table">
  //               <tr>
  //                 <td>Workspace Type:</td>
  //                 <td>${quoteData.type ? quoteData.type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) : 'Not specified'}</td>
  //               </tr>
  //               <tr>
  //                 <td>Seats Required:</td>
  //                 <td>${quoteData.seats || 'Not specified'}</td>
  //               </tr>
  //               <tr>
  //                 <td>Contact Number:</td>
  //                 <td>${quoteData.phone}</td>
  //               </tr>
  //             </table>

  //             <p style="margin-top: 20px;">Our team is reviewing your requirements and will get back to you within <strong>24-48 hours</strong> with a customized quote.</p>

  //             <div class="footer">
  //               <p>Best Regards,<br><strong>The CoworkSpaze Team</strong></p>
  //               <p>📧 ${process.env.MAIL_USER}</p>
  //             </div>
  //           </div>
  //         </div>
  //       </body>
  //     </html>
  //     `
  //   };

  //   // Send both emails using Resend
  //   console.log('Sending emails via Resend...');

  //   try {
  //     // Admin email
  //     await resend.emails.send({
  //       from: 'CoworkSpaze <onboarding@resend.dev>',
  //       to: [process.env.MAIL_USER],
  //       subject: 'New Quote Request - CoworkSpaze',
  //       html: `
  //         <h2>New Quote Request Received</h2>
  //         <p><strong>Name:</strong> ${quoteData.name}</p>
  //         <p><strong>Email:</strong> ${quoteData.email}</p>
  //         <p><strong>Phone:</strong> ${quoteData.phone}</p>
  //         <p><strong>Interested In:</strong> ${quoteData.type || 'Not specified'}</p>
  //         <p><strong>Seats Required:</strong> ${quoteData.seats || 'Not specified'}</p>
  //         <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
  //         <h3>Space Details</h3>
  //         <p><strong>Property:</strong> ${quoteData.spaceTitle}</p>
  //         <p><strong>Location:</strong> ${quoteData.spaceLocation}</p>
  //         <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
  //       `
  //     });
  //     console.log('Admin email sent!');

  //     // User confirmation email
  //     await resend.emails.send({
  //       from: 'CoworkSpaze <onboarding@resend.dev>',
  //       to: [quoteData.email],
  //       subject: `Quote Request for ${quoteData.spaceTitle} - CoworkSpaze`,
  //       html: `
  //         <h2>Hi ${quoteData.name}! 👋</h2>
  //         <p>Thank you for your interest in ${quoteData.spaceTitle}!</p>
  //         <p>Our team will contact you within 24-48 hours with a customized quote.</p>
  //         <p><strong>CoworkSpaze Team</strong></p>
  //       `
  //     });
  //     console.log('User email sent!');
  //   } catch (emailErr) {
  //     console.error('Email sending failed:', emailErr.message);
  //   }

  //   res.status(201).json(savedQuote);
  // }
  // catch (err) {
  //   console.error('Quote submission error:', err);
  //   res.status(400).json({
  //     message: err.message
  //   });
  // }

  async function sendMail() {
    await transporter.sendMail({
      from: "coworkspaze@gmail.com",
      to: "visheshsingh074@gmail.com",
      subject: "Test Email",
      text: "Hello from Node.js",
      html: "<b>Hello from Node.js</b>",
    });
  }

  try {
    sendMail();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
