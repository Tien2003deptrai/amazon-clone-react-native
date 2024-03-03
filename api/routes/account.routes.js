import express from "express";
import { registerUser } from "../controllers/usersController.js";

const accountRoutes = express.Router();

//@desc   Register a user and get a Token
//@route  POST /
//@access Public
accountRoutes.route("/register").post(registerUser);

export default accountRoutes;
