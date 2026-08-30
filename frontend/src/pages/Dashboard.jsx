import { LayoutGrid, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import TaskCard from "../components/TaskCard";
import api from "../api/axios";
import CreateTaskModal from "../components/CreateTaskModal";
import SuccessAlert from "../components/SuccessAlert";

function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isModalOpen, setisModalOpen] = useState(false);
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const alertTimeoutRef = useRef(null);

    const showSuccessAlert = (message) => {
        setAlertMessage(message);
        setIsAlertVisible(true);

        if (alertTimeoutRef.current) {
            clearTimeout(alertTimeoutRef.current);
        }

        alertTimeoutRef.current = setTimeout(() => {
            setIsAlertVisible(false);
        }, 3000);
    };

    const fetchTasks = async () => {
        try {
            const response = await api.get('/tasks');
            setTasks(response.data);
            setError('');
        } catch (error) {
            console.error("Task fetch error", error);
            setError("Failed to connect to the project database.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [])

    const handleDeleteTask = async (taskId) => {
        const previousTasks = tasks;

        setTasks(prev => prev.filter(task => task.id !== taskId));

        try {
            const response = await api.delete(`/tasks/${taskId}`);
            if (response.status === 200) {
                showSuccessAlert("Task deleted successfully");
            }
        } catch (error) {
            setTasks(previousTasks);
            console.error("Error deleting the task", error);
            setError("Failed to delete the task");
        }
    }

    const handleChangeTaskStatus = async (taskId) => {
        const currentTask = tasks.find(task => task.id === taskId);

        if (!currentTask) {
            return;
        }
        const nextCompleted = !currentTask.completed;
        const previousTasks = [...tasks];

        setTasks(prev => 
            prev.map(task => 
                task.id === taskId ? { ...task, completed: nextCompleted } : task            
            )
        );
        try {
            const response = await api.patch(`/tasks/${taskId}`, {
                completed: nextCompleted
            });
            if (response.status === 200) {
                showSuccessAlert("Task updated successfully");
            }
        } catch (error) {
            setTasks(previousTasks);
            console.error("Error updating the task", error);
            setError("Failed to update the task");

        }
    }

    if (loading) return (
        <div className="flex justify-center items-center h-64 text-blue-500 animate-pulse font-mono">
            Loading...
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-black text-white uppercase tracking-tighter flex items-center gap-3">
                        <LayoutGrid className="text-blue-500" />  Projects Panel
                    </h1>
                    <p className="text-slate-500 font-mono text-sm mt-1">
                        Active tasks: {tasks.filter(t => !t.completed).length}
                    </p>
                </div>

                <button
                    onClick={() => setisModalOpen(true)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 active:scale-95">
                    <Plus className="w-5 h-5" /> New task
                </button>
            </div>

            {error &&
                <div className="p-4 bg-red-500/10 border border-red-500 text-red-500 rounded-xl mb-6">
                    {error}
                </div>
            }

            {tasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {
                        tasks.map(task => (
                            <TaskCard key={task.id} handleChangeTaskStatus={handleChangeTaskStatus} handleDeleteTask={handleDeleteTask} task={task} />
                        ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-slate-900/50 rounded-3xl border-2 border-dashed border-slate-800">
                    <p className="text-slate-500 font-mono text-ls">The project repository is empty.</p>
                    <p className="text-slate-600 text-sm mt-2">Use the button above to add your first task.</p>
                </div>
            )}
            {isAlertVisible && <SuccessAlert message={alertMessage} />}
            <CreateTaskModal
                isOpen={(isModalOpen)}
                onClose={() => setisModalOpen(false)}
                onTaskCreated={fetchTasks}
            />
        </div>
    );
};

export default Dashboard;