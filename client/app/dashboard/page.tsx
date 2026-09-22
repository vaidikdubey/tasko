"use client";

import { useState, useEffect, useCallback } from "react";
import Header from "@/components/layout/Header";
import AddTaskForm from "@/components/tasks/AddTaskForm";
import DependencyForm from "@/components/tasks/DependencyForm";
import TaskCard from "@/components/tasks/TaskCard";
import { Separator } from "@/components/ui/separator";
import { Task } from "@/lib/types";
import {
    getAllTasks,
    addTask,
    completeTask,
    deleteTask,
    addDependency,
} from "@/lib/api";
import { Loader2, GitBranch, ListTodo, Zap } from "lucide-react";
import { toast } from "sonner";

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [schedule, setSchedule] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = useCallback(async () => {
        try {
            const [all, scheduled] = await Promise.all([
                getAllTasks(),
                import("@/lib/api").then((m) => m.getSchedule()),
            ]);
            setTasks(all);
            setSchedule(scheduled);
            setError(null);
        } catch {
            setError("Cannot connect to Tasko server. Is the C++ backend running?");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleAddTask = async (name: string, priority: number) => {
        try {
            await addTask(name, priority);
            await fetchTasks();
            toast.success("Task added");
        } catch {
            toast.error("Failed to add task");
        }
    };

    const handleComplete = async (id: number) => {
        try {
            await completeTask(id);
            await fetchTasks();
            toast.success("Task completed");
        } catch {
            toast.error("Cannot complete — dependencies not met or task not found");
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleteTask(id);
            await fetchTasks();
            toast.success("Task deleted");
        } catch {
            toast.error("Cannot delete — other tasks depend on this one");
        }
    };

    const handleAddDependency = async (taskId: number, dependsOnId: number) => {
        try {
            await addDependency(taskId, dependsOnId);
            await fetchTasks();
            toast.success("Dependency added");
        } catch {
            toast.error("Invalid dependency — would create a cycle");
        }
    };

    const completedTasks = tasks.filter((t) => t.completed);
    const pendingTasks = tasks.filter((t) => !t.completed);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <Loader2 className="w-6 h-6 animate-spin text-blue-400" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="text-center space-y-2">
                    <p className="text-red-400 font-medium">{error}</p>
                    <p className="text-zinc-500 text-sm">
                        Run{" "}
                        <code className="bg-zinc-800 px-2 py-0.5 rounded text-zinc-300">
                            ./tasko
                        </code>{" "}
                        in the server/build directory
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            <Header />

            <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                            <ListTodo className="w-3.5 h-3.5" />
                            Total Tasks
                        </div>
                        <p className="text-2xl font-bold text-zinc-100">{tasks.length}</p>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                            <Zap className="w-3.5 h-3.5" />
                            Actionable Now
                        </div>
                        <p className="text-2xl font-bold text-blue-400">{schedule.length}</p>
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-zinc-400 text-xs mb-1">
                            <GitBranch className="w-3.5 h-3.5" />
                            Completed
                        </div>
                        <p className="text-2xl font-bold text-green-400">{completedTasks.length}</p>
                    </div>
                </div>

                {/* Add Task */}
                <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                        Add Task
                    </h2>
                    <AddTaskForm onAdd={handleAddTask} />
                </div>

                <Separator className="bg-zinc-800" />

                {/* Add Dependency */}
                {pendingTasks.length >= 2 && (
                    <div className="space-y-2">
                        <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
                            Add Dependency
                        </h2>
                        <DependencyForm tasks={tasks} onAdd={handleAddDependency} />
                    </div>
                )}

                <Separator className="bg-zinc-800" />

                {/* Schedule */}
                <div className="space-y-3">
                    <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-blue-400" />
                        Actionable Now — sorted by priority
                    </h2>
                    {schedule.length === 0 ? (
                        <p className="text-zinc-600 text-sm">
                            {tasks.length === 0
                                ? "Add your first task above."
                                : "All tasks are either completed or blocked by dependencies."}
                        </p>
                    ) : (
                        <div className="space-y-2">
                            {schedule.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    allTasks={tasks}
                                    onComplete={handleComplete}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <Separator className="bg-zinc-800" />

                {/* All Tasks */}
                <div className="space-y-3">
                    <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
                        <ListTodo className="w-3.5 h-3.5" />
                        All Tasks
                    </h2>
                    {tasks.length === 0 ? (
                        <p className="text-zinc-600 text-sm">No tasks yet.</p>
                    ) : (
                        <div className="space-y-2">
                            {tasks.map((task) => (
                                <TaskCard
                                    key={task.id}
                                    task={task}
                                    allTasks={tasks}
                                    onComplete={handleComplete}
                                    onDelete={handleDelete}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}