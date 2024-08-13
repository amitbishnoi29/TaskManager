import { UserButton } from "@clerk/nextjs";
import React from "react";
import ThemeSwitcher from "./ThemeSwitcher";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-10 w-full p-2 backdrop-blur-2xl shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* App Name */}
        <Link href='/' className="text-2xl blue-text-gradient font-bold">
          Task Manager
        </Link>

        {/* User Button */}
        <div className="flex items-center space-x-4">
          <div>
            <ThemeSwitcher />
          </div>
          {/* <button className="px-4 py-2 rounded bg-lightBg text-black dark:bg-darkBg "> */}
            <UserButton />
          {/* </button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
