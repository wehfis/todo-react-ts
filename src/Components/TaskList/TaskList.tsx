import styles from './styles/TaskList.module.css';
import TaskCard from '../TaskCard/TaskCard';
import TaskInput from '../TaskInput/TaskInput';
import TaskModel from '../../Models/Task';
import Filters from '../Filters/Filters';
import { useTaskContext } from '../../Contexts/TaskContext';

type TaskListProps = {
    inputPlaceholder: string;
};

export default function TaskList(props: TaskListProps) {
    const { filteredTasks } = useTaskContext();

    const taskCards = filteredTasks.map((task: TaskModel) => (
        <TaskCard key={task.id} task={task} />
    ));

    return (
        <>
            <form className={styles.tasklist_form}>
                <TaskInput inputPlaceholder={props.inputPlaceholder}/>
                {filteredTasks.length > 0 && (
                    <ul className={styles.tasklist_list}>{taskCards}</ul>
                )}
                <Filters/>
            </form>
        </>
    );
}
