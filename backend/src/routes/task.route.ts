import { Router } from 'express';

const taskRouter = Router();

taskRouter.get('/', (req, res) => {
    res.send('Get Task!');
});

taskRouter.get('/:id', (req, res) => {
    res.send('Get Task by ID!');
});

taskRouter.post('/', (req, res) => {
    res.send('Create Task!');
});

taskRouter.put('/:id', (req, res) => {
    res.send('Update Task!');
});

taskRouter.delete('/:id', (req, res) => {
    res.send('Delete Task!');
});

export default taskRouter;
