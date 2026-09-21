#include <iostream>
#include "scheduler.h"

using namespace std;

int main() {
    Scheduler scheduler;

    scheduler.addTask("Design database schema", 3);
    scheduler.addTask("Fix login bug", 5);
    scheduler.addTask("Write unit tests", 2);
    scheduler.addTask("Deploy to production", 4);

    vector<Task> schedule = scheduler.getSchedule();

    cout << "Scheduled tasks (highest priority first): " << endl;
    cout << "------------------------------------------" << endl;

    for (const Task &task: schedule) {
        cout << "[" << task.id << "]" << task.name
             << "(priority: " << task.priority << ")" << endl;
    }

    return 0;
}