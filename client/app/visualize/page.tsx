"use client";

import { useState, useEffect, useCallback } from "react";
import {
    ReactFlow,
    Node,
    Edge,
    Background,
    Controls,
    MiniMap,
    BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Task } from "@/lib/types";
import { getAllTasks } from "@/lib/api";
import Header from "@/components/layout/Header";
import { Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const priorityColors = {
    5: { bg: "#ef4444", border: "#dc2626", text: "#fff" },
    4: { bg: "#f97316", border: "#ea580c", text: "#fff" },
    3: { bg: "#eab308", border: "#ca8a04", text: "#000" },
    2: { bg: "#3b82f6", border: "#2563eb", text: "#fff" },
    1: { bg: "#71717a", border: "#52525b", text: "#fff" },
};

function buildGraph(tasks: Task[]): { nodes: Node[]; edges: Edge[] } {
    const nodes: Node[] = tasks.map((task, index) => {
        const color = priorityColors[task.priority as keyof typeof priorityColors] ?? priorityColors[1];
        const col = index % 4;
        const row = Math.floor(index / 4);

        return {
            id: String(task.id),
            position: { x: col * 220 + 50, y: row * 140 + 50 },
            data: {
                label: (
                    <div className="text-center px-1">
                        <div className="font-semibold text-xs leading-tight">{task.name}</div>
                        <div className="text-[10px] mt-0.5 opacity-80">
                            P{task.priority} · #{task.id}
                        </div>
                        {task.completed && (
                            <div className="text-[10px] mt-0.5">✓ Done</div>
                        )}
                    </div>
                ),
            },
            style: {
                background: task.completed ? "#27272a" : color.bg,
                border: `2px solid ${task.completed ? "#3f3f46" : color.border}`,
                color: task.completed ? "#71717a" : color.text,
                borderRadius: "8px",
                width: 180,
                opacity: task.completed ? 0.6 : 1,
            },
        };
    });

    const edges: Edge[] = [];
    tasks.forEach((task) => {
        task.dependencies.forEach((depId) => {
            edges.push({
                id: `e${depId}-${task.id}`,
                source: String(depId),
                target: String(task.id),
                animated: !task.completed,
                style: { stroke: "#3b82f6", strokeWidth: 2 },
                label: "blocks",
                labelStyle: { fill: "#71717a", fontSize: 10 },
            });
        });
    });

    return { nodes, edges };
}

export default function Visualize() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTasks = useCallback(async () => {
        setLoading(true);
        try {
            const all = await getAllTasks();
            setTasks(all);
            setError(null);
        } catch {
            setError("Cannot connect to Tasko server.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const { nodes, edges } = buildGraph(tasks);

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
                <p className="text-red-400">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col">
            <Header />

            <div className="max-w-6xl mx-auto w-full px-6 py-6 space-y-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-zinc-100">
                            Dependency Graph
                        </h2>
                        <p className="text-xs text-zinc-500 mt-0.5">
                            Arrows show blocking relationships — a task cannot start until all its dependencies are completed
                        </p>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={fetchTasks}
                        className="border border-zinc-700 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-800 hover:border-zinc-600 gap-2"
                    >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Refresh</span>
                    </Button>
                </div>

                {tasks.length === 0 ? (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-zinc-600 text-sm">
                            No tasks yet. Add some from the{" "}
                            <a href="/dashboard" className="text-blue-400 hover:underline">
                                dashboard
                            </a>
                            .
                        </p>
                    </div>
                ) : (
                    <div style={{ height: "600px" }} className="rounded-lg border border-zinc-800 overflow-hidden w-full">
                        <ReactFlow
                            nodes={nodes}
                            edges={edges}
                            fitView
                            fitViewOptions={{ padding: 0.2 }}
                            minZoom={0.2}
                            attributionPosition="bottom-left"
                            colorMode="dark"
                        >
                            <Background
                                variant={BackgroundVariant.Dots}
                                gap={20}
                                size={1}
                                color="#27272a"
                            />
                            <Controls />
                            <MiniMap
                                nodeColor={(node) =>
                                    (node.style?.background as string) ?? "#3f3f46"
                                }
                                maskColor="rgba(0,0,0,0.6)"
                            />
                        </ReactFlow>
                    </div>
                )}

                {/* Legend */}
                <div className="flex items-center gap-4 flex-wrap">
                    <span className="text-xs text-zinc-500">Priority:</span>
                    {[
                        { label: "Critical", color: "#ef4444" },
                        { label: "High", color: "#f97316" },
                        { label: "Medium", color: "#eab308" },
                        { label: "Low", color: "#3b82f6" },
                        { label: "Minimal", color: "#71717a" },
                    ].map((p) => (
                        <div key={p.label} className="flex items-center gap-1.5">
                            <div
                                className="w-3 h-3 rounded-sm"
                                style={{ background: p.color }}
                            />
                            <span className="text-xs text-zinc-400">{p.label}</span>
                        </div>
                    ))}
                    <div className="flex items-center gap-1.5 ml-2">
                        <div className="w-3 h-3 rounded-sm bg-zinc-700" />
                        <span className="text-xs text-zinc-400">Completed</span>
                    </div>
                </div>
            </div>
        </div>
    );
}