#include "server.h"
#include <iostream>

using namespace std;

Server::Server(Scheduler &scheduler) : scheduler(scheduler) {}

void Server::start(int port)
{
    app.Options(".*", [](const httplib::Request &req, httplib::Response &res)
                { 
                    res.set_header("Access-Control-Allow-Origin", "*");
                    res.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                    res.set_header("Access-Control-Allow-Headers", "Content-Type");
                    res.status = 204; });

    auto setCORS = [](httplib::Response &res)
    {
        res.set_header("Access-Control-Allow-Origin", "*");
        res.set_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        res.set_header("Access-Control-Allow-Headers", "Content-Type");
    };

    // GET /tasks - get all scheduled tasks
    app.Get("/tasks", [this, setCORS](const httplib::Request &req, httplib::Response &res)
            {
        setCORS(res);
        json response = json::array();

        for (const Task& task : scheduler.getSchedule()) {
            response.push_back({
                {"id", task.id},
                {"name", task.name},
                {"priority", task.priority},
                {"completed", task.completed},
                {"dependencies", task.dependencies}
            });
        }

        res.set_content(response.dump(), "application/json"); });

    // GET /tasks/all - get all tasks regardless of status
    app.Get("/tasks/all", [this, setCORS](const httplib::Request &req, httplib::Response &res)
            { 
        setCORS(res);
        json response = json::array();
        
        for(const Task &task: scheduler.getAllTasks()) {
            response.push_back({{"id", task.id},
                            {"name", task.name},
                            {"priority", task.priority},
                            {"completed", task.completed},
                            {"dependencies", task.dependencies}});
        } 
                
        res.set_content(response.dump(), "application/json"); });

    // GET /tasks/:id - get single task
    app.Get("/tasks/:id", [this, setCORS](const httplib::Request &req, httplib::Response &res)
            {
        setCORS(res);
        int taskId = stoi(req.path_params.at("id"));
        Task* task = scheduler.getTaskById(taskId);

        if (task == nullptr) {
            res.status = 404;
            res.set_content(
                json{{"error", "Task not found"}}.dump(),
                "application/json"
            );
            return;
        }

        json response = {
            {"id", task->id},
            {"name", task->name},
            {"priority", task->priority},
            {"completed", task->completed},
            {"dependencies", task->dependencies}
        };

        res.set_content(response.dump(), "application/json"); });

    // DELETE - /tasks/dependency - remove a dependency
    app.Delete("/tasks/dependency", [this, setCORS](const httplib::Request &req, httplib::Response &res)
               {
        setCORS(res);
        try {
            json body = json::parse(req.body);

            if (!body.contains("taskId") || !body.contains("dependsOnId")) {
                res.status = 400;
                res.set_content(
                    json{{"error", "taskId and dependsOnId are required"}}.dump(),
                    "application/json"
                );
                return;
            }

            int taskId = body["taskId"];
            int dependsOnId = body["dependsOnId"];
            bool success = scheduler.removeDependency(taskId, dependsOnId);

            if (!success) {
                res.status = 400;
                res.set_content(
                    json{{"error", "Dependency not found"}}.dump(),
                    "application/json"
                );
                return;
            }

            res.set_content(
                json{{"message", "Dependency removed successfully"}}.dump(),
                "application/json"
            );
            } catch (exception& e) {
                res.status = 400;
                res.set_content(
                    json{{"error", "Invalid JSON"}}.dump(),
                    "application/json"
                );
            } });

    // POST /tasks - add a new task
    app.Post("/tasks", [this, setCORS](const httplib::Request &req, httplib::Response &res)
             {
        setCORS(res);
        try {
            json body = json::parse(req.body);

            if (!body.contains("name") || !body.contains("priority")) {
                res.status = 400;
                res.set_content(
                    json{{"error", "name and priority are required"}}.dump(),
                    "application/json"
                );
                return;
            }

            string name = body["name"];
            int priority = body["priority"];
            scheduler.addTask(name, priority);

            res.status = 201;
            res.set_content(
                json{{"message", "Task added successfully"}}.dump(),
                "application/json"
            );
        } catch (exception& e) {
            res.status = 400;
            res.set_content(
                json{{"error", "Invalid JSON"}}.dump(),
                "application/json"
            );
        } });

    // POST /tasks/dependency - add dependency between tasks
    app.Post("/tasks/dependency", [this, setCORS](const httplib::Request &req, httplib::Response &res)
             {
        setCORS(res);
        try {
            json body = json::parse(req.body);

            if (!body.contains("taskId") || !body.contains("dependsOnId")) {
                res.status = 400;
                res.set_content(
                    json{{"error", "taskId and dependsOnId are required"}}.dump(),
                    "application/json"
                );
                return;
            }

            int taskId = body["taskId"];
            int dependsOnId = body["dependsOnId"];
            bool success = scheduler.addDependency(taskId, dependsOnId);

            if (!success) {
                res.status = 400;
                res.set_content(
                    json{{"error", "Invalid dependency - either task not found or creates a cycle"}}.dump(),
                    "application/json"
                );
                return;
            }

            res.set_content(
                json{{"message", "Dependency added successfully"}}.dump(),
                "application/json"
            );
        } catch (exception& e) {
            res.status = 400;
            res.set_content(
                json{{"error", "Invalid JSON"}}.dump(),
                "application/json"
            );
        } });

    // PATCh /tasks/:id/complete - mark task as complete
    app.Patch("/tasks/:id/complete", [this, setCORS](const httplib::Request &req, httplib::Response &res)
              {
        setCORS(res);
        int taskId = stoi(req.path_params.at("id"));
        bool success = scheduler.completeTask(taskId);

        if (!success) {
            res.status = 400;
            res.set_content(
                json{{"error", "Cannot complete - task not found or dependencies not met"}}.dump(),
                "application/json"
            );
            return;
        }

        res.set_content(
            json{{"message", "Task completed successfully"}}.dump(),
            "application/json"
        ); });

    app.Delete("/tasks/:id", [this, setCORS](const httplib::Request &req, httplib::Response &res)
               { 
            setCORS(res);
            int taskId = stoi(req.path_params.at("id"));
            bool success = scheduler.deleteTask(taskId);

            if(!success) {
                res.status = 400;
                res.set_content(
                    json{
                        {"error", "Task not found or other tasks depend on it"}}
                        .dump(),
                    "application/json");
                return;
            }

            res.set_content(
                json{{"message", "Task deleted successfully"}}.dump(),
                "application/json"
            ); });

    cout << "Tasko server running on port " << port << endl;
    app.listen("0.0.0.0", port);
}