import styles from './styles/TaskCard.module.css';
import TaskModel from '../../Models/Task';

type TaskCheckboxProps = {
    task: TaskModel;
    toggleCompleted: () => void;
};

export default function TaskCheckbox(props: TaskCheckboxProps) {
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
                        onClick={props.toggleCompleted}
                        className={styles.checkmark}
                    >
                        ✓
                    </span>
                )}
            </label>
        </>
    );
}
