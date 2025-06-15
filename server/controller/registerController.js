import User from "../model/User.js";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
  const formData = req.body;
  console.log(formData);

  // Check if user already exists
  const existingUser = await User.findOne ({ username: formData.userName });
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  //Check if the confirm password matches the password
  if (formData.password !== formData.confirmPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(formData.password, salt);

  // Create a new user
  const newUser = new User({
    fullname: formData.fullName,
    username: formData.userName,
    password: hashedPassword,
  });

  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
};

export default registerUser;
