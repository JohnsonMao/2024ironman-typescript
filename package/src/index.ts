import { z } from 'zod';

export const inputTaskSchema = z.object({
    title: z.string().min(1, '請輸入任務標題'),
    description: z.string().optional(),
    status: z.enum(['new', 'active', 'completed']).default('new'),
    storyPoint: z.number().optional(),
});
