import styles from './styles/TaskList.module.css';
import TaskCard from '../TaskCard/TaskCard';
import TaskInput from '../TaskInput/TaskInput';
import TaskModel from '../../Models/Task';
import Filters from '../Filters/Filters';
import { useTaskContext } from '../../Contexts/TaskContext';

type TaskListProps = {
    inputText: string;
};

export default function TaskList(props: TaskListProps) {
    const { tasks, setTasks } = useTaskContext();

    const taskCards = tasks.map((task: TaskModel) => (
        <TaskCard task={task} />
    ));

    return (
        <>
            <form className={styles.tasklist_form}>
                <TaskInput inputText={props.inputText}/>
                {tasks.length > 0 && (
                    <ul className={styles.tasklist_list}>{taskCards}</ul>
                )}
                <Filters/>
            </form>
        </>
    );
}
