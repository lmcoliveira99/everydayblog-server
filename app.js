const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const PORT = 5005;
const cors = require("cors");
const mongoose = require("mongoose");
const { isAuthenticated } = require("./middleware/jwt.middleware");
const jwt = require('express-jwt');

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();


// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

//coors cong«iguration is inside index.js/config

app.use(express.json());
app.use(morgan("dev"));
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/users', isAuthenticated, userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
