"use client";
import React from "react";
import TaskCard from "./TaskCard";
import useTaskStore from "@/store/store";

const Tasks = () => {
  const { tasks, updateTaskStatus } = useTaskStore();
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-4xl py-4 font-bold">
          Tasks
        </h1>
      </header>
      <div>
        <input
          type="text"
          placeholder="Search tasks..."
          className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded"
        />
        <div className=" flex flex-wrap space-y-4">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              {...task}
              updateTaskStatus={updateTaskStatus}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Tasks;
