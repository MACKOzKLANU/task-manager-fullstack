import { useEffect } from "react";
import { useState } from "react";
import api from "../api/axios";
import { X } from "lucide-react";

function EditTaskModal({ isOpen, onClose, onTaskEdited, task, showSuccessAlert }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!task || !isOpen) return;

        setTitle(task.title);
        setDescription(task.description);

    }, [task, isOpen])

    if (!isOpen) return null;

    const handleEditTask = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await api.patch(`/tasks/${task.id}`, { title, description });

            await onTaskEdited();
            onClose();
            showSuccessAlert("Task updated successfully")
        } catch (error) {
            const msg = error.response?.data?.details?.[0] || error.response?.data?.error || "Error while editting the task.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    } 

    return (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/80 background-blur-sm">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-slate-800">
                    <h2 className="text-xl font-bold text-white uppercase tracking-tight">Edit Task</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleEditTask} className="p-6 space-y-4">
                    {error && <div className="p-3 bg-red-500/10 border border-red-500 text-red-500 text-sm rounded-lg">
                    {error}</div>}

                    <div>
                        <label className="block text-sm font-mono text-slate-500 uppercase mb-2">Project Title *</label>
                        <input
                            type="text"
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-white transition-all"
                            placeholder="Eg. Frame welding"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-mono text-slate-500 uppercase mb-2">Description</label>
                        <textarea 
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl focus:outline-none focus:border-blue-500 text-white transition-all min-h-25"
                            placeholder="Add technical details..."
                        />
                    </div>

                    <div className="flex gap-3 mt-8">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 p-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all"
                        >Cancel</button>
                        <button 
                            type="submit"
                            disabled={loading}
                            className="flex-1 p-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/20"
                            >{loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditTaskModal;