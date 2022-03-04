const cloudinary = require('cloudinary').v2;

const SECRET = "OjFCdHZ9R8ONXkH9fpb3t8t";
const UPLOAD_PRESET = `profilestoreapp` || 'ml_default';

cloudinary.config({
  cloud_name: "dibuevfps",
  api_key: "372336693865194",
  api_secret: "OjFCdHZ9R8ONXkH9fpb3t8tsAb4",
});

module.exports = {
  SECRET,
  cloudinary,
  UPLOAD_PRESET,
};
