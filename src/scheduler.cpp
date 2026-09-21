#include "scheduler.h"
#include <algorithm>

using namespace std;

Scheduler::Scheduler()
{
    nextId = 1;
}

void Scheduler::addTask(string name, int priority)
{
    Task task(nextId++, name, priority);
    tasks.push_back(task);
}

vector<Task> Scheduler::getSchedule()
{
    vector<Task> sorted = tasks;

    sort(sorted.begin(), sorted.end(), [](const Task &a, const Task &b)
         { return a.priority > b.priority; });

    return sorted;
}