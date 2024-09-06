import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());

app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
