import styles from './styles/Filters.module.css';
import FilterButton from '../FilterButton/FilterButton';
import { FilterOptions } from '../FilterButton/FilterButton';
import TaskAPI from '../../TaskAPI/TaskAPI';
import { useTaskContext } from '../../Contexts/TaskContext';

export default function Filters() {
    const { tasks, setTasks, currentActiveFilter, setCurrentActiveFilter } = useTaskContext();

    const handleClearCompleted = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        tasks
            .filter((task) => task.completed)
            .forEach(async (task) => await TaskAPI.removeTask(task.id));
        setTasks(tasks.filter((task) => !task.completed));
        if (currentActiveFilter !== FilterOptions.All) {
            setCurrentActiveFilter(FilterOptions.All);
        }
    };

    const taskLeft = `${tasks.filter((task) => !task.completed).length} ${
        tasks.filter((task) => !task.completed).length > 1
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
                    {`${tasks.length === tasks.filter((task) => !task.completed).length ? '' : 'Clear completed'}`}
                </button>
            </section>
        </>
    );
}
