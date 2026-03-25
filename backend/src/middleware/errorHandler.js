/**
 * Global error handler middleware.
 * Catches all unhandled errors and returns a consistent JSON response.
 */
function errorHandler(err, req, res, _next) {
  // Handle Mongoose CastError (invalid ObjectId, etc.)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid ${err.path}: ${err.value}`,
    });
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    return res.status(409).json({
      success: false,
      message: 'Duplicate entry',
    });
  }

  // Handle Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      message: messages.join(', '),
    });
  }

  const statusCode = err.statusCode || 500;

  // Always log 5xx errors
  if (statusCode >= 500) {
    console.error(`[Error] ${req.method} ${req.path}:`, err.message);
  }

  // Only expose error details in non-production for 5xx
  const message = statusCode < 500
    ? err.message
    : process.env.NODE_ENV === 'production'
      ? 'Internal Server Error'
      : err.message;

  res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = { errorHandler };
