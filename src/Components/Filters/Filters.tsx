import styles from './styles/Filters.module.css';
import FilterButton from '../FilterButton/FilterButton';
import { FilterOptions } from '../FilterButton/FilterButton';
import TaskAPI from '../../TaskAPI/TaskAPI';
import { useTaskContext } from '../../Contexts/TaskContext';
import TaskModel from '../../Models/Task';
import { useEffect, useState } from 'react';

export default function Filters() {
    const { tasks, setTasks, setCurrentActiveFilter } = useTaskContext();
    const [allTasks, setAllTasks] = useState<TaskModel[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await TaskAPI.getTasks();
            setAllTasks(tasks);
        };

        fetchTasks();
    }, [tasks]);

    const handleClearCompleted = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        allTasks
            .filter((task) => task.completed)
            .forEach(async (task) => await TaskAPI.removeTask(task.id));
        setTasks(allTasks.filter((task) => !task.completed));
        setCurrentActiveFilter(FilterOptions.All);
    };

    const taskLeft = `${allTasks.filter((task) => !task.completed).length} ${
        allTasks.filter((task) => !task.completed).length > 1
            ? 'items left'
            : 'item left'
    }`;
    return (
        <>
            <section className={styles.filters_section}>
                <p className={styles.filters_text}>{taskLeft}</p>
                <FilterButton option={FilterOptions.All} />
                <FilterButton option={FilterOptions.Active} />
                <FilterButton option={FilterOptions.Completed} />
                <button
                    onClick={handleClearCompleted}
                    className={styles.filters_text_fixed}
                >
                    {`${allTasks.length === allTasks.filter((task) => !task.completed).length ? '' : 'Clear completed'}`}
                </button>
            </section>
        </>
    );
}
