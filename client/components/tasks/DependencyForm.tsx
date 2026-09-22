"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Task } from "@/lib/types";
import { GitBranch, Loader2 } from "lucide-react";

interface DependencyFormProps {
    tasks: Task[];
    onAdd: (taskId: number, dependsOnId: number) => Promise<void>;
}

export default function DependencyForm({ tasks, onAdd }: DependencyFormProps) {
    const [taskId, setTaskId] = useState<number | "">("");
    const [dependsOnId, setDependsOnId] = useState<number | "">("");
    const [loading, setLoading] = useState(false);

    const incompleteTasks = tasks.filter((t) => !t.completed);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (taskId === "" || dependsOnId === "" || taskId === dependsOnId) return;
        setLoading(true);
        await onAdd(Number(taskId), Number(dependsOnId));
        setTaskId("");
        setDependsOnId("");
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-2">
            <div className="flex gap-2 items-center flex-wrap sm:flex-nowrap">
                <select
                    value={taskId}
                    onChange={(e) => setTaskId(Number(e.target.value))}
                    className="flex-1 min-w-0 bg-zinc-900 border border-zinc-700 text-zinc-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Task...</option>
                    {incompleteTasks.map((t) => (
                        <option key={t.id} value={t.id}>
                            #{t.id} {t.name}
                        </option>
                    ))}
                </select>

                <span className="text-zinc-500 text-xs shrink-0 hidden sm:inline">
                    depends on
                </span>

                <select
                    value={dependsOnId}
                    onChange={(e) => setDependsOnId(Number(e.target.value))}
                    className="flex-1 min-w-0 bg-zinc-900 border border-zinc-700 text-zinc-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Depends on...</option>
                    {incompleteTasks
                        .filter((t) => t.id !== taskId)
                        .map((t) => (
                            <option key={t.id} value={t.id}>
                                #{t.id} {t.name}
                            </option>
                        ))}
                </select>

                <Button
                    type="submit"
                    disabled={loading || taskId === "" || dependsOnId === "" || taskId === dependsOnId}
                    className="bg-purple-600 hover:bg-purple-500 text-white shrink-0"
                >
                    {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <GitBranch className="w-4 h-4" />
                    )}
                </Button>
            </div>
            <p className="text-[10px] text-zinc-600 sm:hidden">
                Select a task that depends on another task
            </p>
        </form>
    );
}