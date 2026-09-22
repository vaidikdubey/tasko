import { CheckSquare } from "lucide-react";

export default function Header() {
    return (
        <header className="border-b border-zinc-800 bg-zinc-900/50 px-6 py-4">
            <div className="max-w-6xl mx-auto flex items-center gap-3">
                <CheckSquare className="w-6 h-6 text-blue-400" />
                <h1 className="text-xl font-bold text-zinc-100">Tasko</h1>
                <span className="text-xs text-zinc-500 border border-zinc-700 px-2 py-0.5 rounded-full">
                    C++ Powered
                </span>
            </div>
        </header>
    );
}