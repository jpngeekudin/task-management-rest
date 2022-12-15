import express from 'express';
import { createTeam, deleteTeam, getTeamById, getTeams, updateTeam } from '../controllers/team-controller';

const app = express.Router();
app.get('/', getTeams);
app.get('/:id', getTeamById);
app.post('/create', createTeam);
app.post('/update/:id', updateTeam);
app.delete('/delete/:id', deleteTeam);

export default app;