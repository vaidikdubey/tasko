cmake_minimum_required(VERSION 3.10)
project(tasko)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

include_directories(third_party)

find_package(Threads REQUIRED)

add_executable(tasko
    src/main.cpp
    src/task.cpp
    src/scheduler.cpp
    src/server.cpp
)

target_link_libraries(tasko Threads::Threads)