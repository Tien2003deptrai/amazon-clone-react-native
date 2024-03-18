import User from "./models/user.model.js";
import Order from "./models/order.model.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

let cachedDb = null;

async function connectToDatabase() {
  try {
    if (cachedDb) {
      return cachedDb;
    }

    const uri = process.env.MONGO_DB_URI;
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };

    const db = await mongoose.connect(uri, options);
    console.log("Connected to DB.");
    cachedDb = db;
    return db;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addAddress(userId, address) {
  try {
    const db = await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    user.addresses.push(address);
    await user.save();

    return "Address added successfully.";
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getAddresses(userId) {
  try {
    const user = await User.findById(userId);
    return user ? user.addresses : [];
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getOrders(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) return [];
    const orders = await Order.find({ user: userId });
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function registerUser(name, email, password) {
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("Email already registered.");
    }

    const newUser = new User({ name, email, password });
    await newUser.save();
    return "Registration successful.";
  } catch (error) {
    throw new Error(error.message);
  }
}

async function logInUser(email, password) {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User does not exist.");
    }
    if (user.password !== password) {
      throw new Error("Incorrect password.");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function getUserProfile(userId) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found.");
    }
    return user;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function placeOrder(
  userId,
  shippingAddress,
  cartItems,
  totalPrice,
  paymentMethod
) {
  try {
    const db = await connectToDatabase();

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    const orderObject = new Order({
      user: userId,
      shippingAddress,
      products: cartItems,
      totalPrice,
      paymentMethod,
    });

    const order = await orderObject.save();
    user.orders.push(order._id);
    await user.save();

    return "Order placed successfully.";
  } catch (error) {
    throw new Error(error.message);
  }
}

export {
  connectToDatabase,
  addAddress,
  getAddresses,
  getOrders,
  registerUser,
  logInUser,
  getUserProfile,
  placeOrder,
};
