const express = require('express');
const VirtualOfficeLead = require('../models/VirtualOfficeLead');
const {
  validateVirtualOfficeLead,
  handleValidationErrors,
} = require('../validators/virtualOfficeLeadValidator');
const { sendEmail } = require('../services/emailService');
const { virtualOfficeAdminEmailHtml } = require('../templates/virtualOfficeAdminEmail');
const { virtualOfficeUserEmailHtml } = require('../templates/virtualOfficeUserEmail');

const router = express.Router();

router.post('/', validateVirtualOfficeLead, handleValidationErrors, async (req, res, next) => {
  try {
    const leadData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      source: req.body.source || 'virtual-office',
    };

    const savedLead = await VirtualOfficeLead.create(leadData);

    sendEmail({
      to: process.env.ADMIN_EMAIL,
      subject: `New Virtual Office Lead - ${leadData.city}`,
      html: virtualOfficeAdminEmailHtml(leadData),
    }).catch((err) => console.error('Admin virtual office email failed:', err.message));

    sendEmail({
      to: leadData.email,
      subject: `We received your virtual office inquiry for ${leadData.city}`,
      html: virtualOfficeUserEmailHtml(leadData),
    }).catch((err) => console.error('User virtual office email failed:', err.message));

    res.status(201).json({
      success: true,
      message: 'Virtual office inquiry submitted successfully',
      lead: savedLead,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
