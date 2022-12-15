import express from 'express';
import { login } from '../controllers/auth-controller';

const app = express.Router();
app.post('/login', login);

export default app;