import jwt from "jsonwebtoken";

const tokenValidate = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      error: true,
      message: "Unauthorized access. Token missing or invalid.",
    });
  }

  const token = authHeader.substring(7);
  try {
    const decodedToken = jwt.verify(token, process.env.secretKeyForToken);
    req.user = decodedToken;

    next();
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

export { tokenValidate };
