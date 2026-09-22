#pragma once // Telling compiler to read this file only once even if multiple imports are +nt

#include <string>
#include <vector>

struct Task
{
    int id;
    std::string name;
    int priority;
    bool completed;
    std::vector<int> dependencies;

    Task(int id, std::string name, int priority);
};