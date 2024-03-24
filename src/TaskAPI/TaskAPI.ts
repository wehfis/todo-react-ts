import TaskDto from '../Dtos/Task';
import TaskModel from '../Models/Task';
import common from '../config';
import { notification } from 'antd';

export default class TaskAPI {
    static serverAPI = common.apiUrl;

    static handleError(error: any, errorMessage: string) {
        notification.error({
            message: errorMessage,
            description: error.message,
        });
    }

    static async completeAllTasks(tasks: TaskModel[]) {
        try {
            tasks.map((task) => {
                TaskAPI.updateTask(task.id, {
                    text: task.text,
                    completed: true,
                });
            });
        } catch (error) {
            TaskAPI.handleError(error, 'ERROR FETCHING TASKS DATA');
        }
    }

    static async inCompleteAllTasks(tasks: TaskModel[]) {
        try {
            tasks.map((task) => {
                TaskAPI.updateTask(task.id, {
                    text: task.text,
                    completed: false,
                });
            });
        } catch (error: any) {
            TaskAPI.handleError(error, 'ERROR FETCHING TASKS DATA');
        }
    }

    static async getTasks() {
        try {
            const response = await fetch(`${TaskAPI.serverAPI}/tasks`);
            return (await response.json()) as TaskModel[];
        } catch (error) {
            TaskAPI.handleError(error, 'ERROR FETCHING TASKS DATA');
            return [] as TaskModel[];
        }
    }

    static async addTask(task: TaskDto): Promise<TaskModel> {
        try {
            const taskId: string = Date.now().toString();
            const taskBody: TaskModel = { id: taskId, ...task };
            await fetch(`${TaskAPI.serverAPI}/tasks`, {
                method: 'POST',
                body: JSON.stringify(taskBody),
            });
            return taskBody;
        } catch (error) {
            TaskAPI.handleError(error, 'ERROR POSTING TASK');
            return {} as TaskModel;
        }
    }

    static async removeTask(taskId: string) {
        try {
            await fetch(`${TaskAPI.serverAPI}/tasks/${taskId}`, {
                method: 'DELETE',
            });
        } catch (error) {
            TaskAPI.handleError(error, 'ERROR DELETING TASK');
        }
    }

    static async updateTask(taskId: string, newTask: TaskDto) {
        try {
            await fetch(`${TaskAPI.serverAPI}/tasks/${taskId}`, {
                method: 'PUT',
                body: JSON.stringify({ id: taskId, ...newTask }),
            });
        } catch (error) {
            TaskAPI.handleError(error, 'ERROR UPDATING TASK');
        }
    }

    static async getTaskById(taskId: string) {
        try {
            const response = await fetch(
                `${TaskAPI.serverAPI}/tasks/${taskId}`
            );
            return (await response.json()) as TaskModel;
        } catch (error) {
            TaskAPI.handleError(error, 'ERROR UPDATING TASK');
            return {} as TaskModel;
        }
    }
}
