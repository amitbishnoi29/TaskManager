'use client'
import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';

export default function TaskCard({ title, dueDate, priority, description, onEdit, onDelete }) {
    const priorityColor = {
        High: 'bg-red-500',
        Medium: 'bg-yellow-500',
        Low: 'bg-green-500',
    };

    const handlers = useSwipeable({
        onSwipedLeft: () => setIsSwiped(true),
        onSwipedRight: () => setIsSwiped(false),
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
    });

    const [isSwiped, setIsSwiped] = useState(false);

    return (
        <div className="relative w-full cursor-pointer overflow-hidden p-4 border shadow-lg rounded-xl transition-transform transform hover:-translate-y-1 hover:shadow-xl">
            {/* Action buttons */}
            <div className={`absolute inset-0 border border flex items-center justify-end space-x-4 p-4 transition-all duration-300 ease-in-out ${isSwiped ? 'translate-x-0' : 'translate-x-full'}`}>
                <button onClick={onEdit} className="text-blue-500 hover:text-blue-700 text-sm font-medium">
                    Edit
                </button>
                <button onClick={onDelete} className="text-red-500 hover:text-red-700 text-sm font-medium">
                    Delete
                </button>
            </div>
            {/* Main content */}
            <div {...handlers} className={`relative transition-transform duration-300 ease-in-out ${isSwiped ? '-translate-x-1/4' : 'translate-x-0'}`}>
                <div className="">
                    <h3 className="text-xl font-semibold">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                        {description}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Due: {dueDate}
                        </p>
                        <div className={`px-2 py-1 ${priorityColor[priority]} text-xs font-medium text-white rounded-full`}>
                            {priority} Priority
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <input type="checkbox" className="h-5 w-5 text-blue-500 rounded border-gray-300 focus:ring-blue-400" />
                    </div>
                </div>
            </div>
        </div>
    );
}
