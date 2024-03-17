import express from "express";
import { tokenValidate } from "../middlewares/tokenValidate.middleware.js";
import { placeOrder } from "../controllers/order.controller.js";

const orderRoutes = express.Router();

// @desc   Endpoint to place order
// @route  POST /api/apiVersion/order/:userId
// @access Private
orderRoutes.post("/:userId", tokenValidate, placeOrder);

export default orderRoutes;
