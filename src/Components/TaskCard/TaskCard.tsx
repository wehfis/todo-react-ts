import styles from './styles/TaskCard.module.css';
import TaskAPI from '../../TaskAPI/TaskAPI';
import TaskModel from '../../Models/Task';
import { useEffect, useState } from 'react';
import { useTaskContext } from '../../Contexts/TaskContext';
import { FilterOptions } from '../FilterButton/FilterButton';

type TaskCardProps = {
    task: TaskModel;
    updateTaskStatus: (id: string) => void;
};

export default function TaskCard(props: TaskCardProps) {
    const { tasks, setTasks, currentActiveFilter, setCurrentActiveFilter } =
        useTaskContext();
    const [completed, setCompleted] = useState(props.task.completed);
    const [cardHover, setCardHover] = useState(false);

    useEffect(() => {
        setCompleted(props.task.completed);
    }, [props.task]);

    const renderCurrFilterTasks = async () => {
        const currentTasks = await TaskAPI.getTasks();
        switch (currentActiveFilter) {
            case FilterOptions.Active:
                setTasks(currentTasks.filter((task) => !task.completed));
                return;
            case FilterOptions.Completed:
                setTasks(currentTasks.filter((task) => task.completed));
                return;
            default:
                setTasks(currentTasks);
                return;
        }
    }

    const toggleCompleted = async () => {
        setCompleted(!completed);
        await TaskAPI.updateTask(props.task.id, {
            ...props.task,
            completed: !completed,
        });
        props.updateTaskStatus(props.task.id);
        await renderCurrFilterTasks();
    };
    const deleteTask = async () => {
        await TaskAPI.removeTask(props.task.id);
        props.updateTaskStatus(props.task.id);
    };
    return (
        <>
            <hr />
            <input
                onClick={toggleCompleted}
                className={styles.card_item_checkbox}
                type="checkbox"
                checked={completed}
                value="task"
            />
            <label htmlFor="task" className={styles.label_checkbox}>
                {completed && (
                    <span
                        onClick={toggleCompleted}
                        className={styles.checkmark}
                    >
                        ✓
                    </span>
                )}
            </label>

            <li
                onMouseEnter={() => setCardHover(true)}
                onMouseLeave={() => setCardHover(false)}
                className={styles.card_item}
            >
                <div className={styles.card_section}>
                    <label
                        className={`${styles.card_label} ${
                            completed ? styles.card_item_completed : ''
                        }`}
                    >
                        {props.task.text}
                    </label>
                </div>
                {cardHover && (
                    <span onClick={deleteTask} className={styles.card_delete}>
                        ✖
                    </span>
                )}
            </li>
        </>
    );
}
