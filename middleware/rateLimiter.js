// centralized error handler
module.exports = function errorHandler(err, req, res, next) {
  console.error(err);
  if (res.headersSent) return next(err);

  const status = err.status || 500;
  const msg = err.message || 'Internal Server Error';

  // For API requests, return JSON
  if (req.xhr || req.path.startsWith('/api') || req.headers.accept?.includes('application/json')) {
    return res.status(status).json({ error: msg });
  }

  // Otherwise render a simple HTML page (EJS view in our case)
  res.status(status).render('index', { error: msg, files: req.filesList || [] });
};
