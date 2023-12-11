const express = require('express');
const app = express();

const scheduleUploadRoutes = require('./scheduleUpload');

app.use('/scheduleUpload', scheduleUploadRoutes);

module.exports = app;