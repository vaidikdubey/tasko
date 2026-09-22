"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Loader2 } from "lucide-react";

interface AddTaskFormProps {
    onAdd: (name: string, priority: number) => Promise<void>;
}

export default function AddTaskForm({ onAdd }: AddTaskFormProps) {
    const [name, setName] = useState("");
    const [priority, setPriority] = useState(3);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;
        setLoading(true);
        await onAdd(name.trim(), priority);
        setName("");
        setPriority(3);
        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
                placeholder="Task name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-zinc-900 border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus-visible:ring-blue-500"
            />
            <select
                value={priority}
                onChange={(e) => setPriority(Number(e.target.value))}
                className="bg-zinc-900 border border-zinc-700 text-zinc-100 text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                <option value={5}>Critical</option>
                <option value={4}>High</option>
                <option value={3}>Medium</option>
                <option value={2}>Low</option>
                <option value={1}>Minimal</option>
            </select>
            <Button
                type="submit"
                disabled={loading || !name.trim()}
                className="bg-blue-600 hover:bg-blue-500 text-white shrink-0"
            >
                {loading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                    <Plus className="w-4 h-4" />
                )}
            </Button>
        </form>
    );
}