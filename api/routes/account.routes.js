import express from "express";

import { registerUser, verifyUser } from "../controllers/usersController.js";

const accountRoutes = express.Router();

//@desc   Register a user and get a Token
//@route  POST /api/apiVersion/users/register
//@access Public
accountRoutes.route("/register").post(registerUser);

//@desc   Endpoint to verify email
//@route  GET /api/apiVersion/users/register
//@access Public
accountRoutes.route("/verify/:token").get(verifyUser);

export default accountRoutes;
