import express, { Application, Router, Request, Response } from "express";

import {
    createTask, deleteTask, getTaskById, getTasks
} from './consultas_bd.js'

const app: Application = express();
const router: Router = express.Router();

app.use(express.json());

router.get('/', (req: Request, res: Response) => {
    res.send('Api funcionando grazadeus!!')
});

router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.get('/tasks/:id', getTaskById);
router.delete('/tasks/:id', deleteTask);

export default router;