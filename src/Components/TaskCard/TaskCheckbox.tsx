import styles from './styles/TaskCard.module.css';
import TaskModel from '../../Models/Task';
import React, { useEffect } from 'react';
import { useTaskContext } from '../../Contexts/TaskContext';

type TaskCheckboxProps = {
    task: TaskModel;
    toggleCompleted: () => void;
};

function TaskCheckbox(props: TaskCheckboxProps) {
    // const { tasks } = useTaskContext();
    // useEffect(() => {

    // }, []);
    return (
        <>
            <input
                onClick={props.toggleCompleted}
                className={styles.card_item_checkbox}
                type="checkbox"
                checked={props.task.completed}
                value="task"
            />
            <label htmlFor="task" className={styles.label_checkbox}>
                {props.task.completed && (
                    <span
                        onClick={async() => await props.toggleCompleted()}
                        className={styles.checkmark}
                    >
                        ✓
                    </span>
                )}
            </label>
        </>
    );
}

export default React.memo(TaskCheckbox);
