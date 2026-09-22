import axios from "axios"
import { Task } from "@/lib/types"

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
})


export const getAllTasks = async (): Promise<Task[]> => { 
    const res = await api.get("/tasks/all")

    return res.data;
}

export const getTask = async (taskId: number): Promise<Task> => { 
    const res = await api.get(`/tasks/${taskId}`)

    return res.data;
}

export const getSchedule = async (): Promise<Task[]> => { 
    const res = await api.get("/tasks");

    return res.data;
}

export const addTask = async (name: string, priority: number): Promise<void> => { 
    await api.post("/tasks", { name, priority });
}

export const addDependency = async (taskId: number, dependsOnId: number): Promise<void> => { 
    await api.post("/tasks/dependency", { taskId, dependsOnId });
}

export const completeTask = async (taskId: number): Promise<void> => { 
    await api.patch(`/tasks/${taskId}/complete`);
}

export const deleteTask = async (taskId: number): Promise<void> => { 
    await api.delete(`/tasks/${taskId}`);
}

export const removeDependency = async (taskId: number, dependsOnId: number): Promise<void> => { 
    await api.delete("/tasks/dependency", { data: { taskId, dependsOnId } });
}