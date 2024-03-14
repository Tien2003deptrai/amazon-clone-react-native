import express from "express";

import { addAddress } from "../controllers/address.controller.js";

const addressRoutes = express.Router();

//@desc   Endpoint to add address
//@route  POST /api/apiVersion/address
//@access Private
addressRoutes.post("/", addAddress);

export default addressRoutes;
