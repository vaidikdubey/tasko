#include "scheduler.h"

using namespace std;

Scheduler::Scheduler()
{
    nextId = 1;
}

void Scheduler::addTask(string name, int priority) // O(logN)
{
    Task task(nextId++, name, priority);
    tasks.push(task);
}

vector<Task> Scheduler::getSchedule() // O(NlogN)
{
    priority_queue<Task, vector<Task>, TaskComparator> temp = tasks;
    vector<Task> sorted;

    while (!temp.empty()) // O(NlogN -> due to popping N elements)
    {
        sorted.push_back(temp.top()); // O(1)
        temp.pop();                   // O(logN)
    }

    return sorted;
}