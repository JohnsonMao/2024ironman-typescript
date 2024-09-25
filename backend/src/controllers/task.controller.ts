import { NextFunction, Request, Response } from 'express';
import TaskModel, { TaskType } from '../models/task.model';

const taskModel = new TaskModel();

export const getAllTask = async (
    req: Request,
    res: Response<TaskType[]>,
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
    res: Response<TaskType | null>,
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
    req: Request<{}, {}, TaskType>,
    res: Response<{ id: string }>,
    next: NextFunction
) => {
    try {
        const task = taskModel.validateData(req.body);
        const id = await taskModel.create(task);
        res.status(201).json({ id });
    } catch (error) {
        next(error);
    }
};

export const updateTask = async (
    req: Request<{ id: string }, {}, TaskType>,
    res: Response,
    next: NextFunction
) => {
    try {
        const task = taskModel.validateData(req.body);
        await taskModel.update(req.params.id, task);
        res.status(200);
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
        res.status(200);
    } catch (error) {
        next(error);
    }
};
