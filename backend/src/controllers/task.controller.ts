import { NextFunction, Request, Response } from 'express';
import TaskModel, { TaskType } from '../models/task.model';
import { Controller, Delete, Get, Post, Put } from '../utils/decorators/controller.decorator';

@Controller('/task')
export default class TaskController {
    private taskModel = new TaskModel();

    @Get()
    async getAllTask(req: Request, res: Response<TaskType[]>, next: NextFunction) {
        try {
            const tasks = await this.taskModel.getAll();
            res.status(200).json(tasks);
        } catch (error) {
            next(error);
        }
    }

    @Get('/:id')
    async getTaskById(
        req: Request<{ id: string }>,
        res: Response<TaskType | null>,
        next: NextFunction
    ) {
        try {
            const task = await this.taskModel.getById(req.params.id);
            res.status(200).json(task);
        } catch (error) {
            next(error);
        }
    }

    @Post()
    async createTask(
        req: Request<{}, {}, TaskType>,
        res: Response<{ id: string }>,
        next: NextFunction
    ) {
        try {
            const task = this.taskModel.validateData(req.body);
            const id = await this.taskModel.create(task);
            res.status(201).json({ id });
        } catch (error) {
            next(error);
        }
    }

    @Put('/:id')
    async updateTask(
        req: Request<{ id: string }, {}, TaskType>,
        res: Response,
        next: NextFunction
    ) {
        try {
            const task = this.taskModel.validateData(req.body);
            await this.taskModel.update(req.params.id, task);
            res.status(200);
        } catch (error) {
            next(error);
        }
    }

    @Delete('/:id')
    async deleteTask(req: Request<{ id: string }>, res: Response, next: NextFunction) {
        try {
            await this.taskModel.delete(req.params.id);
            res.status(200);
        } catch (error) {
            next(error);
        }
    }
}
