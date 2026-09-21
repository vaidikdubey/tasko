#pragma once // Telling compiler to read this file only once even if multiple imports are +nt

#include <string>

struct Task
{
    int id;
    std::string name;
    int priority;
    bool completed;

    Task(int id, std::string name, int priority);
};