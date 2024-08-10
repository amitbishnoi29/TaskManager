"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from "chart.js";
import useTaskStore from "@/store/store";

ChartJS.register(Tooltip, Legend, ArcElement);

const Dashboard = () => {
  const { tasks } = useTaskStore();

  const getTaskStats = () => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === "Done").length;
    const doing = tasks.filter((task) => task.status === "Doing").length;
    const pending = tasks.filter((task) => task.status === "To do").length;

    return { completed, doing, pending, total };
  };

  const { completed, doing, pending, total } = getTaskStats();

  const upcomingTasks = tasks.filter(
    (task) => new Date(task.dueDate) >= new Date() && task.status !== "Done"
  );
  const highPriorityTasks = tasks.filter((task) => task.priority === "High");

  return (
    <div className="pb-20">
      <div className="columns-3">
        <div className="p-4 rounded-lg shadow-md flex flex-col w-full gap-4">
          <h2 className="text-xl font-semibold mb-4">Task Status Overview</h2>
          <div className="flex flex-wrap gap-4">
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-medium mb-2">Completed vs Total</h3>
              <Doughnut
                data={{
                  labels: ["Completed", "Remaining"],
                  datasets: [
                    {
                      data: [completed, total - completed],
                      backgroundColor: ["#4caf50", "#e0e0e0"],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: true,
                }}
                className="w-32 h-32"
              />
            </div>
            <div className="flex flex-col items-center flex-1">
              <h3 className="text-sm font-medium mb-2">To Do vs Others</h3>
              <Doughnut
                data={{
                  labels: ["To Do", "Others"],
                  datasets: [
                    {
                      data: [pending, total - pending],
                      backgroundColor: ["#ff9800", "#e0e0e0"],
                    },
                  ],
                }}
                options={{ maintainAspectRatio: true }}
                className="w-32 h-32"
              />
            </div>
            <div className="flex flex-col items-center flex-1 min-w-[120px]">
              <h3 className="text-sm font-medium mb-2">Doing vs Others</h3>
              <Doughnut
                data={{
                  labels: ["Doing", "Others"],
                  datasets: [
                    {
                      data: [doing, total - doing],
                      backgroundColor: ["#2196f3", "#e0e0e0"],
                    },
                  ],
                }}
                options={{ maintainAspectRatio: true }}
                className="w-32 h-32"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-md w-full min-h-[300px]">
          <h2 className="text-xl font-semibold mb-4">Upcoming Tasks</h2>
          <div className="max-h-[calc(100vh-200px)] overflow-y-auto">
            {upcomingTasks.length === 0 ? (
              <p className="text-gray-500">No upcoming tasks</p>
            ) : (
              upcomingTasks.map((task) => (
                <div key={task.id} className="p-2 border-b border-gray-200">
                  <h3 className="text-md font-medium">{task.title}</h3>
                  <p className="text-sm text-gray-500">{task.dueDate}</p>
                </div>
              ))
            )}
          </div>
        </div>

    
        <div className="bg-white p-4 rounded-lg shadow-md w-full min-h-[300px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">High Priority Tasks</h2>
            <p className="red-text-gradient">High Priority</p>
          </div>
          {highPriorityTasks.length === 0 ? (
            <p className="text-gray-500">No high-priority tasks</p>
          ) : (
            highPriorityTasks.map((task) => (
              <div key={task.id} className="p-2 border-b border-gray-200">
                <h3 className="text-lg font-medium">{task.title}</h3>
                <p className="text-sm text-gray-500">{task.dueDate}</p>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
      {/* <div className="columns-4">
        <div class="box">
          <div className="p-4 rounded-lg shadow-md gap-4">
            <h2 className="text-xl font-semibold mb-4">Task Status Overview</h2>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <h3 className="text-sm font-medium mb-2">Completed vs Total</h3>

                <div className="h-40">
                  <Doughnut
                    data={{
                      labels: ["Completed", "Remaining"],
                      datasets: [
                        {
                          data: [completed, total - completed],
                          backgroundColor: ["#4caf50", "#e0e0e0"],
                        },
                      ],
                    }}
                    options={{
                      maintainAspectRatio: true,
                    }}
                    className="w-32 h-32"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center flex-1 min-w-[120px]">
                <h3 className="text-sm font-medium mb-2">To Do vs Others</h3>
                <Doughnut
                  data={{
                    labels: ["To Do", "Others"],
                    datasets: [
                      {
                        data: [pending, total - pending],
                        backgroundColor: ["#ff9800", "#e0e0e0"],
                      },
                    ],
                  }}
                  options={{ maintainAspectRatio: true }}
                  className="w-32 h-32"
                />
              </div>
              <div className="flex flex-col items-center flex-1 min-w-[120px]">
                <h3 className="text-sm font-medium mb-2">Doing vs Others</h3>
                <Doughnut
                  data={{
                    labels: ["Doing", "Others"],
                    datasets: [
                      {
                        data: [doing, total - doing],
                        backgroundColor: ["#2196f3", "#e0e0e0"],
                      },
                    ],
                  }}
                  options={{ maintainAspectRatio: true }}
                  className="w-32 h-32"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="box">
          <div className="p-4 rounded-lg shadow-md gap-4">
            <h2 className="text-xl font-semibold mb-4">Task Status Overview</h2>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <h3 className="text-sm font-medium mb-2">Completed vs Total</h3>

                <div className="h-40">
                  <Doughnut
                    data={{
                      labels: ["Completed", "Remaining"],
                      datasets: [
                        {
                          data: [completed, total - completed],
                          backgroundColor: ["#4caf50", "#e0e0e0"],
                        },
                      ],
                    }}
                    options={{
                      maintainAspectRatio: true,
                    }}
                    className="w-32 h-32"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center flex-1 min-w-[120px]">
                <h3 className="text-sm font-medium mb-2">To Do vs Others</h3>
                <Doughnut
                  data={{
                    labels: ["To Do", "Others"],
                    datasets: [
                      {
                        data: [pending, total - pending],
                        backgroundColor: ["#ff9800", "#e0e0e0"],
                      },
                    ],
                  }}
                  options={{ maintainAspectRatio: true }}
                  className="w-32 h-32"
                />
              </div>
              <div className="flex flex-col items-center flex-1 min-w-[120px]">
                <h3 className="text-sm font-medium mb-2">Doing vs Others</h3>
                <Doughnut
                  data={{
                    labels: ["Doing", "Others"],
                    datasets: [
                      {
                        data: [doing, total - doing],
                        backgroundColor: ["#2196f3", "#e0e0e0"],
                      },
                    ],
                  }}
                  options={{ maintainAspectRatio: true }}
                  className="w-32 h-32"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="box">
        <div className="p-4 rounded-lg shadow-md gap-4">
          <h2 className="text-xl font-semibold mb-4">Task Status Overview</h2>
          <div className="flex gap-4">
            <div className="flex flex-col items-center">
              <h3 className="text-sm font-medium mb-2">Completed vs Total</h3>

             <div className="h-40">
             <Doughnut
                data={{
                  labels: ["Completed", "Remaining"],
                  datasets: [
                    {
                      data: [completed, total - completed],
                      backgroundColor: ["#4caf50", "#e0e0e0"],
                    },
                  ],
                }}
                options={{
                  maintainAspectRatio: true,
                }}
                className="w-32 h-32"
              />
             </div>
            </div>
            <div className="flex flex-col items-center flex-1 min-w-[120px]">
              <h3 className="text-sm font-medium mb-2">To Do vs Others</h3>
              <Doughnut
                data={{
                  labels: ["To Do", "Others"],
                  datasets: [
                    {
                      data: [pending, total - pending],
                      backgroundColor: ["#ff9800", "#e0e0e0"],
                    },
                  ],
                }}
                options={{ maintainAspectRatio: true }}
                className="w-32 h-32"
              />
            </div>
            <div className="flex flex-col items-center flex-1 min-w-[120px]">
              <h3 className="text-sm font-medium mb-2">Doing vs Others</h3>
              <Doughnut
                data={{
                  labels: ["Doing", "Others"],
                  datasets: [
                    {
                      data: [doing, total - doing],
                      backgroundColor: ["#2196f3", "#e0e0e0"],
                    },
                  ],
                }}
                options={{ maintainAspectRatio: true }}
                className="w-32 h-32"
              />
            </div>
          </div>
          <h3>sdfsf</h3>
        <h3>sdfsf</h3>
        <h3>sdfsf</h3>
        </div>
        
        </div>
        <div class="box">
          <p>Box 4</p>
          <p>Box 4</p>
          <p>Box 4</p>
          <p>Box 4</p>
          <p>Box 4</p>
          <p>Box 4</p>
          <p>Box 4</p>
        </div>
        <div class="box">
          <p>Box 5</p>
          <p>Box 5</p>
          <p>Box 5</p>
          <p>Box 5</p>
          <p>Box 5</p>
          <p>Box 5</p>
          <p>Box 5</p>
          <p>Box 5</p>
        </div>
        <div class="box">
          <p>Box 6</p>
          <p>Box 6</p>
          <p>Box 6</p>
          <p>Box 6</p>
          <p>Box 6</p>
        </div>
        <div class="box">
          <p>Box 7</p>
          <p>Box 7</p>
          <p>Box 7</p>
        </div>
        <div class="box">
          <p>Box 8</p>
          <p>Box 8</p>
          <p>Box 8</p>
          <p>Box 8</p>
          <p>Box 8</p>
          <p>Box 8</p>
          <p>Box 8</p>
        </div>
        <div class="box">
          <p>Box 9</p>
          <p>Box 9</p>
          <p>Box 9</p>
          <p>Box 9</p>
          <p>Box 9</p>
          <p>Box 9</p>
          <p>Box 9</p>
          <p>Box 9</p>
          <p>Box 9</p>
          <p>Box 9</p>
        </div>
        <div class="box">
          <p>Box 10</p>
          <p>Box 10</p>
          <p>Box 10</p>
          <p>Box 10</p>
          <p>Box 10</p>
        </div>
        <div class="box">
          <p>Box 11</p>
          <p>Box 11</p>
          <p>Box 11</p>
        </div>
        <div class="box">
          <p>Box 12</p>
          <p>Box 12</p>
          <p>Box 12</p>
          <p>Box 12</p>
          <p>Box 12</p>
          <p>Box 12</p>
          <p>Box 12</p>
        </div>
        <div class="box">
          <p>Box 13</p>
          <p>Box 13</p>
          <p>Box 13</p>
          <p>Box 13</p>
          <p>Box 13</p>
          <p>Box 13</p>
          <p>Box 13</p>
          <p>Box 13</p>
          <p>Box 13</p>
          <p>Box 13</p>
          <p>Box 13</p>
          <p>Box 13</p>
          <p>Box 13</p>
          <p>Box 13</p>
        </div>
      </div> */}
    </div>
  );
};

export default Dashboard;
