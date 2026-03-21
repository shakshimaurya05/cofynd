const express = require('express');
const router = express.Router();
const Space = require('../models/space');
const { escapeRegExp } = require('../utils/escapeRegExp');

// Default placeholder image URL
const DEFAULT_IMAGE = 'https://placehold.co/600x400/e2e8f0/475569?text=No+Image+Available';

// Helper function to add default image if images array is empty
const addDefaultImage = (spaces) => {
  if (Array.isArray(spaces)) {
    return spaces.map(s => ({
      ...s.toObject(),
      images: s.images && s.images.length > 0 ? s.images : [DEFAULT_IMAGE],
    }));
  }
  if (spaces) {
    const spaceObj = spaces.toObject();
    return {
      ...spaceObj,
      images: spaceObj.images && spaceObj.images.length > 0 ? spaceObj.images : [DEFAULT_IMAGE],
    };
  }
  return spaces;
};

// Helper: build normalized $expr match for a field
const buildNormalizedMatch = (field, searchTerm) => {
  const normalized = searchTerm.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  return {
    $expr: {
      $regexMatch: {
        input: { $replaceAll: { input: { $toLower: `$${field}` }, find: ' ', replacement: '' } },
        regex: escapeRegExp(normalized),
        options: 'i',
      },
    },
  };
};

// GET all spaces (with pagination)
router.get('/', async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const [spaces, total] = await Promise.all([
      Space.find()
        .select('companyName microLocation city pricing images rating')
        .skip(skip)
        .limit(limit),
      Space.countDocuments(),
    ]);

    res.json({
      spaces: addDefaultImage(spaces),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalSpaces: total,
        hasMore: skip + spaces.length < total,
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET spaces by microLocation
router.get('/microLocation/:microLocation', async (req, res, next) => {
  try {
    const filter = buildNormalizedMatch('microLocation', req.params.microLocation);
    const spaces = await Space.find(filter)
      .select('companyName microLocation city pricing images rating');
    res.json(addDefaultImage(spaces));
  } catch (err) {
    next(err);
  }
});

// GET spaces by city (with pagination)
router.get('/city/:city', async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const cityRegex = new RegExp(escapeRegExp(req.params.city), 'i');

    const [spaces, total] = await Promise.all([
      Space.find({ city: cityRegex })
        .select('companyName microLocation city pricing images rating')
        .skip(skip)
        .limit(limit),
      Space.countDocuments({ city: cityRegex }),
    ]);

    res.json({
      spaces: addDefaultImage(spaces),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalSpaces: total,
        hasMore: skip + spaces.length < total,
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET spaces by city and microLocation (with pagination)
router.get('/city/:city/microLocation/:microLocation', async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 20));
    const skip = (page - 1) * limit;

    const cityRegex = new RegExp(escapeRegExp(req.params.city), 'i');
    const locationMatch = buildNormalizedMatch('microLocation', req.params.microLocation);

    const query = { city: cityRegex, ...locationMatch };

    const [spaces, total] = await Promise.all([
      Space.find(query)
        .select('companyName microLocation city pricing images rating')
        .skip(skip)
        .limit(limit),
      Space.countDocuments(query),
    ]);

    res.json({
      spaces: addDefaultImage(spaces),
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalSpaces: total,
        hasMore: skip + spaces.length < total,
      },
    });
  } catch (err) {
    next(err);
  }
});

// GET spaces by company name (must be before /:id to avoid route shadowing)
router.get('/company/:companyName', async (req, res, next) => {
  try {
    const filter = buildNormalizedMatch('companyName', req.params.companyName);
    const spaces = await Space.find(filter)
      .select('companyName microLocation city pricing images rating');
    res.json(addDefaultImage(spaces));
  } catch (err) {
    next(err);
  }
});

// GET a specific space by ID
router.get('/:id', async (req, res, next) => {
  try {
    const spaceDoc = await Space.findById(req.params.id);
    if (!spaceDoc) {
      return res.status(404).json({ message: 'Space not found' });
    }
    res.json(spaceDoc);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
