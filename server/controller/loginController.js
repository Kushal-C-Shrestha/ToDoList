import User from "../model/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const JWT_SECRET = "supersecretjwtkey123456789!@";

const loginUser = async (req, res) => {
  console.log("Function entered");
  

  const formData  = req.body;
  console.log("Form data received:", formData);
  const { username, password } = formData;

  try {
    console.log("Username:", username);
    console.log("Password:", password);

    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match status:", isMatch);

    if (!isMatch) {
      console.log("Incorrect password");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("User authenticated");
    console.log(JWT_SECRET);
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    console.log(user._id);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

export default loginUser;
