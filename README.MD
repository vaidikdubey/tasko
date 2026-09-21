# Tasko

A task scheduler with a C++ backend and React frontend. Built to demonstrate applied DSA — not just solving problems, but using data structures to power a real application.

## How it works

The scheduling engine is written in C++ and uses:
- **Max-heap** (`std::priority_queue`) — tasks are always ordered by priority, O(log n) insertion, O(1) top access
- **Adjacency list** (`std::unordered_map`) — stores task dependencies as a directed graph
- **DFS with color marking** — detects circular dependencies before they're added
- **Topological filtering** — `GET /tasks` only returns tasks whose dependencies are completed, in priority order

The HTTP layer uses [cpp-httplib](https://github.com/yhirose/cpp-httplib) (header-only) and [nlohmann/json](https://github.com/nlohmann/json) (header-only) — no frameworks, just C++17.

The frontend is React + TypeScript, consuming the REST API.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Scheduling Engine | C++17 |
| HTTP Server | cpp-httplib |
| JSON | nlohmann/json |
| Frontend | React + TypeScript |
| Styling | Tailwind CSS |
| Backend Deployment | Railway (Docker) |
| Frontend Deployment | Vercel |

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get actionable tasks (deps met, not completed) |
| GET | `/tasks/all` | Get all tasks regardless of status |
| GET | `/tasks/:id` | Get single task by ID |
| POST | `/tasks` | Add a new task |
| POST | `/tasks/dependency` | Add dependency between tasks |
| PATCH | `/tasks/:id/complete` | Mark task as completed |
| DELETE | `/tasks/:id` | Delete a task |
| DELETE | `/tasks/dependency` | Remove a dependency |

## Running locally

### Backend

Requirements: GCC 11+, CMake 3.10+

```bash
git clone https://github.com/vaidikdubey/tasko.git
cd tasko
mkdir build && cd build
cmake ..
make
./tasko
```

Server runs on `http://localhost:8080`

### Frontend

```bash
cd client
npm install
npm run dev
```

## Data Structures used

### Max-Heap (Priority Queue)
Tasks are stored in a max-heap ordered by priority. The highest priority task is always at the top in O(1). Insertion is O(log n). Used because a scheduler should always know the most urgent task instantly.

### Adjacency List
Dependencies between tasks form a directed graph stored as `unordered_map<int, vector<int>>`. Chosen over an adjacency matrix because tasks are sparse — most tasks don't depend on most other tasks.

### DFS Cycle Detection
Before adding any dependency, we run DFS from the dependent task. Nodes are colored White (unvisited) → Gray (in current path) → Black (done). If we reach a Gray node, we've found a back edge — a cycle. The dependency is rejected and rolled back.

## Contributions
Contributions welcome - fork, branch, commit, push, open a PR.

## Author
### Vaidik Dubey
- LinkedIn: [https://www.linkedin.com/in/vaidik-dubey](https://www.linkedin.com/in/vaidik-dubey)
- GitHub: [https://github.com/vaidikdubey](https://github.com/vaidikdubey)

---

⭐ If you found this project useful, consider giving it a star!