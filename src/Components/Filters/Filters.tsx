import styles from './styles/Filters.module.css';
import FilterButton from '../FilterButton/FilterButton';
import { FilterOptions } from '../FilterButton/FilterButton';
import { useEffect, useState } from 'react';
import TaskAPI from '../../TaskAPI/TaskAPI';
import TaskModel from '../../Models/Task';
import { useTaskContext } from '../../Contexts/TaskContext';

type FilterProps = {
    activeTasksQuantity: number;
    filteredTasks: (tasks: TaskModel[]) => void;
};

export default function Filters(props: FilterProps) {
    const { tasks, setTasks, setCurrentActiveFilter } = useTaskContext();
    const [activeItemQuantity, setActiveItemQuantity] = useState<number>(
        props.activeTasksQuantity
    );
    const [itemQuantity, setItemQuantity] = useState<number>(0);

    const handleClearCompleted = async (
        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
    ) => {
        event.preventDefault();
        const tasks = await TaskAPI.getTasks();
        tasks
            .filter((task) => task.completed)
            .forEach(async (task) => await TaskAPI.removeTask(task.id));
        setTasks(tasks.filter((task) => !task.completed));
        setItemQuantity(tasks.length);
        setCurrentActiveFilter(FilterOptions.All);
    };

    useEffect(() => {
        const fetchData = async () => {
            const tasks = await TaskAPI.getTasks();
            setItemQuantity(tasks.length);
            setActiveItemQuantity(
                tasks.filter((task) => !task.completed).length
            );
        };

        fetchData();
    }, [props.activeTasksQuantity, itemQuantity]);

    const taskLeft = `${activeItemQuantity} ${
        activeItemQuantity > 1 ? 'items left' : 'item left'
    }`;
    return (
        <>
            <section className={styles.filters_section}>
                <p className={styles.filters_text}>{taskLeft}</p>
                <FilterButton option={FilterOptions.All} />
                <FilterButton option={FilterOptions.Active} />
                <FilterButton option={FilterOptions.Completed} />
                <a
                    onClick={handleClearCompleted}
                    className={styles.filters_text_fixed}
                    href=""
                >
                    {`${
                        itemQuantity === activeItemQuantity
                            ? ''
                            : 'Clear completed'
                    }`}
                </a>
            </section>
        </>
    );
}
