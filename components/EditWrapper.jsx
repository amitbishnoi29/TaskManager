"use client";

import useTaskStore from "@/store/store";
import TaskForm from "./TaskForm";
import { useEffect, useState } from "react";

const EditWrapper = ({ id }) => {
  const { tasks } = useTaskStore();
  const [mounted, setMounted] = useState(false);
  const task = tasks?.filter((task) => task.id == id);

  useEffect(() => {
    if(window)
    setMounted(true);
  }, []);

  if (!mounted) return null;
  if (task) {
    return <TaskForm task={task[0]} />;
  }
};

export default EditWrapper;
