#include <iostream>
#include "scheduler.h"

using namespace std;

void printSchedule(Scheduler &scheduler)
{
    vector<Task> schedule = scheduler.getSchedule();

    if (schedule.empty())
    {
        cout << "No tasks available to schedule." << endl;
        return;
    }

    cout << "\nAvailable tasks (priority order):" << endl;
    cout << "-----------------------------------" << endl;
    for (const Task &task : schedule)
    {
        cout << "[" << task.id << "] " << task.name
             << " (priority: " << task.priority << ")" << endl;
    }
}

int main()
{
    Scheduler scheduler;

    // Add tasks
    scheduler.addTask("Design database schema", 3); // id 1
    scheduler.addTask("Fix login bug", 5);          // id 2
    scheduler.addTask("Write unit tests", 2);       // id 3
    scheduler.addTask("Deploy to production", 4);   // id 4
    scheduler.addTask("Write documentation", 1);    // id 5

    cout << "=== Initial Schedule ===" << endl;
    printSchedule(scheduler);

    // Add dependencies
    // Deploy depends on Fix login bug
    scheduler.addDependency(4, 2);
    // Deploy depends on Design database schema
    scheduler.addDependency(4, 1);
    // Write unit tests depends on Fix login bug
    scheduler.addDependency(3, 2);

    cout << "\n=== After Adding Dependencies ===" << endl;
    cout << "Deploy(4) depends on Fix login bug(2) and Design schema(1)" << endl;
    cout << "Unit tests(3) depends on Fix login bug(2)" << endl;
    printSchedule(scheduler);

    // Test cycle detection
    cout << "\n=== Testing Cycle Detection ===" << endl;
    bool cycleResult = scheduler.addDependency(2, 4);
    cout << "Adding dependency 2->4 (would create cycle): "
         << (cycleResult ? "Allowed" : "Blocked - cycle detected") << endl;

    // Complete a task
    cout << "\n=== Completing Tasks ===" << endl;
    bool completed = scheduler.completeTask(2);
    cout << "Completing Fix login bug(2): "
         << (completed ? "Done" : "Failed - dependencies not met") << endl;

    cout << "\n=== Schedule After Completing Fix login bug ===" << endl;
    printSchedule(scheduler);

    // Complete another
    scheduler.completeTask(1);
    cout << "Completing Design database schema(1)" << endl;

    cout << "\n=== Schedule After Completing Design schema ===" << endl;
    printSchedule(scheduler);

    return 0;
}