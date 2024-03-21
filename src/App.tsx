import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Aside from './Components/Aside/Aside';
import TaskList from './Components/TaskList/TaskList';
import styles from './App.module.css';
import { useEffect, useState } from 'react';
import TaskModel from './Models/Task';
import TaskAPI from './TaskAPI/TaskAPI';
import { headerProp, inputTextProp, footerProp } from './constants';
import { useTaskContext } from './Contexts/TaskContext';

export default function App() {
    const { tasks, setTasks } = useTaskContext();
    const [tasksLoaded, setTasksLoaded] = useState<boolean>(false);

    const renderTask = async () => {
        const tasks: TaskModel[] = await TaskAPI.getTasks();
        setTasks(tasks);
        setTasksLoaded(true);
    };
    useEffect(() => {
        renderTask();
    }, []);

    return (
        <div className={styles.page_wrapper}>
            <Aside />
            <Header header={headerProp} />
            {tasksLoaded ? (
                <TaskList inputText={inputTextProp}/>
            ) : (
                <p>Loading tasks...</p>
            )}
            <Footer comments={footerProp} />
        </div>
    );
}
