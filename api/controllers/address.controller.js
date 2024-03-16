import User from "../models/user.model.js";

const addAddress = async (req, res) => {
  try {
    const { userId } = req.params;
    const { address } = req.body;

    if (req.user.userId !== userId) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized access.",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: true, message: "No User found." });
    }

    user.addresses.push(address);
    await user.save();
    res
      .status(200)
      .json({ error: false, message: "Address saved successfully." });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

const getAddresses = async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.user.userId !== userId) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized access.",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: true, message: "No User found." });
    }

    res.status(200).json({
      error: false,
      addresses: user.addresses,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
    });
  }
};

export { addAddress, getAddresses };
