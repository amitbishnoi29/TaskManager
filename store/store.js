import { create } from 'zustand';
import { taskData } from '../data/tasks';

const useTaskStore = create((set) => ({
    tasks: taskData,
    addTask: (newTask) => set((state) => ({
        tasks: [{ ...newTask},...state.tasks]
    })),
    editTask: (updatedTask) => set((state) => ({
        tasks: state.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
        )
    })),
    deleteTask: (taskId) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId)
    })),
    updateTaskStatus: (taskId, status) => set((state) => ({
        tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status } : task
        )
    }))
}));

export default useTaskStore;
