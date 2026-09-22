import { Task } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Trash2, Clock } from "lucide-react";

interface TaskCardProps {
    task: Task;
    allTasks: Task[];
    onComplete: (id: number) => void;
    onDelete: (id: number) => void;
}

const priorityConfig = {
    5: { label: "Critical", className: "bg-red-500/20 text-red-400 border-red-500/30" },
    4: { label: "High", className: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    3: { label: "Medium", className: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    2: { label: "Low", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
    1: { label: "Minimal", className: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30" },
} as const;

export default function TaskCard({ task, allTasks, onComplete, onDelete }: TaskCardProps) {
    const priority = priorityConfig[task.priority as keyof typeof priorityConfig] ?? {
        label: `P${task.priority}`,
        className: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30",
    };

    const depNames = task.dependencies.map((depId) => {
        const dep = allTasks.find((t) => t.id === depId);
        return dep ? dep.name : `Task #${depId}`;
    });

    return (
        <div className={`p-4 rounded-lg border transition-all ${
            task.completed
                ? "bg-zinc-900/30 border-zinc-800/50 opacity-60"
                : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
        }`}>
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm font-medium ${
                            task.completed ? "line-through text-zinc-500" : "text-zinc-100"
                        }`}>
                            {task.name}
                        </span>
                        <Badge className={`text-[10px] border ${priority.className}`}>
                            {priority.label}
                        </Badge>
                        {task.completed && (
                            <Badge className="text-[10px] bg-green-500/20 text-green-400 border border-green-500/30">
                                Completed
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center gap-3 mt-1.5">
                        <span className="text-[10px] text-zinc-600 font-mono">
                            #{task.id}
                        </span>
                        {depNames.length > 0 && (
                            <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Depends on: {depNames.join(", ")}
                            </span>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                    {!task.completed && (
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => onComplete(task.id)}
                            className="h-8 w-8 p-0 text-zinc-400 hover:text-green-400 hover:bg-green-400/10"
                        >
                            <CheckCircle className="w-4 h-4" />
                        </Button>
                    )}
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => onDelete(task.id)}
                        className="h-8 w-8 p-0 text-zinc-400 hover:text-red-400 hover:bg-red-400/10"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </div>
    );
}