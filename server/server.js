import express from 'express';
import cors from 'cors';
import data from '../data/tasks.js';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; 
import authRoutes from './routes/auth.js';
import bodyParser from 'body-parser';
import taskRoutes from './routes/taskRoutes.js';
import { verifyToken } from './routes/auth.js'; // Import the verifyToken middleware

const app = express();
const PORT = 5000;


connectDB();

app.use(express.json());
app.use(bodyParser.json());


app.use(cors());
app.use('/', authRoutes);
app.use('/api/tasks', verifyToken, taskRoutes);


app.get('/', (req, res) => {
  console.log('Received a GET request');
  console.log('Data:', data);
  res.json(data);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
