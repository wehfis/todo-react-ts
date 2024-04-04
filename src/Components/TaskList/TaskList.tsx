import styles from './styles/TaskList.module.css';
import TaskCard from '../TaskCard/TaskCard';
import TaskInput from '../TaskInput/TaskInput';
import TaskModel from '../../Models/Task';
import Filters from '../Filters/Filters';
import { useTaskContext } from '../../Contexts/TaskContext';
import React from 'react';

type TaskListProps = {
    inputPlaceholder: string;
};

function TaskList(props: TaskListProps) {
    const { tasks, filteredTasks } = useTaskContext();

    const taskCards = filteredTasks.map((task: TaskModel) => (
        <TaskCard key={task.id} task={task} />
    ));

    return (
        <>
            <form className={styles.tasklist_form}>
                <TaskInput inputPlaceholder={props.inputPlaceholder} />
                {filteredTasks.length > 0 && (
                    <ul className={styles.tasklist_list}>{taskCards}</ul>
                )}
                {tasks.length > 0 && <Filters />}
            </form>
        </>
    );
}

export default React.memo(TaskList);
