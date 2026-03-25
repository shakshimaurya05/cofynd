const { body, validationResult } = require('express-validator');

const validateQuote = [
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
  body('type')
    .optional()
    .trim()
    .isIn(['dedicated-desk', 'private-cabin']).withMessage('Invalid workspace type'),
  body('seats')
    .optional()
    .trim()
    .isLength({ max: 20 }).withMessage('Seats value too long'),
  body('spaceTitle')
    .trim()
    .notEmpty().withMessage('Space title is required')
    .isLength({ max: 200 }).withMessage('Space title must be under 200 characters'),
  body('spaceLocation')
    .trim()
    .notEmpty().withMessage('Space location is required')
    .isLength({ max: 200 }).withMessage('Space location must be under 200 characters'),
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

module.exports = { validateQuote, handleValidationErrors };
