import styles from './styles/TaskCard.module.css'
import TaskAPI from '../../TaskAPI/TaskAPI'
import TaskModel from '../../Models/Task'
import { useState } from 'react'

export default function TaskCard(task: TaskModel) {
    const [completed, setCompleted] = useState(task.completed)
    const toggleCompleted = (
        event: React.MouseEvent<HTMLInputElement, MouseEvent>
    ): void => {
        setCompleted(!completed)
        TaskAPI.updateTask(task.id, { ...task, completed: !completed })
    }
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

            <li className={styles.card_item}>
                <div className={styles.card_section}>
                    <label
                        className={`${styles.card_label} ${
                            completed ? styles.card_item_completed : ''
                        }`}
                    >
                        {task.text}
                    </label>
                </div>
            </li>
        </>
    )
}
