import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Aside from './Components/Aside/Aside';
import TaskList from './Components/TaskList/TaskList';
import styles from './App.module.css';
import { useEffect, useState } from 'react';
import { headerProp, inputTextProp, footerProp } from './constants';
import { useTaskContext } from './Contexts/TaskContext';
import React from 'react';

function App() {
    const { renderTasks } = useTaskContext();
    const [tasksLoaded, setTasksLoaded] = useState<boolean>(false);

    useEffect(() => {
        setTasksLoaded(true);
    }, []);

    return (
        <div className={styles.page_wrapper}>
            <Aside />
            <Header header={headerProp} />
            {tasksLoaded ? (
                <TaskList inputPlaceholder={inputTextProp}/>
            ) : (
                <p>Loading tasks...</p>
            )}
            <Footer comments={footerProp} />
        </div>
    );
}

export default React.memo(App);
