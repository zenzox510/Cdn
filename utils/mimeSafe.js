// helper to map file ext to correct mime and safe filename
const mime = require('mime-types');
const sanitize = require('sanitize-filename');

function getMime(filepath) {
  const m = mime.lookup(filepath);
  return m || 'application/octet-stream';
}

function safeName(name) {
  return sanitize(name).replace(/\s+/g, '_');
}
