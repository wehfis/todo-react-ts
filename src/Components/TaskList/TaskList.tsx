import styles from './styles/TaskList.module.css';
import TaskCard from '../TaskCard/TaskCard';
import TaskModel from '../../Models/Task';
import Filters from '../Filters/Filters';
import TaskAPI from '../../TaskAPI/TaskAPI';
import { useEffect, useState } from 'react';
import { useTaskContext } from '../../Contexts/TaskContext';
import TaskDto from '../../Dtos/Task';

type TaskListProps = {
    inputText: string;
};

export default function TaskList(props: TaskListProps) {
    const { tasks, setTasks } = useTaskContext();
    const [activeTasks, setActiveTasks] = useState<number>(
        calculateActiveTasks()
    );
    const [taskInputValue, setTaskInputValue] = useState('');

    const handleUpdate = async () => {
        setTasks(await updateTaskData());
    };
    const taskCards = tasks.map((task: TaskModel) => (
        <TaskCard task={task} updateTaskStatus={handleUpdate} />
    ));

    const updateTaskData = async (): Promise<TaskModel[]> => {
        return await TaskAPI.getTasks();
    };

    const completeAll = async () => {
        const newTasks: TaskModel[] = await updateTaskData();
        if (newTasks.every((task) => task.completed)) {
            await inCompleteAll(newTasks);
            return;
        }
        setTasks(
            newTasks.map((task) => {
                return { ...task, completed: true };
            })
        );
        await TaskAPI.completeAllTasks(tasks);
    };
    const inCompleteAll = async (tasks: TaskModel[]) => {
        setTasks(
            tasks.map((task) => {
                return { ...task, completed: false };
            })
        );
        await TaskAPI.inCompleteAllTasks(tasks);
    };
    const createTask = async (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && event.currentTarget.value) {
            const newTask: TaskDto = {
                text: event.currentTarget.value,
                completed: false,
            };
            await TaskAPI.addTask(newTask);
            await handleUpdate();
            setTaskInputValue('');
        }
    };
    function calculateActiveTasks() {
        return tasks.filter((task) => !task.completed).length;
    }

    useEffect(() => {
        setActiveTasks(calculateActiveTasks());
    }, [tasks]);

    return (
        <>
            <form className={styles.tasklist_form}>
                <label
                    onClick={completeAll}
                    className={styles.tasklist_complete_all}
                ></label>
                <input
                    onKeyDown={createTask}
                    value={taskInputValue}
                    onChange={(event) => setTaskInputValue(event.target.value)}
                    placeholder={props.inputText}
                    className={styles.tasklist_input}
                ></input>
                {tasks.length > 0 && (
                    <ul className={styles.tasklist_list}>{taskCards}</ul>
                )}
                <Filters
                    activeTasksQuantity={activeTasks}
                    filteredTasks={(tasks: TaskModel[]) => setTasks(tasks)}
                />
            </form>
        </>
    );
}
