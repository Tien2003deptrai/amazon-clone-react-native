import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import accountRoutes from "./routes/account.routes.js";

dotenv.config();
const app = express();
const apiVersion = process.env.API_VERSION || "/api/v1";
const port = process.env.PORT || 8000;

app.use(cors()); // CORS Middleware

app.use(bodyParser.urlencoded({ extended: false })); // used to parse URL-encoded form data from the request body
app.use(bodyParser.json());

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

// Server Endpoints
app.use(`${apiVersion}/users`, accountRoutes);
