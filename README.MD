# [Tasko](https://usetasko.vercel.app)

A priority-based task scheduler with a C++17 backend and React/TypeScript frontend.

**Live:** https://usetasko.vercel.app · **API:** https://tasko-server-axtu.onrender.com

---

## Why this exists

Most DSA stays on leetcode. This project applies the same data structures to a real problem — a task scheduler that actually enforces priorities and dependency chains, served over HTTP, with a live frontend.

---

## How it works

The scheduling engine is written entirely in C++17. No Node.js, no Python — raw compiled code handling all scheduling decisions. The React frontend consumes it over REST.

### Data Structures

**Max-Heap** (`std::priority_queue`)
- Tasks are stored in a max-heap ordered by priority
- O(log n) insertion, O(1) access to highest priority task
- Used because a scheduler should always know the most urgent task instantly without re-sorting

**Adjacency List** (`unordered_map<int, vector<int>>`)
- Dependencies between tasks form a directed graph
- O(1) lookup by task ID, O(V+E) traversal
- Chosen over adjacency matrix — tasks are sparse, most tasks don't depend on most other tasks

**DFS with Color Marking**
- Before adding any dependency, DFS runs from the dependent task
- White (unvisited) → Gray (in current path) → Black (done)
- If a Gray node is hit, a back edge exists — cycle detected, dependency rejected and rolled back

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Scheduling Engine | C++17 |
| HTTP Server | cpp-httplib (header-only) |
| JSON | nlohmann/json (header-only) |
| Frontend | Next.js + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Visualizer | React Flow |
| Backend Deployment | Render (Docker) |
| Frontend Deployment | Vercel |

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Actionable tasks — deps met, not completed, priority ordered |
| GET | `/tasks/all` | All tasks regardless of status |
| GET | `/tasks/:id` | Single task by ID |
| POST | `/tasks` | Add a new task |
| POST | `/tasks/dependency` | Add dependency — cycle detection runs first |
| PATCH | `/tasks/:id/complete` | Mark task completed — validates deps first |
| DELETE | `/tasks/:id` | Delete task — blocked if others depend on it |
| DELETE | `/tasks/dependency` | Remove a dependency between two tasks |

---

## Running locally

### Backend (C++17)

Requirements: GCC 11+, CMake 3.10+, or Docker

**With Docker:**
```bash
cd server
docker build -t tasko-server .
docker run -p 8080:8080 tasko-server
```

**Without Docker:**
```bash
cd server
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

Add `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

Frontend runs on `http://localhost:3000`

---

## Project Structure

```
tasko/
├── server/                    C++ backend
│   ├── src/
│   │   ├── main.cpp           entry point
│   │   ├── task.h/.cpp        Task struct
│   │   ├── scheduler.h/.cpp   scheduling engine (heap + graph + DFS)
│   │   └── server.h/.cpp      HTTP layer (cpp-httplib)
│   ├── third_party/           httplib.h, json.hpp
│   ├── CMakeLists.txt
│   └── Dockerfile
└── client/                    Next.js frontend
    ├── app/
    │   ├── page.tsx            landing page
    │   ├── dashboard/          task management
    │   └── visualize/          dependency graph
    ├── components/
    └── lib/
        ├── api.ts              all backend calls
        └── types.ts            shared types
```

## Author
### Vaidik Dubey
- LinkedIn: [https://www.linkedin.com/in/vaidik-dubey](https://www.linkedin.com/in/vaidik-dubey)
- GitHub: [https://github.com/vaidikdubey](https://github.com/vaidikdubey)

---

⭐ If you found this project useful, consider giving it a star!