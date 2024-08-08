import TaskCard from "@/components/TaskCard";
import Tasks from "@/components/Tasks";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import Link from "next/link";
import { HomeIcon, ChartBarIcon, CogIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <>
      <ThemeSwitcher />
      <div className="min-h-screen max-w-[70vw] mx-auto p-4 pb-24">
        <Tasks />
        <button
          className="fixed bottom-20 text-lg right-4 p-4 bg-blue-500 text-white rounded-full"
          aria-label="Add Task"
        >
          +
        </button>
        <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-xl shadow-xl p-4 flex justify-around">
          <Link href="#" className="flex flex-col items-center text-blue-500">
            <HomeIcon className="h-6 w-6" />
            <span>Home</span>
          </Link>
          <Link href="#" className="flex flex-col items-center text-gray-500">
            <ChartBarIcon className="h-6 w-6" />
            <span>Dashboard</span>
          </Link>
          <Link href="#" className="flex flex-col items-center text-gray-500">
            <CogIcon className="h-6 w-6" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>
    </>
  );
}
