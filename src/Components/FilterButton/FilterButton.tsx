import { useState } from 'react'
import styles from './styles/FilterButton.module.css'

export enum FilterOptions {
    All = 'All',
    Active = 'Active',
    Completed = 'Completed',
}

type FilterOptionsType = {
    option: FilterOptions
}

export default function FilterButton(filter: FilterOptionsType) {
    const handleFilter = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        event.preventDefault()

        const previousFilter = document.querySelector(`.${styles.filter_button_active}`);
        if (previousFilter) {
            previousFilter.classList.remove(styles.filter_button_active)
        }
        event.currentTarget.classList.add(styles.filter_button_active)
    }

    return (
        <>
            <button
                onClick={handleFilter}
                className={`${styles.filter_button} ${
                    filter.option === FilterOptions.All
                        ? styles.filter_button_active
                        : ''
                }`}
            >
                {filter.option}
            </button>
        </>
    )
}
