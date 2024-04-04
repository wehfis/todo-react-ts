import styles from './styles/TaskInput.module.css';
import { useRef, useState } from 'react';
import { useTaskContext } from '../../Contexts/TaskContext';
import TaskDto from '../../Dtos/Task';
import React from 'react';

type TaskInputProps = {
    inputPlaceholder: string;
};

function TaskInput(props: TaskInputProps) {
    const { tasks, completeAll, createTask } = useTaskContext();
    const [taskInputValue, setTaskInputValue] = useState('');

    const addTask = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && taskInputValue) {
            const newTask: TaskDto = {
                text: taskInputValue,
                completed: false,
            };
            await createTask(newTask);
            setTaskInputValue('');
        }
    };

    return (
        <>
            {tasks.length > 0 && (
                <label
                    onClick={async () => await completeAll()}
                    className={`${styles.tasklist_complete_all} ${tasks.every((task) => task.completed) ? styles.tasklist_complete_all_pressed : ''}`}
                ></label>
            )}
            <input
                onKeyDown={addTask}
                value={taskInputValue}
                onChange={(event) => setTaskInputValue(event.target.value)}
                placeholder={props.inputPlaceholder}
                className={styles.tasklist_input}
            ></input>
        </>
    );
}

export default React.memo(TaskInput);
