const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const { validateLead, handleValidationErrors } = require('../validators/leadValidator');
const { sendEmail } = require('../services/emailService');
const { leadAdminEmailHtml } = require('../templates/leadAdminEmail');
const { leadUserEmailHtml } = require('../templates/leadUserEmail');

// POST A NEW LEAD
router.post('/', validateLead, handleValidationErrors, async (req, res, next) => {
  try {
    const leadData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      spaceType: req.body.spaceType,
      city: req.body.city,
    };

    const savedLead = await Lead.create(leadData);

    // Send emails (non-blocking - don't fail the request if email fails)
    sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: 'New Lead Submission - CoworkSpaze',
      html: leadAdminEmailHtml(leadData),
    }).catch((err) => console.error('Admin lead email failed:', err.message));

    sendEmail({
      to: leadData.email,
      subject: 'Thank You for Contacting CoworkSpaze!',
      html: leadUserEmailHtml(leadData),
    }).catch((err) => console.error('User lead email failed:', err.message));

    res.status(201).json(savedLead);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
