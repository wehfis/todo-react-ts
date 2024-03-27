import styles from './styles/TaskCard.module.css';
import TaskModel from '../../Models/Task';
import { useState } from 'react';
import { useTaskContext } from '../../Contexts/TaskContext';
import TaskCheckbox from './TaskCheckbox';
import React from 'react';

type TaskCardProps = {
    task: TaskModel;
};

function TaskCard(props: TaskCardProps) {
    const { renderTasks, updateTask, deleteTask } = useTaskContext();
    const [cardHover, setCardHover] = useState(false);

    const toggleCompleted = async () => {
        updateTask(props.task.id, {
            ...props.task,
            completed: !props.task.completed,
        });
        renderTasks();
    };

    return (
        <>
            <TaskCheckbox task={props.task} toggleCompleted={toggleCompleted}/>
            <li
                onMouseEnter={() => setCardHover(true)}
                onMouseLeave={() => setCardHover(false)}
                className={styles.card_item}
            >
                <div className={styles.card_section}>
                    <label
                        className={`${styles.card_label} ${
                            props.task.completed
                                ? styles.card_item_completed
                                : ''
                        }`}
                    >
                        {props.task.text}
                    </label>
                </div>
                {cardHover && (
                    <span
                        onClick={() => deleteTask(props.task.id)}
                        className={styles.card_delete}
                    >
                        ✖
                    </span>
                )}
            </li>
        </>
    );
}

export default React.memo(TaskCard);
