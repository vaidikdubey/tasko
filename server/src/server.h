#pragma once

#include "scheduler.h"
#include "httplib.h"
#include "json.hpp"

using json = nlohmann::json;

class Server {
    private:
        Scheduler &scheduler;
        httplib::Server app;

    public:
        Server(Scheduler &scheduler);
        void start(int port);
};