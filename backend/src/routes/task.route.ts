import { Router } from 'express';
import * as taskController from '../controllers/task.controller';

const taskRouter = Router();

taskRouter.get('/', taskController.getAllTask);

taskRouter.get('/:id', taskController.getTaskById);

taskRouter.post('/', taskController.createTask);

taskRouter.put('/:id', taskController.updateTask);

taskRouter.delete('/:id', taskController.deleteTask);

export default taskRouter;
