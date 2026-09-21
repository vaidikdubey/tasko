#pragma once

#include <vector>
#include <queue>
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
    int nextId;

public:
    Scheduler();
    void addTask(std::string name, int priority);
    std::vector<Task> getSchedule();
};