import jwt from "jsonwebtoken";

const addAddress = async (req, res) => {
  try {
    const { userId, token, address } = req.body;
    const decodedToken = jwt.verify(token, process.env.secretKeyForToken);

    if (decodedToken.userId !== userId) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized access.",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

export { addAddress };
