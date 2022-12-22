import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import errorHandler from './middlewares/error-handle-middleware';

import UserRoute from './routes/user-route';
import AuthRoute from './routes/auth-route';
import TeamRoute from './routes/team-route';
import TaskRoute from './routes/task-route';

async function main() {
  dotenv.config();
  const MONGO_HOST = process.env.MONGO_HOST;
  const MONGO_PORT = process.env.MONGO_PORT;
  mongoose.set('strictQuery', false);
  await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/task_management`);
  
  const app = express();
  const port = process.env.PORT || 3000;
  app.use(express.json());
  app.use(cors());
  
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Express!',
    });
  });
  
  app.use('/user', UserRoute);
  app.use('/auth', AuthRoute);
  app.use('/team', TeamRoute);
  app.use('/task', TaskRoute);
  app.use(errorHandler);
  
  app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
};

main();