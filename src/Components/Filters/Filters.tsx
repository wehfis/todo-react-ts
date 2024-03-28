import styles from './styles/Filters.module.css';
import FilterButton from '../FilterButton/FilterButton';
import { FilterOptions } from '../FilterButton/FilterButton';
import { useTaskContext } from '../../Contexts/TaskContext';
import React from 'react';

function Filters() {
    const {
        tasks,
        renderTasks,
        deleteTask,
    } = useTaskContext();

    const handleClearCompleted = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        tasks
            .filter((task) => task.completed)
            .forEach(async (task) => await deleteTask(task.id));
        renderTasks();
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
export default React.memo(Filters);
