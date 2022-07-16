// import express
const express = require("express");
// morgan
const morgan = require("morgan");
// helmet
const helmet = require("helmet");
// configuration
const config = require("config");
// require Joi for form validation
const Joi = require("joi");
const startupDebugger = require("debug")("app:startup");
const dbDebugger = require("debug")("app:db");
// getting rout handlers
const movieGenres = require("./routes/movieGenres");
const home = require("./routes/home");
// create server appliicatin
const app = express();

// templating with PUG
app.set("view engine", "pug");
app.set("views", "./views");

//importing custom middlware
const logger = require("./middlware/logger");
const authenticator = require("./middlware/authenticate");

// aquire use of inbuilt express middlware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// third party middleware
app.use(helmet());

// custom middleware
app.use(logger);
app.use(authenticator);

// allowing app to access associated routes
app.use("/api/movies/genres", movieGenres);
app.use("/", home);

// setting up config
console.log("Application Name: " + config.get("name"));
console.log("Application email: " + config.get("email.host"));
console.log("Application email: " + config.get("email.password"));

// function to test for enviroment
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  startupDebugger("Morgan enabled...");
}
dbDebugger("DB connected");

// create app listener
app.listen(3002, () => {
  console.log("server is running on localhost: 3002");
});
