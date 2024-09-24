import AbstractBaseModel, { IData } from './abstract/base.model';

export interface ITask extends IData {
    title: string;
    description: string;
    completed: boolean;
}

class TaskModel extends AbstractBaseModel<ITask> {
    collection = 'task';
}

export default TaskModel;
