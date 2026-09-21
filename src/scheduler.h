#pragma once

#include <vector>
#include "task.h"

class Scheduler
{
private:
    std::vector<Task> tasks;
    int nextId;

public:
    Scheduler();
    void addTask(std::string name, int priority);
    std::vector<Task> getSchedule();
};