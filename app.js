const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
const scheduleUploadRoutes = require('./scheduleUpload');

app.use('/scheduleUpload', scheduleUploadRoutes);

module.exports = app;