import { CheckCircle2, Circle, Clock, Trash2 } from 'lucide-react'

function TaskCard({ task }) {
    const date = new Date(task.createdAt).toLocaleDateString();

    return (
        <div className="bg-slate-900 border border-slate-800 p-5 rounded-2xl hover:border-blue-500/50 transition-all group shadow-lg">
            <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                    <h3 className={`text-lg font-bold ${task.completed ? 'text-slate-500 line-through' : 'text-white'}`}>
                        {task.title}
                    </h3>
                    <p className="text-slate-400 text-sm mt-1 line-clamp-2">
                        {task.description || "No technical description."}
                    </p>
                </div>

                <div className={`${task.completed ? 'text-green-500' : 'text-blue-500'}`}>
                    {task.completed ? <CheckCircle2 className='w-6 h-6' /> : <Circle className='w-6 h-6' />}
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-xs font-mono text-slate-500">
                <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{date}</span>
                </div>

                <button className="text-slate-600 hover:text-red-500 transition-colors p-1">
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default TaskCard;