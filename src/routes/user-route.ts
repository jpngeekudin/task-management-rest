import express from 'express';
import { createUser, deleteUser, getUserById, getUsers, updateUser } from '../controllers/user-controller';
import { User } from '../models/user-model';

const router = express.Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/create', createUser);
router.post('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;