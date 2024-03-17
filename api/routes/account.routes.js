import express from "express";

import {
  getUserProfile,
  logInUser,
  registerUser,
  verifyUser,
} from "../controllers/users.controller.js";
import { tokenValidate } from "../middlewares/tokenValidate.middleware.js";

const accountRoutes = express.Router();

//@desc   Register a user and get a Token
//@route  POST /api/apiVersion/users/register
//@access Public
accountRoutes.route("/register").post(registerUser);

//@desc   Endpoint to verify email
//@route  GET /api/apiVersion/users/verify/:token
//@access Public
accountRoutes.route("/verify/:token").get(verifyUser);

//@desc   Endpoint to login the user
//@route  POST /api/apiVersion/users/login
//@access Public
accountRoutes.route("/login").post(logInUser);

//@desc   Endpoint to get user profile
//@route  GET /api/apiVersion/users/:userId
//@access Private
accountRoutes.route("/:userId").get(tokenValidate, getUserProfile);

export default accountRoutes;
