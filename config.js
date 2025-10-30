// config.js — central config with sensible defaults
module.exports = {
  UPLOAD_DIR: process.env.UPLOAD_DIR || 'public/uploads',
  MAX_FILE_SIZE: parseInt(process.env.MAX_FILE_SIZE || String(200 * 1024 * 1024)), // 200 MB
  PORT: process.env.PORT || 3000,
  ALLOWED_ORIGINS: (process.env.ALLOWED_ORIGINS || '*'), // CORS
  RETENTION_DAYS: parseFloat(process.env.RETENTION_DAYS || '30'),
};
