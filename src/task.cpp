#include "task.h"

using namespace std;

Task::Task(int id, string name, int priority) {
    this->id = id;
    this->name = name;
    this->priority = priority;
    this->completed = false;
}