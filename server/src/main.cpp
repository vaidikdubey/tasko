#include <iostream>
#include "scheduler.h"
#include "server.h"

using namespace std;

int main()
{
    Scheduler scheduler;
    Server server(scheduler);

    cout << "Starting Tasko..." << endl;
    server.start(8080);

    return 0;
}