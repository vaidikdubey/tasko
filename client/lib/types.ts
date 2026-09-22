export interface Task {
    id: number;
    name: string;
    priority: number;
    completed: boolean;
    dependencies: number[];
}

export interface ApiResponse<T> { 
    data?: T;
    error?: string;
    message?: string;
}