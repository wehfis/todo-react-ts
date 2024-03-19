import styles from './styles/Filters.module.css'
import FilterButton from '../FilterButton/FilterButton'
import { FilterOptions } from '../FilterButton/FilterButton'

export default function Filters() {
    return (
        <>
            <section className={styles.filters_section}>
                <p className={styles.filters_text}> 1 Item left</p>
                <FilterButton option={FilterOptions.All} />
                <FilterButton option={FilterOptions.Active} />
                <FilterButton option={FilterOptions.Completed} />
                <a className={styles.filters_text} href="">
                    Clear completed
                </a>
            </section>
        </>
    )
}
