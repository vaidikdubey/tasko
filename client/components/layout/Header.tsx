import { CheckSquare } from "lucide-react";
import Link from "next/link";

export default function Header() {
    return (
        <header className="border-b border-zinc-800 bg-zinc-900/50 px-4 sm:px-6 py-4">
            <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 shrink-0">
                    <CheckSquare className="w-5 h-5 text-blue-400" />
                    <h1 className="text-lg font-bold text-zinc-100">Tasko</h1>
                    <span className="hidden sm:inline text-xs text-zinc-500 border border-zinc-700 px-2 py-0.5 rounded-full">
                        C++ Powered
                    </span>
                </div>
                <nav className="flex items-center gap-3 sm:gap-4">
                    <Link
                        href="/dashboard"
                        className="text-xs sm:text-sm text-zinc-400 hover:text-zinc-100 transition"
                    >
                        Dashboard
                    </Link>
                    <Link
                        href="/visualize"
                        className="text-xs sm:text-sm text-zinc-400 hover:text-zinc-100 transition"
                    >
                        Visualize
                    </Link>
                </nav>
            </div>
        </header>
    );
}