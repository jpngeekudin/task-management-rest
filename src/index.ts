import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import UserRoute from './routes/user-route';
import errorHandler from './middlewares/error-handle-middleware';

async function main() {
  dotenv.config();
  const MONGO_HOST = process.env.MONGO_HOST;
  const MONGO_PORT = process.env.MONGO_PORT;
  await mongoose.connect(`mongodb://${MONGO_HOST}:${MONGO_PORT}/task_management`);
  mongoose.set('strictQuery', false);
  
  const app = express();
  const port = process.env.PORT || 3000;
  app.use(express.json());
  
  app.get('/', (req, res) => {
    res.json({
      success: true,
      message: 'Express!',
    });
  });
  
  app.use('/user', UserRoute);
  app.use(errorHandler);
  
  app.listen(port, () => {
    console.log(`Listening to port ${port}`);
  });
};

main();