#include "scheduler.h"
#include <iostream>
#include <algorithm>

using namespace std;

Scheduler::Scheduler()
{
    nextId = 1;
}

void Scheduler::addTask(string name, int priority) // O(logN)
{
    Task task(nextId++, name, priority);
    tasks.push(task);
    taskMap.insert({task.id, task});
    adjList[task.id] = {};
}

// Colors {
//     White(0) — not visited;
//     Gray(1) — currently being visited(in the DFS stack);
//     Black(2) — fully processed;
// }

bool Scheduler::hasCycle(int taskId, unordered_map<int, int> &color)
{
    color[taskId] = 1;

    for (int depId : adjList[taskId])
    {
        if (color[depId] == 1)
            return true;

        if (color[depId] == 0 && hasCycle(depId, color))
            return true;
    }

    color[taskId] = 2;

    return false;
}

bool Scheduler::addDependency(int taskId, int dependsOnId)
{
    if (taskMap.find(taskId) == taskMap.end())
        return false;
    if (taskMap.find(dependsOnId) == taskMap.end())
        return false;

    adjList[taskId].push_back(dependsOnId);

    unordered_map<int, int> color;

    for (auto &pair : taskMap)
    {
        color[pair.first] = 0;
    }

    if (hasCycle(taskId, color))
    {
        adjList[taskId].pop_back();
        return false;
    }

    taskMap.at(taskId).dependencies.push_back(dependsOnId);

    return true;
}

bool Scheduler::completeTask(int taskId)
{
    if (taskMap.find(taskId) == taskMap.end())
        return false;

    for (int depId : adjList[taskId])
    {
        if (!taskMap.at(depId).completed)
            return false;
    }

    taskMap.at(taskId).completed = true;

    return true;
}

bool Scheduler::deleteTask(int taskId)
{
    if (taskMap.find(taskId) == taskMap.end())
        return false;

    for (auto &pair : adjList)
    {
        for (int depId : pair.second)
        {
            if (depId == taskId)
                return false;
        }
    }

    adjList.erase(taskId);
    taskMap.erase(taskId);

    priority_queue<Task, vector<Task>, TaskComparator> newQueue;
    priority_queue<Task, vector<Task>, TaskComparator> temp = tasks;

    while (!temp.empty())
    {
        Task t = temp.top();
        temp.pop();

        if (t.id != taskId)
            newQueue.push(t);
    }

    tasks = newQueue;

    return true;
}

Task *Scheduler::getTaskById(int taskId)
{
    if (taskMap.find(taskId) == taskMap.end())
        return NULL;

    return &taskMap.at(taskId);
}

vector<Task> Scheduler::getAllTasks()
{
    vector<Task> allTasks;
    priority_queue<Task, vector<Task>, TaskComparator> temp = tasks;

    while (!temp.empty())
    {
        Task t = temp.top();
        temp.pop();

        t.completed = taskMap.at(t.id).completed;
        t.dependencies = taskMap.at(t.id).dependencies;

        allTasks.push_back(t);
    }

    return allTasks;
}

bool Scheduler::removeDependency(int taskId, int dependsOnId)
{
    if (taskMap.find(taskId) == taskMap.end())
        return false;
    if (taskMap.find(dependsOnId) == taskMap.end())
        return false;

    auto &deps = adjList[taskId];
    auto it = find(deps.begin(), deps.end(), dependsOnId);

    deps.erase(it);

    auto &taskDeps = taskMap.at(taskId).dependencies;
    auto it2 = find(taskDeps.begin(), taskDeps.end(), dependsOnId);

    if (it2 != taskDeps.end())
        taskDeps.erase(it2);

    return true;
}

vector<Task> Scheduler::getSchedule()
{
    priority_queue<Task, vector<Task>, TaskComparator> temp = tasks;
    vector<Task> sorted;

    while (!temp.empty())
    {
        Task t = temp.top();
        temp.pop();

        t.completed = taskMap.at(t.id).completed;
        t.dependencies = taskMap.at(t.id).dependencies;

        bool depsCompleted = true;

        for (int depId : t.dependencies)
        {
            if (!taskMap.at(depId).completed)
            {
                depsCompleted = false;
                break;
            }
        }

        if (!t.completed && depsCompleted)
        {
            sorted.push_back(t);
        }
    }

    return sorted;
}