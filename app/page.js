import Tasks from "@/components/Tasks";
import ThemeSwitcher from "@/components/ThemeSwitcher";

import { PlusIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <>
      <ThemeSwitcher />
      <div className="min-h-screen  max-w-[70vw] mx-auto p-4 pb-24">
        <Tasks />
        <button
          className="fixed bottom-24 right-4 p-4 bg-blue-900 text-white rounded-full shadow-lg flex items-center justify-center transition-transform transform hover:scale-110"
          aria-label="Add Task"
        >
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
    </>
  );
}
