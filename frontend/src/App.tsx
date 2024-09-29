import { useEffect, useState } from 'react';
import TaskList from './features/task/TaskList';
import { type TaskType, getTasks } from './services/task.service';
import './App.css';

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([]);

    useEffect(() => {
        getTasks().then(setTasks);
    }, []);

    return (
        <div className="container">
            <h1>Task Board</h1>
            <TaskList tasks={tasks} />
        </div>
    );
}

export default App;
