import styles from './styles/FilterButton.module.css';
import { useTaskContext } from '../../Contexts/TaskContext';
import { useEffect } from 'react';

export enum FilterOptions {
    All = 'All',
    Active = 'Active',
    Completed = 'Completed',
}

type FilterOptionsType = {
    option: FilterOptions;
};

export default function FilterButton(props: FilterOptionsType) {
    const { tasks, setTasks, currentActiveFilter, setCurrentActiveFilter, renderTasks } =
        useTaskContext();
    const handleFilter = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        setCurrentActiveFilter(props.option);
    };

    useEffect(() => {
        renderTasks();
    }, [currentActiveFilter])


    return (
        <>
            <button
                onClick={handleFilter}
                className={`${styles.filter_button} ${
                    props.option === currentActiveFilter
                        ? styles.filter_button_active
                        : ''
                }`}
            >
                {props.option}
            </button>
        </>
    );
}
