import { useState, useEffect } from 'react';
import styles from './styles/FilterButton.module.css';
import TaskModel from '../../Models/Task';
import TaskAPI from '../../TaskAPI/TaskAPI';
import { useTaskContext } from '../../Contexts/TaskContext';

export enum FilterOptions {
    All = 'All',
    Active = 'Active',
    Completed = 'Completed',
}

type FilterOptionsType = {
    option: FilterOptions;
};

export default function FilterButton(props: FilterOptionsType) {
    const { tasks, setTasks, currentActiveFilter, setCurrentActiveFilter } =
        useTaskContext();
    const handleFilter = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        await filterTasks();
        setCurrentActiveFilter(props.option);
    };
    const filterTasks = async () => {
        const currentTasks = await fetchData();
         
        switch (props.option) {
            case FilterOptions.Active:
                setTasks(currentTasks.filter((task) => !task.completed));
                return;
            case FilterOptions.Completed:
                setTasks(currentTasks.filter((task) => task.completed));
                return;
            default:
                setTasks(currentTasks);
                return;
        }
    };
    const fetchData = async () => {
        return await TaskAPI.getTasks();
    };

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
