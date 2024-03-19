import TaskDto from '../Dtos/Task'
import TaskModel from '../Models/Task'
import common from '../config'

export default class TaskAPI {
    static serverAPI = common.apiUrl

    static async completeAllTasks(tasks: TaskModel[]) {
        try {
            tasks.map(task => {
                TaskAPI.updateTask(task.id, { text: task.text, completed: true });
            });
        } catch (error) {
            console.error(`ERROR FETCHING TASKS DATA: ${error}`)
        }
    }

    static async inCompleteAllTasks(tasks: TaskModel[]) {
        try {
            tasks.map(task => {
                TaskAPI.updateTask(task.id, { text: task.text, completed: false });
            });
        } catch (error) {
            console.error(`ERROR FETCHING TASKS DATA: ${error}`)
        }
    }

    static async getTasks(): Promise<TaskModel[]> {
        try {
            const response = await fetch(`${TaskAPI.serverAPI}/tasks`)
            return (await response.json()) as TaskModel[]
        } catch (error) {
            console.error(`ERROR FETCHING TASKS DATA: ${error}`)
            return [] as TaskModel[]
        }
    }

    static async addTask(task: TaskDto) {
        try {
            const taskBody: TaskModel = { id: Date.now().toString(), ...task }
            await fetch(`${TaskAPI.serverAPI}/tasks`, {
                method: 'POST',
                body: JSON.stringify(taskBody),
            })
        } catch (error) {
            console.error(`ERROR POSTING TASK: ${error}`)
        }
    }

    static async removeTask(taskId: string) {
        try {
            await fetch(`${TaskAPI.serverAPI}/tasks/${taskId}`, {
                method: 'DELETE',
            })
        } catch (error) {
            console.error(`ERROR DELETING TASK: ${error}`)
        }
    }

    static async updateTask(taskId: string, newTask: TaskDto) {
        try {
            await fetch(`${TaskAPI.serverAPI}/tasks/${taskId}`, {
                method: 'PUT',
                body: JSON.stringify({ id: taskId, ...newTask }),
            })
        } catch (error) {
            console.error(`ERROR UPDATING TASK: ${error}`)
        }
    }

    static async getTaskById(taskId: string): Promise<TaskModel> {
        try {
            const response = await fetch(`${TaskAPI.serverAPI}/tasks/${taskId}`)
            return (await response.json()) as TaskModel
        } catch (error) {
            console.error(`ERROR UPDATING TASK: ${error}`)
            return {} as TaskModel
        }
    }
}
