import crypto from "crypto"; // Provide cryptography functions

import User from "../models/user.model.js";
import { sendVerificationEmailToUser } from "../utils.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: true, message: "Email already registered." });
    }

    const newUser = new User({ name, email, password });
    const verificationToken = crypto.randomBytes(20).toString("hex"); // Convert bytes to hex
    newUser.verificationToken = verificationToken;

    await newUser.save();
    await sendVerificationEmailToUser(email, verificationToken);

    res.status(201).json({
      error: false,
      message:
        "Registration successful. Please check your email for verification.",
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

const verifyUser = async (req, res) => {
  try {
    const token = req.params.token;
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res
        .status(404)
        .json({ error: true, message: "Invalid Verification token." });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res
      .status(200)
      .json({ error: false, message: "Email verified successfully." });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

export { registerUser, verifyUser };
