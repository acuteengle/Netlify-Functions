const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());

//use the things.js file to handle endpoints that start with /things
const API_COURSES = require("../routes/courses");
app.use("/.netlify/functions/api/courses", API_COURSES);

module.exports = app;
module.exports.handler = serverless(app);