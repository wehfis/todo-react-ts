import TaskDto from '../Dtos/Task';
import TaskModel from '../Models/Task';
import common from '../config';

export default class TaskAPI {
    static serverAPI = common.apiUrl;

    static async completeAllTasks(tasks: TaskModel[]) {
        tasks.map((task) => {
            TaskAPI.updateTask(task.id, {
                text: task.text,
                completed: true,
            });
        });
    }

    static async inCompleteAllTasks(tasks: TaskModel[]) {
        tasks.map((task) => {
            TaskAPI.updateTask(task.id, {
                text: task.text,
                completed: false,
            });
        });
    }

    static async getTasks() {
        const response = await fetch(`${TaskAPI.serverAPI}/tasks`);
        return (await response.json()) as TaskModel[];
    }

    static async addTask(task: TaskDto): Promise<TaskModel> {
        const taskId: string = Date.now().toString();
        const taskBody: TaskModel = { id: taskId, ...task };
        await fetch(`${TaskAPI.serverAPI}/tasks`, {
            method: 'POST',
            body: JSON.stringify(taskBody),
        });
        return taskBody;
    }

    static async removeTask(taskId: string) {
        await fetch(`${TaskAPI.serverAPI}/tasks/${taskId}`, {
            method: 'DELETE',
        });
    }

    static async updateTask(taskId: string, newTask: TaskDto) {
        await fetch(`${TaskAPI.serverAPI}/tasks/${taskId}`, {
            method: 'PUT',
            body: JSON.stringify({ id: taskId, ...newTask }),
        });
    }

    static async getTaskById(taskId: string) {
        const response = await fetch(`${TaskAPI.serverAPI}/tasks/${taskId}`);
        return (await response.json()) as TaskModel;
    }
}
