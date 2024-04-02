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
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(props.task.text);

    const toggleCompleted = useCallback(async () => {
        await updateTask(props.task.id, {
            ...props.task,
            completed: !props.task.completed,
        });
    }, [props]);


    const handleUpdateTask = async () => {
        if (isEditing){
            if(editedText.trim()){
                await updateTask(props.task.id, {
                    ...props.task,
                    text: editedText.trim(),
                });
                
            } else{
                await deleteTask(props.task.id);
            }
            setIsEditing(false);
        }
    };
    
    
    return (
        <>
            <TaskCheckbox task={props.task} toggleCompleted={toggleCompleted} />
            <li
                onMouseEnter={() => setCardHover(true)}
                onMouseLeave={() => setCardHover(false)}
                className={styles.card_item}
            >
                <div className={styles.card_section} onDoubleClick={() => setIsEditing(true)}> 
                    {isEditing ? (
                        <input
                            className={styles.edit_input}
                            type="text"
                            value={editedText}
                            onChange={(e) => setEditedText(e.target.value)}
                            onKeyDown={async (e) => {
                                if (e.key === 'Enter') {
                                    await handleUpdateTask();
                                }
                            }}
                            onBlur={async () => await handleUpdateTask()}
                            autoFocus
                        />
                    ) : (
                        <label
                            className={`${styles.card_label} ${
                                props.task.completed ? styles.card_item_completed : ''
                            }`}
                        >
                            {props.task.text}
                        </label>
                    )}
                </div>
                    <span
                        onClick={async () => await deleteTask(props.task.id)}
                        className={styles.card_delete}
                >
                    {cardHover &&
                        '✖️' }
                    </span>
            </li>
        </>
    );
}

export default React.memo(TaskCard);
