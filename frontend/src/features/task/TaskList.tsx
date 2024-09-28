import { useEffect, useState } from 'react';
import { TaskType } from '@models/task.model';
import { getTasks } from '@/services/task.service';
import List from '@/components/List';

function TaskItem({ title, description, status }: TaskType) {
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

export default function TaskList() {
    const [tasks, setTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        getTasks().then(setTasks);
    }, []);

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
