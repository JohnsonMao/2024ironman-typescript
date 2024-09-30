import { z } from 'zod';
import { inputTaskSchema } from 'validator';
import AbstractBaseModel from '../utils/abstract/base.model';

export interface TaskType extends z.infer<typeof inputTaskSchema> {
    id: string;
}

export default class TaskModel extends AbstractBaseModel<TaskType> {
    collection = 'task';

    validateData(data: unknown): z.infer<typeof inputTaskSchema> {
        return inputTaskSchema.parse(data);
    }
}
