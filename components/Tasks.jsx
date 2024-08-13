"use client";
import React, { useState, useMemo } from "react";
import TaskCard from "./TaskCard";
import useTaskStore from "@/store/store";
import { debounce } from "lodash";

const Tasks = () => {
  const { tasks, updateTaskStatus } = useTaskStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  const debouncedSetSearchQuery = useMemo(
    () => debounce(setSearchQuery, 300),
    []
  );

  // Filters
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesQuery =
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter ? task.status === statusFilter : true;
      const matchesPriority = priorityFilter
        ? task.priority === priorityFilter
        : true;
      return matchesQuery && matchesStatus && matchesPriority;
    });
  }, [tasks, searchQuery, statusFilter, priorityFilter]);

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-4xl  font-bold">Tasks</h1>
      </header>

      {/* Filters */}
      <div className=" p-3 md:sticky top-[56px] backdrop-blur-xl z-20 flex flex-col md:flex-row  gap-4 mb-8">
        <input
          type="text"
          placeholder="Search tasks..."
          onChange={(e) => debouncedSetSearchQuery(e.target.value)}
          className="p-2 flex-1 bg-lightBg dark:bg-darkBg border-gray-300 border dark:border-gray-700 rounded outline-none"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border bg-lightBg dark:bg-darkBg border-gray-300 dark:border-gray-700 rounded"
        >
          <option value="">All Status</option>
          <option value="To do">To do</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="p-2 bg-lightBg dark:bg-darkBg border border-gray-300 dark:border-gray-700 rounded"
        >
          <option value="">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="flex flex-wrap space-y-4">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            updateTaskStatus={updateTaskStatus}
          />
        ))}
        {filteredTasks?.length === 0 && (
          <div className="text-center w-full mt-8">No tasks to show</div>
        )}
      </div>
    </>
  );
};

export default Tasks;
