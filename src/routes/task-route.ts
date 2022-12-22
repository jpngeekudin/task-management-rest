import express from 'express';
import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../controllers/task-controller';

const app = express.Router();
app.get('/', getTasks);
app.get('/:id', getTaskById);
app.post('/create', createTask);
app.post('/update/:id', updateTask);
app.delete('/delete/:id', deleteTask);

export default app;