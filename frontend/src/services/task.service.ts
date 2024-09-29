import type { TaskType as _TaskType } from '@models/task.model';
import http from '@/utils/createHttp';

export type TaskType = _TaskType;

const taskPath = '/task';

export const createTask = async (task: Omit<TaskType, 'id'>): Promise<string> => {
    const { id } = await http.post<{ id: string }>(taskPath, task);
    return id;
};

export const getTasks = async (): Promise<TaskType[]> => {
    return http.get<TaskType[]>(taskPath);
};

export const getTaskById = async (id: string): Promise<TaskType> => {
    return http.get<TaskType>(`${taskPath}/${id}`);
};

export const updateTask = async (task: TaskType): Promise<void> => {
    const { id, ...rest } = task;
    return http.put(`${taskPath}/${id}`, rest);
};

export const deleteTaskById = async (id: string): Promise<void> => {
    return http.delete(`${taskPath}/${id}`);
};
