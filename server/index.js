require('dotenv').config();
require('express-async-errors');
const http = require('http');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const middleware = require('./utils/middleware');
const authRoutes = require('./routes/auth');
const contactRoutes = require('./routes/contact');

const app = express();

app.use(cors());
app.use(express.static("public"));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api', authRoutes);
app.use('/api/contacts', contactRoutes);

app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);
const server = http.createServer(app);

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}, err =>{
  if(err) throw err;
  console.log('Connected to MongoDB')
})
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
