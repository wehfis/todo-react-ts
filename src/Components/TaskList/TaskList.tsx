import styles from './styles/TaskList.module.css'
import TaskCard from '../TaskCard/TaskCard'
import TaskModel from '../../Models/Task'
import Filters from '../Filters/Filters'
import TaskAPI from '../../TaskAPI/TaskAPI'
import { useEffect, useState } from 'react'

type TaskListProps = {
    inputText: string
    tasks: TaskModel[]
}

export default function TaskList(props: TaskListProps) {
    const [tasks, setTasks] = useState<TaskModel[]>(props.tasks)

    const taskCards = tasks.map((task: TaskModel) => (
        <TaskCard
            key={task.id}
            id={task.id}
            text={task.text}
            completed={task.completed}
        />
    ));

    const updateTaskData = async (): Promise<TaskModel[]> => {
        return await TaskAPI.getTasks()
    }

    const completeAll = async () => {
        const newTasks: TaskModel[] = await updateTaskData()
        if (newTasks.every((task) => task.completed)) {
            await inCompleteAll(newTasks)
            return
        }
        setTasks(
            newTasks.map((task) => {
                return { ...task, completed: true }
            })
        )
        await TaskAPI.completeAllTasks(tasks)
    }
    const inCompleteAll = async (tasks: TaskModel[]) => {
        setTasks(
            tasks.map((task) => {
                return { ...task, completed: false }
            })
        )
        await TaskAPI.inCompleteAllTasks(tasks)
    }

    return (
        <>
            <form className={styles.tasklist_form}>
                <label
                    onClick={completeAll}
                    className={styles.tasklist_complete_all}
                ></label>
                <input
                    placeholder={props.inputText}
                    className={styles.tasklist_input}
                ></input>
                {tasks.length > 0 && (
                    <ul className={styles.tasklist_list}>
                        {taskCards}
                    </ul>
                )}
                <Filters />
            </form>
        </>
    )
}
