import React, {
    ReactComponentElement,
    ReactNode,
    createContext,
    useContext,
    useState,
} from 'react';
import TaskModel from '../Models/Task';
import { FilterOptions } from '../Components/FilterButton/FilterButton';

interface TaskContextType {
    currentActiveFilter: FilterOptions;
    tasks: TaskModel[];
    setCurrentActiveFilter: (filter: FilterOptions) => void;
    setTasks: (tasks: TaskModel[]) => void;
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
    const [currentActiveFilter, setCurrentActiveFilter] = useState(FilterOptions.All);
    const [tasks, setTasks] = useState<TaskModel[]>([]);

    return (
        <TaskContext.Provider
            value={{
                currentActiveFilter,
                tasks,
                setCurrentActiveFilter,
                setTasks,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
};
