require('dotenv').config();
const cloudinary = require('cloudinary').v2;

const PORT = 4000;
const MONGODB_URI = "mongodb+srv://profileStore:profileStore123@cluster0.qqn2k.mongodb.net/profileStore?retryWrites=true&w=majority";
const SECRET = "OjFCdHZ9R8ONXkH9fpb3t8t";
const UPLOAD_PRESET = `profilestoreapp` || 'ml_default';

cloudinary.config({
  cloud_name: "dibuevfps",
  api_key: "372336693865194",
  api_secret: "OjFCdHZ9R8ONXkH9fpb3t8tsAb4",
});

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET,
  cloudinary,
  UPLOAD_PRESET,
};
