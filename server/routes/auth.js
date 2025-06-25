import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import User from '../model/User.js'; 
import loginUser from '../controller/loginController.js';
import registerUser from '../controller/registerController.js';
const router = express.Router();
const JWT_SECRET = "supersecretjwtkey123456789!@";


// Login
router.post('/login', loginUser);

// Register User
router.post('/register', registerUser);

// Middleware
function verifyToken(req, res, next) {
  console.log("Middleware hit");
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(403).json({ error: 'Token missing' });

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token invalid' });
    req.user = decoded;
    next();
  });
}

router.get('', verifyToken, (req, res) => {
  console.log("Root url hit");
  res.json({ message: 'Access granted', userId: req.user.id });
});

export default router;
export { verifyToken }; // Export the middleware for use in other routes if needed
