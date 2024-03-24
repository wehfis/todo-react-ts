import styles from './styles/TaskCard.module.css';
import TaskAPI from '../../TaskAPI/TaskAPI';
import TaskModel from '../../Models/Task';
import { useEffect, useState } from 'react';
import { useTaskContext } from '../../Contexts/TaskContext';
import { FilterOptions } from '../FilterButton/FilterButton';

type TaskCardProps = {
    task: TaskModel;
};

export default function TaskCard(props: TaskCardProps) {
    const { tasks, setTasks, currentActiveFilter, renderTasks } =
        useTaskContext();
    const [cardHover, setCardHover] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [taskInputValue, setTaskInputValue] = useState(props.task.text);


    const toggleCompleted = async () => {
        await TaskAPI.updateTask(props.task.id, {
            ...props.task,
            completed: !props.task.completed,
        });
        renderTasks();
    };

    const deleteTask = async () => {
        await TaskAPI.removeTask(props.task.id);
        setTasks(tasks.filter(task => task.id !== props.task.id));
    };

    // const handleEdit = async (
    //     event: React.MouseEvent<HTMLLIElement, MouseEvent>
    // ) => {
    //     console.log(event.target);
    //     console.log(event.currentTarget);
    //     event.currentTarget.focus();
    // };
    // const handleSaveBlur = async (
    //     event: React.FocusEvent<HTMLInputElement>
    // ) => {
    //     if (!event.currentTarget.value) {
    //         await TaskAPI.removeTask(props.task.id);
    //         setTasks(tasks.filter((task) => task.id !== props.task.id));
    //         setIsEditing(false);
    //     } else {
    //         await TaskAPI.updateTask(props.task.id, {
    //             ...props.task,
    //             text: event.currentTarget.value,
    //         });
    //         setIsEditing(false);
    //     }
    // };
    // const handleSaveEnter = async (
    //     event: React.KeyboardEvent<HTMLInputElement>
    // ) => {
    //     if (!event.currentTarget.value) {
    //         await TaskAPI.removeTask(props.task.id);
    //         setTasks(tasks.filter((task) => task.id !== props.task.id));
    //         setIsEditing(false);
    //     }

    //     if (event.key === 'Enter') {
    //         await TaskAPI.updateTask(props.task.id, {
    //             ...props.task,
    //             text: event.currentTarget.value,
    //         });
    //         setIsEditing(false);
    //     }
    // };
    return (
        <>
            {isEditing ? (
                <input
                    // onKeyDown={handleSaveEnter}
                    // onBlur={handleSaveBlur}
                    className={styles.input_edit_task}
                    value={taskInputValue}
                    onChange={(event) => setTaskInputValue(event.target.value)}
                ></input>
            ) : (
                <>
                    <input
                        onClick={toggleCompleted}
                        className={styles.card_item_checkbox}
                        type="checkbox"
                        checked={props.task.completed}
                        value="task"
                    />
                    <label htmlFor="task" className={styles.label_checkbox}>
                        {props.task.completed && (
                            <span
                                onClick={toggleCompleted}
                                className={styles.checkmark}
                            >
                                ✓
                            </span>
                        )}
                    </label>
                    <li
                        onDoubleClick={(e) => {
                            setIsEditing(true);
                            // handleEdit(e);
                        }}
                        onMouseEnter={() => setCardHover(true)}
                        onMouseLeave={() => setCardHover(false)}
                        className={styles.card_item}
                    >
                        <div className={styles.card_section}>
                            <label
                                className={`${styles.card_label} ${
                                    props.task.completed ? styles.card_item_completed : ''
                                }`}
                            >
                                {props.task.text}
                            </label>
                        </div>
                        {cardHover && (
                            <span
                                onClick={deleteTask}
                                className={styles.card_delete}
                            >
                                ✖
                            </span>
                        )}
                    </li>
                </>
            )}
        </>
    );
}
