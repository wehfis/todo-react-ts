import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import TaskModel from '../Models/Task';
import { FilterOptions } from '../Components/FilterButton/FilterButton';
import TaskAPI from '../TaskAPI/TaskAPI';
import TaskDto from '../Dtos/Task';
import { useErrorBoundary } from 'react-error-boundary';

interface TaskContextType {
    currentActiveFilter: FilterOptions;
    tasks: TaskModel[];
    filteredTasks: TaskModel[];
    setCurrentActiveFilter: (filter: FilterOptions) => void;
    setTasks: (tasks: TaskModel[]) => void;
    setFilteredTasks: (tasks: TaskModel[]) => void;
    renderTasks: () => void;
    completeAll: () => void;
    createTask: (task: TaskDto) => void;
    updateTask: (taskId: string, newTask: TaskDto) => void;
    deleteTask: (taskId: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
    const context = useContext(TaskContext);
    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }
    return context;
};

interface TaskProviderProps {
    children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
    const [currentActiveFilter, setCurrentActiveFilter] = useState(
        FilterOptions.All
    );
    const [tasks, setTasks] = useState<TaskModel[]>([]);
    const [filteredTasks, setFilteredTasks] = useState<TaskModel[]>([]);
    const { showBoundary } = useErrorBoundary();

    useEffect(() => {
        renderTasks();
    }, [currentActiveFilter, tasks, filteredTasks]);

    const renderTasks = async () => {
        try {
            const newTasks = await TaskAPI.getTasks();
            setTasks(newTasks);
            switch (currentActiveFilter) {
                case FilterOptions.Active:
                    setFilteredTasks(
                        newTasks.filter((task) => !task.completed)
                    );
                    return;
                case FilterOptions.Completed:
                    setFilteredTasks(newTasks.filter((task) => task.completed));
                    return;
                default:
                    setFilteredTasks(newTasks);
                    return;
            }
        } catch (error: any) {
            showBoundary(error);
        }
    };

    const deleteTask = async (taskId: string) => {
        try {
            await TaskAPI.removeTask(taskId);
            setTasks(tasks.filter((task) => task.id !== taskId));
        } catch (error: any) {
            return showBoundary(error);
        }
    };

    const completeAll = async () => {
        try {
            if (tasks.every((task) => task.completed)) {
                await inCompleteAll();
                return;
            }
            setTasks(
                tasks.map((task) => {
                    return { ...task, completed: true };
                })
            );
            await TaskAPI.completeAllTasks(tasks);
        } catch (error: any) {
            showBoundary(error);
        }
    };
    const inCompleteAll = async () => {
        try {
            setTasks(
                tasks.map((task) => {
                    return { ...task, completed: false };
                })
            );
            await TaskAPI.inCompleteAllTasks(tasks);
        } catch (error: any) {
            showBoundary(error);
        }
    };
    const createTask = async (newTask: TaskDto) => {
        try {
            const createdTask = await TaskAPI.addTask(newTask);
            setTasks([...tasks, createdTask]);
        } catch (error: any) {
            showBoundary(error);
        }
    };
    const updateTask = async (taskId: string, task: TaskDto) => {
        try {
            await TaskAPI.updateTask(taskId, task);
        } catch (error: any) {
            showBoundary(error);
        }
    };

    return (
        <TaskContext.Provider
            value={{
                currentActiveFilter,
                tasks,
                filteredTasks,
                setCurrentActiveFilter,
                setTasks,
                setFilteredTasks,
                renderTasks,
                completeAll,
                createTask,
                updateTask,
                deleteTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
