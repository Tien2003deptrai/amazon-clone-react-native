const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodeMailer = require("nodemailer");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 8000;

const cors = require("cors");
app.use(cors()); // CORS Middleware

app.use(bodyParser.urlencoded({ extended: false })); // used to parse URL-encoded form data from the request body
app.use(bodyParser.json());

const jwt = require("jsonwebtoken");

// Connect TO MongoDB and start Backend
const uri = process.env.MONGO_DB_URI;
mongoose
  .connect(uri)
  .then(() => {
    console.log("Conneted to DB.");
    app.listen(port, () => {
      console.log(`Connected to Backend on PORT: ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
