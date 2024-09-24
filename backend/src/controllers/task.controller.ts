import { NextFunction, Request, Response } from 'express';
import TaskModel, { ITask } from '../models/task.model';

const taskModel = new TaskModel();

export const getAllTask = async (
    req: Request,
    res: Response<ITask[]>,
    next: NextFunction
) => {
    try {
        const tasks = await taskModel.getAll();
        res.status(200).json(tasks);
    } catch (error) {
        next(error);
    }
};

export const getTaskById = async (
    req: Request<{ id: string }>,
    res: Response<ITask | null>,
    next: NextFunction
) => {
    try {
        const task = await taskModel.getById(req.params.id);
        res.status(200).json(task);
    } catch (error) {
        next(error);
    }
};

export const createTask = async (
    req: Request<{}, {}, ITask>,
    res: Response<string>,
    next: NextFunction
) => {
    try {
        const id = await taskModel.create(req.body);
        res.status(201).json(id);
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        await taskModel.update(req.params.id, req.body);
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const deleteTask = async (
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
) => {
    try {
        await taskModel.delete(req.params.id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        next(error);
    }
};
