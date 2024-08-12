import { UserButton } from "@clerk/nextjs";
import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-10 w-full p-4 backdrop-blur-2xl shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* App Name */}
        <div className="text-2xl blue-text-gradient font-bold">
          Task Manager
        </div>

        {/* User Button */}
        <div className="flex items-center space-x-4">
          <div>
            <ThemeSwitcher />
          </div>
          <button className="px-4 py-2 rounded bg-white text-black dark:bg-black dark:text-white">
            <UserButton />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
