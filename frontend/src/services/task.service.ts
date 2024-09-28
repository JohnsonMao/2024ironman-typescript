import type { TaskType } from '@models/task.model';

export const getTasks = async (): Promise<TaskType[]> => {
    return [
        {
            id: '1',
            title: '鐵人賽 Day 27',
            description: 'TypeScript 實戰：前端表單與串接 API',
            status: 'new',
        },
        {
            id: '2',
            title: '鐵人賽 Day 26',
            description: 'TypeScript 實戰：前端泛型元件',
            status: 'active',
        },
        {
            id: '3',
            title: '鐵人賽 Day 25',
            description: 'TypeScript 實戰：前端 React Setup',
            status: 'completed',
        },
    ];
};
