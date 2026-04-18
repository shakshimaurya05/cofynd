const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./middleware/errorHandler');
require('dotenv').config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
    process.exit(1);
  });

const app = express();
const PORT = process.env.PORT || 5000;

const defaultAllowedOrigins = [
  'http://localhost:3000',
  'https://coworkspaze.com',
  'https://www.coworkspaze.com',
];
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean)
  : defaultAllowedOrigins;

// Trust proxy for load balancers (Render/AWS ALB/Nginx reverse proxy)
if (process.env.TRUST_PROXY !== undefined) {
  const parsedTrustProxy = Number(process.env.TRUST_PROXY);
  app.set('trust proxy', Number.isNaN(parsedTrustProxy) ? process.env.TRUST_PROXY : parsedTrustProxy);
} else if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

// Security & parsing middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser/server-to-server requests with no origin header.
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      const error = new Error('Origin not allowed by CORS');
      error.statusCode = 403;
      return callback(error);
    },
    credentials: true,
  }),
);

// Serve static files for emails (logo, etc.)
app.use('/public', express.static('public'));

// Rate limiting for lead submissions
const leadSubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { success: false, message: 'Too many lead submissions, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for quote submissions
const quoteSubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Too many quote submissions, try again after 1 hour' },
  standardHeaders: true,
  legacyHeaders: false,
});

const virtualOfficeSubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { success: false, message: 'Too many virtual office inquiries, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});

app.post('/api/leads', leadSubmissionLimiter);
app.post('/api/quotes', quoteSubmissionLimiter);
app.post('/api/virtual-office/leads', virtualOfficeSubmissionLimiter);

// Routes
const spaceRoutes = require('./routes/spaceRoutes');
const leadRoutes = require('./routes/leadRoutes');
const quoteRoutes = require('./routes/quoteRoutes');
const virtualOfficeRoutes = require('./routes/virtualOfficeRoutes');

app.use('/api/spaces', spaceRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/virtual-office/leads', virtualOfficeRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Backend server is running' });
});
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'OK' });
});

// Global error handler (must be after all routes)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
