"use client";
import React from "react";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  PointElement,
} from "chart.js";
import useTaskStore from "@/store/store";
import { priorityColor, statusColor } from "@/constants";
import { CalendarIcon } from "@heroicons/react/24/outline";
import moment from "moment/moment";

// const statusColor = {
//   "To do": "bg-gray-200 text-gray-700",
//   Doing: "bg-blue-200 text-blue-700",
//   Done: "bg-green-200 text-green-700",
// };

ChartJS.register(
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  PointElement
);

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
    (task) => new Date(task.dueDate) >= new Date()
  );
  const highPriorityTasks = tasks.filter((task) => task.priority === "High");

  const overdueTasks = tasks.filter(
    (task) => new Date(task.dueDate) < new Date() && task.status !== "Done"
  );

  const lineData = {
    labels: tasks.map((task) => moment(task.dueDate).format("MMM D")), // X-axis labels (dates)
    datasets: [
      {
        label: "Tasks Completed",
        data: tasks.map((task) => (task.status === "Done" ? 1 : 0)),
        borderColor: "#4caf50",
        backgroundColor: "#4caf50",
        fill: false,
      },
    ],
  };

  const lineOptions = {
    scales: {
      x: { title: { display: true, text: "Date" } },
      y: {
        title: { display: true, text: "Tasks Completed" },
        beginAtZero: true,
      },
    },
  };

  // Example data for Bar graph (task count by priority)
  const barData = {
    labels: ["High", "Medium", "Low"], // Priority levels
    datasets: [
      {
        label: "Task Count",
        data: [
          tasks.filter((task) => task.priority === "High").length,
          tasks.filter((task) => task.priority === "Medium").length,
          tasks.filter((task) => task.priority === "Low").length,
        ],
        backgroundColor: ["#f44336", "#ff9800", "#4caf50"],
      },
    ],
  };
  const barOptions = {
    scales: {
      x: { title: { display: true, text: "Priority" } },
      y: { title: { display: true, text: "Task Count" }, beginAtZero: true },
    },
  };

  const getPercentage = (val) => {
    if (total === 0) return 0;

    return ((val / total) * 100).toFixed(2);
  };
  const taskStatuses = [
    {
      title: "Completed",
      data: [completed, total - completed],
      backgroundColor: ["#4caf50", "#e0e0e0"],
      value: completed,
      labelSize: "text-sm",
    },
    {
      title: "To Do",
      data: [pending, total - pending],
      backgroundColor: ["#ff9800", "#e0e0e0"],
      value: pending,
      labelSize: "text-xs",
    },
    {
      title: "Doing",
      data: [doing, total - doing],
      backgroundColor: ["#2196f3", "#e0e0e0"],
      value: doing,
      labelSize: "text-xs",
    },
  ];
  const overview = [
    {
      id: 1,
      labels: ["Completed", "Doing", "Todo"],
      data: [completed, doing, pending],
      backgroundColor: ["#4caf50", "#2196f3", "#ff9800"],
    },
  ];
  const distribution = [
    {
      id: 1,
      label: "To Do",
      percentage: getPercentage(pending),
    },
    {
      id: 2,
      label: "Doing",
      percentage: getPercentage(doing),
    },
    {
      id: 3,
      label: "Completed",
      percentage: getPercentage(completed),
    },
  ];
  return (
    <div className="pb-20 max-w-[90vw] mx-auto">
      <h1 className="text-4xl font-medium my-3">Dashboard</h1>
      {/* <section className="flex flex-row flex-wrap gap-4 mb-4"> */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div
          id="task-statuses"
          className="p-4 bg-lightCard dark:bg-darkCard rounded-lg shadow-lg"
        >
          <div className="title flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Task Status Overview</h2>
            <span className="text-right">Total Tasks: {total}</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            {taskStatuses.map((status, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="h-32 w-32">
                  <Doughnut
                    data={{
                      labels: [status.title, "Others"],
                      datasets: [
                        {
                          data: status.data,
                          backgroundColor: status.backgroundColor,
                        },
                      ],
                    }}
                    options={{
                      maintainAspectRatio: false,
                      cutout: "80%",
                      radius: "50",
                      plugins: {
                        legend: {
                          display: false,
                        },
                      },
                    }}
                  />
                </div>
                <h4 className="text-sm">{status.title}</h4>
                <p className="text-xl">{status.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          id="overview"
          className="p-4 bg-lightCard dark:bg-darkCard rounded-lg shadow-xl "
        >
          <div className="title flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Tasks Comparison</h2>
            {/* <span className="text-right">Total Tasks: {total}</span> */}
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="h-50 w-40">
              {overview.map((item) => (
                <Pie
                  key={item.id}
                  data={{
                    labels: item.labels,
                    datasets: [
                      {
                        data: item.data,
                        backgroundColor: item.backgroundColor,
                      },
                    ],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    // cutout: "50%",
                    // radius: "70",
                    plugins: {
                      legend: {
                        display: false,
                      },
                    },
                  }}
                />
              ))}
            </div>
            <div></div>
            <div className="flex flex-col gap-3">
              {overview[0].labels.map((labelName, index) => (
                <div
                  key={labelName}
                  className="flex items-center justify-between gap-4 border border-x-0 border-t-0 pb-2"
                >
                  <p className="text-sm">{labelName}</p>
                  <span
                    style={{
                      backgroundColor: overview[0].backgroundColor[index],
                    }}
                    className={`w-3 h-3 rounded-full`}
                  ></span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div
          id="tasks-percentage"
          className="p-4 bg-lightCard dark:bg-darkCard rounded-lg shadow-lg"
        >
          <div className="title flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Tasks Distrubution</h2>
            {/* <span className="text-right">Total Tasks: {total}</span> */}
          </div>
          <div className="flex flex-col">
            {distribution.map(({ label, percentage }) => (
              <>
                <div className="py-3 flex items-center justify-between gap-20 border border-dashed border-0 border-b">
                  <p className="text-sm">{label}</p> <span>{percentage}%</span>
                </div>
              </>
            ))}
          </div>
        </div>
      </section>

      {/* Line Chart for Task Completion Over Time */}
      <section className="grid md:grid-cols-2 gap-4 mb-4">
        <div
          id="task-completion-line"
          className="p-4 bg-lightCard dark:bg-darkCard rounded-lg shadow-lg"
        >
          <div className="title flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Task Completion Over Time</h2>
          </div>
          <div className="h-64">
            <Line data={lineData} options={lineOptions} />
          </div>
        </div>

        {/* Bar Chart for Task Count by Priority */}
        <div
          id="task-priority-bar"
          className="p-4 bg-lightCard dark:bg-darkCard rounded-lg shadow-lg"
        >
          <div className="title flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Task Count by Priority</h2>
          </div>
          <div className="h-64">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </section>

      {/* <section className="flex flex-wrap gap-4"> */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-4 bg-lightCard dark:bg-darkCard rounded-lg shadow-xl ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-md font-semibold">
              <span className="red-text-gradien">High Priority </span>Tasks
            </h2>
          </div>
          {highPriorityTasks.length === 0 ? (
            <p className="text-gray-500 text-center">No high-priority tasks</p>
          ) : (
            <div className="max-h-[350px] overflow-y-auto w-full">
              {highPriorityTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-2 border-b border-gray-200 dark:border-gray-900 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-md font-normal">{task.title}</span>
                    <span
                      className={`py-1 text-right ${
                        priorityColor[task.priority]
                      } text-sm font-medium text-white rounded-full`}
                    >
                      {task.priority}
                    </span>
                  </div>
                  <p
                    title={task.description}
                    className="text-xs text-gray-600 max-w-[90%] truncate"
                  >
                    {task.description}
                  </p>
                  {/* <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">DUE: <span><CalendarIcon height={15} /></span>{task.dueDate}</p> */}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white p-4 bg-lightCard dark:bg-darkCard rounded-lg shadow-xl ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-md font-semibold">
              <span className="red-text-gradien">Upcoming </span>Tasks
            </h2>
          </div>
          {upcomingTasks.length === 0 ? (
            <p className="text-gray-500 text-center">No upcoming tasks</p>
          ) : (
            <div className="max-h-[350px] overflow-y-auto no-scrollbar">
              {upcomingTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-2 border-b border-gray-200 dark:border-gray-900 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between gap-12">
                    <span className="text-md font-normal">{task.title}</span>
                    <span
                      className={`py-1 px-2 ${
                        statusColor[task.status]
                      } text-xs font-medium rounded-full`}
                    >
                      {task.status}
                    </span>
                  </div>
                  {/* <p className="text-xs text-gray-600">{task.description}</p> */}
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
                    <span>
                      <CalendarIcon height={15} />
                    </span>
                    {moment(task.dueDate).format("D MMM, YYYY")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white p-4 bg-lightCard dark:bg-darkCard rounded-lg shadow-xl ">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-md font-semibold">
              <span className="red-text-gradien">Overdue </span>Tasks
            </h2>
          </div>
          {overdueTasks.length === 0 ? (
            <p className="text-gray-500 text-center">No upcoming tasks</p>
          ) : (
            <div className="max-h-[350px] overflow-y-auto no-scrollbar">
              {overdueTasks.map((task) => (
                <div
                  key={task.id}
                  className="p-2 border-b border-gray-200 dark:border-gray-900 flex flex-col gap-1"
                >
                  <div className="flex items-center justify-between gap-12">
                    <span className="text-md font-normal">{task.title}</span>
                    <span
                      className={`py-1 px-2 ${
                        statusColor[task.status]
                      } text-xs font-medium rounded-full`}
                    >
                      {task.status}
                    </span>
                  </div>
                  {/* <p className="text-xs text-gray-600">{task.description}</p> */}
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
                    <span>
                      <CalendarIcon height={15} />
                    </span>
                    {moment(task.dueDate).format("D MMM, YYYY")}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
