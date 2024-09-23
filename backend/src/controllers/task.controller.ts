import { NextFunction, Request, Response } from 'express';
import getTasks, { Task } from '../models/task.model';

export const getAllTask = async (
    req: Request,
    res: Response<Task[]>,
    next: NextFunction
) => {
    try {
        const tasks = await getTasks();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

export const getTaskById = async (
    req: Request<{ id: string }>,
    res: Response<Task | null>,
    next: NextFunction
) => {
    try {
        const tasks = await getTasks();
        const task = tasks.find((task) => task.id === req.params.id) || null;
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

export const createTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.send('Create Task!');
};

export const updateTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.send('Update Task!');
};

export const deleteTask = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    res.send('Delete Task!');
};
