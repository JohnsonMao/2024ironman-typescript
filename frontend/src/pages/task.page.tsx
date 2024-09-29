import { useEffect, useState } from 'react';
import CreateTaskForm from '@/features/task/CreateTaskForm';
import TaskList from '@/features/task/TaskList';
import Popup from '@/components/Popup';
import { type TaskType, getTasks, createTask } from '@/services/task.service';
import validateZodIssue from '@/utils/validateZodIssue';

function Task() {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState<Record<string, string> | undefined>(undefined);
    const [tasks, setTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        getTasks().then(setTasks);
    }, []);

    const handleClose = () => {
        setError(undefined);
        setIsOpen(false);
    };

    const handleSubmit = async (task: Omit<TaskType, 'id'>) => {
        setError(undefined);
        try {
            const id = await createTask(task);
            setTasks((prev) => [...prev, { ...task, id }]);
            handleClose();
        } catch (err) {
            if (validateZodIssue(err)) {
                setError(Object.fromEntries(err.map((e) => [e.path[0], e.message])));
            }
        }
    };

    return (
        <div className="container">
            <header className="header">
                <h1>Task Board</h1>
                <button onClick={() => setIsOpen(true)}>新增任務</button>
            </header>
            <TaskList tasks={tasks} />
            <Popup isOpen={isOpen} onClose={handleClose}>
                <CreateTaskForm errors={error} onCancel={handleClose} onSubmit={handleSubmit} />
            </Popup>
        </div>
    );
}

export default Task;
