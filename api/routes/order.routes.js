import express from "express";

import { getOrders, placeOrder } from "../controllers/order.controller.js";
import { tokenValidate } from "../middlewares/tokenValidate.middleware.js";

const orderRoutes = express.Router();

// @desc   Endpoint to place order
// @route  POST|GET /api/apiVersion/order/:userId
// @access Private
orderRoutes
  .get("/:userId", tokenValidate, getOrders)
  .post("/:userId", tokenValidate, placeOrder);

export default orderRoutes;
