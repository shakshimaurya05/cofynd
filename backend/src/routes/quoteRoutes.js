const express = require('express');
const router = express.Router();
const Quote = require('../models/Quote');
const { validateQuote, handleValidationErrors } = require('../validators/quoteValidator');
const { sendEmail } = require('../services/emailService');
const { quoteAdminEmailHtml } = require('../templates/quoteAdminEmail');
const { quoteUserEmailHtml } = require('../templates/quoteUserEmail');

// POST A NEW QUOTE REQUEST
router.post('/', validateQuote, handleValidationErrors, async (req, res, next) => {
  try {
    const quoteData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      type: req.body.type,
      seats: req.body.seats,
      spaceTitle: req.body.spaceTitle,
      spaceLocation: req.body.spaceLocation,
    };

    const savedQuote = await Quote.create(quoteData);

    // Send emails (non-blocking - don't fail the request if email fails)
    sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: 'New Quote Request - CoworkSpaze',
      html: quoteAdminEmailHtml(quoteData),
    }).catch((err) => console.error('Admin quote email failed:', err.message));

    sendEmail({
      to: quoteData.email,
      subject: `Quote Request for ${quoteData.spaceTitle} - CoworkSpaze`,
      html: quoteUserEmailHtml(quoteData),
    }).catch((err) => console.error('User quote email failed:', err.message));

    res.status(201).json(savedQuote);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
