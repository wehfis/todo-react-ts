import React, {
    ReactNode,
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
    useMemo,
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

    const renderTasks = useCallback(async () => {
        try {
            const newTasks = await TaskAPI.getTasks();
            switch (currentActiveFilter) {
                case FilterOptions.Active:
                    setFilteredTasks(
                        newTasks.filter((task) => !task.completed)
                    );
                    break;
                case FilterOptions.Completed:
                    setFilteredTasks(newTasks.filter((task) => task.completed));
                    break;
                default:
                    setFilteredTasks(newTasks);
                    break;
            }
            setTasks(newTasks);
        } catch (error: any) {
            showBoundary(error);
        }
    }, [currentActiveFilter, showBoundary]);

    useEffect(() => {
        renderTasks();
    }, [currentActiveFilter]);

    const deleteTask = useCallback(
        async (taskId: string) => {
            try {
                await TaskAPI.removeTask(taskId);
                await renderTasks();
            } catch (error: any) {
                return showBoundary(error);
            }
        },
        [tasks, showBoundary]
    );

    const completeAll = useCallback(async () => {
        try {
            const allTasksCompleted = tasks.every((task) => task.completed);
            setTasks(
                tasks.map((task) => ({
                    ...task,
                    completed: !allTasksCompleted,
                }))
            );
            if (allTasksCompleted) {
                await TaskAPI.inCompleteAllTasks(tasks);
            } else {
                await TaskAPI.completeAllTasks(tasks);
            }
            await renderTasks();
        } catch (error) {
            showBoundary(error);
        }
    }, [tasks, showBoundary, renderTasks]);

    const createTask = useCallback(
        async (newTask: TaskDto) => {
            try {
                await TaskAPI.addTask(newTask);
                await renderTasks();
            } catch (error: any) {
                showBoundary(error);
            }
        },
        [tasks, showBoundary]
    );

    const updateTask = useCallback(
        async (taskId: string, task: TaskDto) => {
            try {
                await TaskAPI.updateTask(taskId, task);
                await renderTasks();
            } catch (error: any) {
                showBoundary(error);
            }
        },
        [tasks, showBoundary]
    );

    const memoizedContextValue = useMemo(
        () => ({
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
        }),
        [
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
        ]
    );

    return (
        <TaskContext.Provider value={memoizedContextValue}>
            {children}
        </TaskContext.Provider>
    );
};
