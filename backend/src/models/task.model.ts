import { z } from 'zod';
import AbstractBaseModel from '../utils/abstract/base.model';

export const inputTaskSchema = z.object({
    title: z.string().min(1, '請輸入任務標題'),
    description: z.string().optional(),
    status: z.enum(['new', 'active', 'completed']).default('new'),
    storyPoint: z.number().optional(),
});

export interface TaskType extends z.infer<typeof inputTaskSchema> {
    id: string;
}

export default class TaskModel extends AbstractBaseModel<TaskType> {
    collection = 'task';

    validateData(data: unknown): z.infer<typeof inputTaskSchema> {
        return inputTaskSchema.parse(data);
    }
}
