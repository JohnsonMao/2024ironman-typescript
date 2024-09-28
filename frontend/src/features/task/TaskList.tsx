import { useEffect, useState } from 'react';
import { TaskType } from '@models/task.model';
import { getTasks } from '@/services/task.service';

export default function TaskList() {
    const [tasks, setTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        getTasks().then(setTasks);
    }, []);

    return (
        <ul className="list">
            {tasks.map((task) => (
                <li key={task.id} className="list__item">
                    <div className="task-card">
                        <div className="task-card__header">
                            <div>{task.title}</div>
                            <div>{task.status}</div>
                        </div>
                        <div>{task.description}</div>
                    </div>
                </li>
            ))}
        </ul>
    );
}
