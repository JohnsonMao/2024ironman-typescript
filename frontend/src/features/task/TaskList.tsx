import type { TaskType } from '@/services/task.service';
import List from '@/components/List';

type TaskItemProps = TaskType;

type TaskListProps = {
    tasks: TaskType[];
};

function TaskItem({ title, description, status }: TaskItemProps) {
    return (
        <li className="list__item">
            <div className="task-card">
                <div className="task-card__header">
                    <div>{title}</div>
                    <div>{status}</div>
                </div>
                <div>{description}</div>
            </div>
        </li>
    );
}

export default function TaskList({ tasks }: TaskListProps) {
    return (
        <List
            as="ul"
            className="list"
            items={tasks}
            renderKey={(task) => task.id}
            renderItem={TaskItem}
        />
    );
}
