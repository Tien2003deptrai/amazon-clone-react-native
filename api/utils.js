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

export { sendVerificationEmailToUser };
