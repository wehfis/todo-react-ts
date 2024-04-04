import ReactDOM from 'react-dom/client';
import App from './App';
import { TaskProvider } from './Contexts/TaskContext';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorFallback } from './ErrorBoundary';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.reload()}
    >
        <TaskProvider>
            <App />
        </TaskProvider>
    </ErrorBoundary>
);
