#pragma once

#include <vector>
#include <queue>
#include <unordered_map>
#include "task.h"

struct TaskComparator
{
    // operator() makes a struct callable like a function
    bool operator()(const Task &a, const Task &b)
    {
        return a.priority < b.priority;
    }
};

class Scheduler
{
private:
    std::priority_queue<Task, std::vector<Task>, TaskComparator> tasks;
    std::unordered_map<int, Task> taskMap;
    std::unordered_map<int, std::vector<int>> adjList;
    int nextId;

    bool hasCycle(int taskId, std::unordered_map<int, int> &color);

public:
    Scheduler();
    void addTask(std::string name, int priority);
    bool addDependency(int taskId, int dependsOnId);
    bool completeTask(int taskId);
    std::vector<Task> getSchedule();
};