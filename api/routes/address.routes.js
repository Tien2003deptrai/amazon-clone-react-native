import express from "express";

import { addAddress, getAddresses } from "../controllers/address.controller.js";
import { tokenValidate } from "../middlewares/tokenValidate.middleware.js";

const addressRoutes = express.Router();

//@desc   Endpoint to add address for a user
//@route  POST /api/apiVersion/address
//@access Private
addressRoutes.post("/", tokenValidate, addAddress);

//@desc   Endpoint to get all addresses of a user
//@route  GET  /api/apiVersion/addreses/:userId
//@access Private
addressRoutes.get("/addresses/:userId", tokenValidate, getAddresses);

export default addressRoutes;
