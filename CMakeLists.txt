cmake_minimum_required(VERSION 3.10)
project(tasko)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

add_executable(tasko
    src/main.cpp
    src/task.cpp
    src/scheduler.cpp
)