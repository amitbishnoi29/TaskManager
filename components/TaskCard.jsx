"use client";
import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import useTaskStore from "@/store/store";
import { CalendarIcon } from "@heroicons/react/24/outline";
import { priorityColor, statusColor } from "@/constants";

export default function TaskCard({
  id,
  title,
  dueDate,
  priority,
  description,
  status,
  onEdit,
  onDelete,
  updateTaskStatus,
}) {

  const handlers = useSwipeable({
    onSwipedLeft: () => setIsSwiped(true),
    onSwipedRight: () => setIsSwiped(false),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const [isSwiped, setIsSwiped] = useState(false);

  const handleCheckboxChange = (event) => {
    const newStatus = event.target.checked ? "Done" : "To do";
    updateTaskStatus(id, newStatus);
  };

  return (
    <div className="relative w-full bg-lightCard dark:bg-darkCard cursor-pointer overflow-hidden border shadow-lg rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl">
      <div
        className={`absolute inset-y-0 right-0 w-1/4 flex items-center transition-all duration-300 ease-in-out ${
          isSwiped ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={onEdit}
          className="text-white text-center w-1/2 h-full bg-blue-600 hover:text-gray-200 text-sm font-medium"
        >
          Edit
        </button>
        <button
          onClick={onDelete}
          className="text-white text-center w-1/2 h-full bg-red-500 hover:text-gray-200 text-sm font-medium"
        >
          Delete
        </button>
      </div>
      {/* Main content */}
      <div
        {...handlers}
        className={`relative p-4 transition-transform duration-300 ease-in-out ${
          isSwiped ? "-translate-x-1/4" : "translate-x-0"
        }`}
      >
        <div>
          <h3 className="text-xl font-semibold">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {description}
          </p>
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm flex items-center text-gray-500 dark:text-gray-400">
              <CalendarIcon className="h-5 w-5 mr-2" /> <span>{dueDate}</span>
            </p>
            <div className="mt-4 flex items-center gap-4">
              <h5 className="text-sm">
                {status === "Done" ? "Completed" : "Mark as Completed"}
              </h5>
              <input
                type="checkbox"
                checked={status === "Done"}
                onChange={handleCheckboxChange}
                className="h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-400"
              />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <div
              className={`py-1 ${priorityColor[priority]} text-sm font-medium text-white rounded-full`}
            >
              {priority} Priority
            </div>
            <div
              className={`py-1 px-2 ${statusColor[status]} text-sm font-medium rounded-full`}
            >
              {status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
