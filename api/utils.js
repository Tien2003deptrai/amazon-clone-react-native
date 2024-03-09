import crypto from "crypto"; // Provide cryptography functions
import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";

const sendVerificationEmailToUser = async (email, verificationToken) => {
  // Create a nodemailer transport
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    },
  });

  // Compose Email
  const mailOptions = {
    from: "amazon-clone.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: ${process.env.verificationLink}/${verificationToken}`,
  };

  // Send Email
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};

const generateSecretKey = () => {
  return crypto.randomBytes(32).toString("hex"); // Convert bytes to hex
};

const generateToken = (payload) => {
  const token = jwt.sign(
    {
      userId: payload._id,
    },
    generateSecretKey(),
  );

  return token;
};

export { sendVerificationEmailToUser, generateSecretKey, generateToken };
