import styles from './styles/TaskCard.module.css';
import TaskModel from '../../Models/Task';
import { useCallback, useState } from 'react';
import { useTaskContext } from '../../Contexts/TaskContext';
import TaskCheckbox from './TaskCheckbox';
import React from 'react';

type TaskCardProps = {
    task: TaskModel;
};

function TaskCard(props: TaskCardProps) {
    const { updateTask, deleteTask } = useTaskContext();
    const [cardHover, setCardHover] = useState(false);

    const toggleCompleted = useCallback(async () => {
        await updateTask(props.task.id, {
            ...props.task,
            completed: !props.task.completed,
        });
    }, [props]);

    return (
        <>
            <TaskCheckbox task={props.task} toggleCompleted={async () => await toggleCompleted()} />
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
                    <span
                        onClick={async () => await deleteTask(props.task.id)}
                        className={styles.card_delete}
                >
                    {cardHover &&
                        '✖' }
                    </span>
            </li>
        </>
    );
}

export default React.memo(TaskCard);
