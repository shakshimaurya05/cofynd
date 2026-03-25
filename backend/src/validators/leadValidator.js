const { body, validationResult } = require('express-validator');

const validateLead = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ max: 100 }).withMessage('Name must be under 100 characters'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email address'),
  body('phone')
    .trim()
    .notEmpty().withMessage('Phone is required')
    .matches(/^[+]?[\d\s-]{7,15}$/).withMessage('Invalid phone number'),
  body('spaceType')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('Space type must be under 50 characters'),
  body('city')
    .trim()
    .notEmpty().withMessage('City is required')
    .isLength({ max: 50 }).withMessage('City must be under 50 characters'),
];

function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(e => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}

module.exports = { validateLead, handleValidationErrors };
