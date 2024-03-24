import styles from './styles/TaskInput.module.css';
import TaskModel from '../../Models/Task';
import TaskAPI from '../../TaskAPI/TaskAPI';
import { useState } from 'react';
import { useTaskContext } from '../../Contexts/TaskContext';
import TaskDto from '../../Dtos/Task';

type TaskInputProps = {
    inputText: string;
};

export default function TaskList(props: TaskInputProps) {
    const { tasks, setTasks } = useTaskContext();
    const [taskInputValue, setTaskInputValue] = useState('');

    const completeAll = async () => {
        if (tasks.every((task) => task.completed)) {
            await inCompleteAll();
            return;
        }
        setTasks(
            tasks.map((task) => {
                return { ...task, completed: true };
            })
        );
        await TaskAPI.completeAllTasks(tasks);
    };
    const inCompleteAll = async () => {
        setTasks(
            tasks.map((task) => {
                return { ...task, completed: false };
            })
        );
        await TaskAPI.inCompleteAllTasks(tasks);
    };
    const createTask = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.currentTarget.value) {
            const newTask: TaskDto = {
                text: event.currentTarget.value,
                completed: false,
            };
            const createdTask = await TaskAPI.addTask(newTask);
            setTasks([...tasks, createdTask])
            setTaskInputValue('');
        }
    };

    return (
        <>
            <label
                onClick={completeAll}
                className={styles.tasklist_complete_all}
            ></label>
            <input
                onKeyDown={createTask}
                value={taskInputValue}
                onChange={(event) => setTaskInputValue(event.target.value)}
                placeholder={props.inputText}
                className={styles.tasklist_input}
            ></input>
        </>
    );
}
