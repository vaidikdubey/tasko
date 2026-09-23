import Link from "next/link";
import { CheckSquare, ExternalLink, Cpu, GitBranch, Zap } from "lucide-react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Home() {
    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100">
            {/* Header */}
            <header className="border-b border-zinc-800/50 px-4 sm:px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <Link href="#hero" className="flex items-center gap-2">
                        <CheckSquare className="w-5 h-5 text-blue-400" />
                        <span className="font-bold text-zinc-100">Tasko</span>
                    </Link>
                    <div className="flex items-center gap-3">
                        <Link
                            href="https://github.com/vaidikdubey/tasko"
                            target="_blank"
                            className="text-xs sm:text-sm text-zinc-400 hover:text-zinc-100 transition flex items-center gap-1.5"
                        >
                            <FaGithub className="w-4 h-4" />
                            <span className="hidden sm:inline">Source</span>
                        </Link>
                        <Link
                            href="/dashboard"
                            className="bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm px-3 py-1.5 rounded-md transition"
                        >
                            Live Demo
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section id="hero" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 text-center">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs px-3 py-1.5 rounded-full mb-6">
                    <Cpu className="w-3.5 h-3.5" />
                    C++17 Backend · DSA Applied
                </div>
                <h1 className="text-4xl sm:text-6xl font-bold text-zinc-100 leading-tight mb-6">
                    Task scheduling,{" "}
                    <span className="text-blue-400">engineered</span>
                    <br className="hidden sm:block" /> from the ground up.
                </h1>
                <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                    A priority-based task scheduler powered by a C++ engine using real data structures —
                    not just theory. Max-heap for ordering, directed graphs for dependencies,
                    DFS for cycle detection.
                </p>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                    <Link
                        href="/dashboard"
                        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg transition flex items-center gap-2"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Try the Demo
                    </Link>
                    <Link
                        href="https://github.com/vaidikdubey/tasko"
                        target="_blank"
                        className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-zinc-100 font-semibold px-6 py-3 rounded-lg transition flex items-center gap-2"
                    >
                        <FaGithub className="w-4 h-4" />
                        View Source
                    </Link>
                </div>
            </section>

            {/* Tech Bar */}
            <section className="border-y border-zinc-800 bg-zinc-900/30 py-4">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
                        {[
                            "C++17",
                            "Max-Heap",
                            "DFS Cycle Detection",
                            "Adjacency List",
                            "REST API",
                            "React · TypeScript",
                            "Docker",
                        ].map((tech) => (
                            <span
                                key={tech}
                                className="text-xs sm:text-sm text-zinc-400 font-mono border border-zinc-800 px-3 py-1 rounded-full"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
                    How it works
                </h2>
                <p className="text-zinc-500 text-center text-sm mb-12">
                    Three layers, each doing exactly one thing well.
                </p>
                <div className="grid sm:grid-cols-3 gap-6">
                    {[
                        {
                            icon: <Cpu className="w-5 h-5 text-blue-400" />,
                            title: "C++ Scheduling Engine",
                            desc: "The core logic lives entirely in C++17. No Node.js, no Python — raw compiled code handling all scheduling decisions with STL data structures.",
                            tag: "server/src/",
                        },
                        {
                            icon: <GitBranch className="w-5 h-5 text-purple-400" />,
                            title: "REST API Layer",
                            desc: "cpp-httplib exposes the scheduler over HTTP. Zero frameworks — just C++ handling JSON parsing, routing, CORS, and request/response lifecycle.",
                            tag: "server.cpp",
                        },
                        {
                            icon: <Zap className="w-5 h-5 text-yellow-400" />,
                            title: "React Frontend",
                            desc: "Next.js + TypeScript consumes the API. Renders the live schedule, dependency graph with React Flow, and handles all user interactions.",
                            tag: "client/app/",
                        },
                    ].map((item) => (
                        <div
                            key={item.title}
                            className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-3"
                        >
                            <div className="flex items-center gap-2">
                                {item.icon}
                                <h3 className="font-semibold text-zinc-100">{item.title}</h3>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed">{item.desc}</p>
                            <span className="text-[10px] font-mono text-zinc-600 bg-zinc-800 px-2 py-0.5 rounded">
                                {item.tag}
                            </span>
                        </div>
                    ))}
                </div>
            </section>

            {/* DSA Deep Dive */}
            <section className="border-t border-zinc-800 bg-zinc-900/20 py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
                        DSA, actually applied
                    </h2>
                    <p className="text-zinc-500 text-center text-sm mb-12">
                        Not leetcode solutions. Real data structures solving real problems.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-6">
                        {[
                            {
                                ds: "Max-Heap",
                                impl: "std::priority_queue",
                                complexity: "O(log n) insert · O(1) top",
                                problem: "Always serve the highest priority task next without re-sorting the entire list on every operation.",
                                why: "A sorted array would cost O(n log n) per query. The heap maintains order on insertion — the right tool for a live priority queue.",
                                color: "blue",
                            },
                            {
                                ds: "Adjacency List",
                                impl: "unordered_map<int, vector<int>>",
                                complexity: "O(1) lookup · O(V+E) traversal",
                                problem: "Store which tasks block other tasks, supporting fast lookup by task ID and efficient graph traversal.",
                                why: "An adjacency matrix would waste O(V²) space for a sparse graph. Tasks rarely depend on most other tasks — the list is the right call.",
                                color: "purple",
                            },
                            {
                                ds: "DFS + Color Marking",
                                impl: "Recursive DFS · White/Gray/Black",
                                complexity: "O(V+E) per dependency add",
                                problem: "Before adding a dependency, detect if it would create a circular chain — Task A → B → A.",
                                why: "Three-color marking (unvisited/in-stack/done) catches back edges in one pass. If a Gray node is revisited, a cycle exists — dependency is rejected.",
                                color: "green",
                            },
                        ].map((item) => (
                            <div
                                key={item.ds}
                                className={`bg-zinc-900 border rounded-xl p-6 space-y-4 ${
                                    item.color === "blue"
                                        ? "border-blue-500/20"
                                        : item.color === "purple"
                                        ? "border-purple-500/20"
                                        : "border-green-500/20"
                                }`}
                            >
                                <div>
                                    <h3 className={`font-bold text-lg ${
                                        item.color === "blue"
                                            ? "text-blue-400"
                                            : item.color === "purple"
                                            ? "text-purple-400"
                                            : "text-green-400"
                                    }`}>
                                        {item.ds}
                                    </h3>
                                    <code className="text-[10px] text-zinc-500 font-mono">
                                        {item.impl}
                                    </code>
                                </div>
                                <div className={`text-xs font-mono px-2 py-1 rounded w-fit ${
                                    item.color === "blue"
                                        ? "bg-blue-500/10 text-blue-300"
                                        : item.color === "purple"
                                        ? "bg-purple-500/10 text-purple-300"
                                        : "bg-green-500/10 text-green-300"
                                }`}>
                                    {item.complexity}
                                </div>
                                <div className="space-y-2">
                                    <p className="text-zinc-300 text-sm font-medium">
                                        The problem:
                                    </p>
                                    <p className="text-zinc-500 text-sm leading-relaxed">
                                        {item.problem}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-zinc-300 text-sm font-medium">
                                        Why this structure:
                                    </p>
                                    <p className="text-zinc-500 text-sm leading-relaxed">
                                        {item.why}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* API Reference */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
                <h2 className="text-2xl sm:text-3xl font-bold text-center mb-3">
                    API Reference
                </h2>
                <p className="text-zinc-500 text-center text-sm mb-12">
                    Eight endpoints. No framework. Pure C++.
                </p>
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-zinc-800 text-left">
                                    <th className="px-4 sm:px-6 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wider">
                                        Method
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wider">
                                        Endpoint
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wider hidden sm:table-cell">
                                        Description
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-800">
                                {[
                                    { method: "GET", color: "blue", endpoint: "/tasks", desc: "Actionable tasks — deps met, not completed" },
                                    { method: "GET", color: "blue", endpoint: "/tasks/all", desc: "All tasks regardless of status" },
                                    { method: "GET", color: "blue", endpoint: "/tasks/:id", desc: "Single task by ID" },
                                    { method: "POST", color: "green", endpoint: "/tasks", desc: "Add a new task with name and priority" },
                                    { method: "POST", color: "green", endpoint: "/tasks/dependency", desc: "Add dependency — cycle detection runs first" },
                                    { method: "PATCH", color: "yellow", endpoint: "/tasks/:id/complete", desc: "Mark task done — validates deps first" },
                                    { method: "DELETE", color: "red", endpoint: "/tasks/:id", desc: "Delete task — blocked if others depend on it" },
                                    { method: "DELETE", color: "red", endpoint: "/tasks/dependency", desc: "Remove a dependency between two tasks" },
                                ].map((row) => (
                                    <tr key={row.endpoint + row.method} className="hover:bg-zinc-800/50 transition">
                                        <td className="px-4 sm:px-6 py-3">
                                            <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                                                row.color === "blue"
                                                    ? "bg-blue-500/10 text-blue-400"
                                                    : row.color === "green"
                                                    ? "bg-green-500/10 text-green-400"
                                                    : row.color === "yellow"
                                                    ? "bg-yellow-500/10 text-yellow-400"
                                                    : "bg-red-500/10 text-red-400"
                                            }`}>
                                                {row.method}
                                            </span>
                                        </td>
                                        <td className="px-4 sm:px-6 py-3 font-mono text-xs text-zinc-300">
                                            {row.endpoint}
                                        </td>
                                        <td className="px-4 sm:px-6 py-3 text-zinc-500 text-xs hidden sm:table-cell">
                                            {row.desc}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-zinc-800 py-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link href="#hero" className="flex items-center gap-2">
                        <CheckSquare className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-semibold text-zinc-300">Tasko</span>
                        <span className="text-zinc-600 text-sm">·</span>
                        <Link href="https://heyvaidik.vercel.app" target="_blank" className="text-zinc-500 text-sm hover:text-zinc-200 transition">Built by Vaidik Dubey</Link>
                    </Link>
                    <div className="flex items-center gap-4">
                    <Link
                        href="https://github.com/vaidikdubey/tasko"
                        target="_blank"
                        className="text-zinc-400 hover:text-zinc-100 transition text-sm"
                    >
                        <FaGithub className="w-4 h-4" />
                    </Link>
                    <Link
                        href="https://www.linkedin.com/in/vaidik-dubey"
                        target="_blank"
                        className="text-zinc-400 hover:text-zinc-100 transition text-sm"
                    >
                        <FaLinkedinIn className="w-4 h-4" />
                    </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}