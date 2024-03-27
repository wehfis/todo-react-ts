import styles from './styles/FilterButton.module.css';
import { useTaskContext } from '../../Contexts/TaskContext';
import React from 'react';

export enum FilterOptions {
    All = 'All',
    Active = 'Active',
    Completed = 'Completed',
}

type FilterOptionsType = {
    option: FilterOptions;
};

function FilterButton(props: FilterOptionsType) {
    const { currentActiveFilter, setCurrentActiveFilter } = useTaskContext();
    const handleFilter = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        event.preventDefault();
        setCurrentActiveFilter(props.option);
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

export default React.memo(FilterButton);
