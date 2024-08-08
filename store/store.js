
import { create } from 'zustand';
import { taskData } from '../data/tasks';

const useTaskStore = create((set) => ({
    tasks: taskData,
    addTask: (newTask) => set((state) => ({
        tasks: [...state.tasks, { ...newTask, id: state.tasks.length + 1 }]
    })),

    editTask: (updatedTask) => set((state) => ({
        tasks: state.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
        )
    })),

    deleteTask: (taskId) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId)
    }))
}));

export default useTaskStore;
