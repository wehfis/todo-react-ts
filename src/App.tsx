import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import Aside from './Components/Aside/Aside'
import TaskList from './Components/TaskList/TaskList'
import styles from './App.module.css'
import { useEffect, useState } from 'react'
import TaskModel from './Models/Task'
import TaskAPI from './TaskAPI/TaskAPI'

export default function App() {
    const [tasksPayload, setTasksPayload] = useState<TaskModel[]>([])

    // Move to constants.ts
    const headerProp: string = 'todos'
    const inputTextProp: string = 'What needs to be done?'
    const footerProp: string[] = [
        'Double-click to edit a todo',
        'Credits: James Thomas, Ed Chatelain and Akira Sudoh',
        'Part of TodoMVC',
    ]
    const renderTask = async () => {
        const tasks = await TaskAPI.getTasks()
        setTasksPayload(tasks)
    }
    useEffect(() => {
        renderTask()
    }, [])

    return (
        <div className={styles.page_wrapper}>
            <Aside />
            <Header header={headerProp} />
            {tasksPayload.length > 0 && (
                <TaskList inputText={inputTextProp} tasks={tasksPayload} />
            )}
            <Footer comments={footerProp} />
        </div>
    )
}
