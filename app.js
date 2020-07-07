const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routers/user");
const { API_VERSION } = require("./config");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Basic routes
app.use(`/api/${API_VERSION}`, userRoutes);

module.exports = app;
