const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { email, password } = req.body;
  console.log("[authController.signup] request body:", { email });

  try {
    const existingUser = await User.findOne({ email });
    console.log("[authController.signup] existingUser:", existingUser ? existingUser._id : null);

    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("[authController.signup] hashedPassword length:", hashedPassword.length);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Signup successful", userId: newUser._id });
  } catch (err) {
    console.error("[authController.signup] error:", err);
   return res.status(500).json({ message: "Something went wrong. Try again later." });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("[authController.login] request body:", { email });

  try {
    const user = await User.findOne({ email });
    console.log("[authController.login] user lookup:", user ? user._id : "not found");

    if (!user) {
  return res.status(401).json({ message: "Invalid email or password" });
}

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("[authController.login] password match:", isMatch);

   if (!isMatch) {
  return res.status(401).json({ message: "Invalid email or password" });
}
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "1d" }
    );

    console.log("[authController.login] token generated length:", token.length);

    return res.json({ token, userId: user._id, email: user.email });
  } catch (err) {
    console.error("[authController.login] error:", err);
    return res.status(500).json({ message: "failed to login" });
  }
};