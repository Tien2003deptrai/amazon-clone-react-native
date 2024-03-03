import User from "../models/user.model.js";
import { sendVerificationEmailToUser } from "../utils.js";
import crypto from "crypto"; // Provide cryptography functions

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
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

export { registerUser };
