"use client";

import React from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const SettingsPage = () => {
  return (
    <div className="w-full max-w-md mx-auto p-6 rounded bg-gray-200 dark:bg-gray-900 mb-20">
      <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
        Settings
      </h1>

      <div className="space-y-4">
        {/* Account Section */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-4 flex items-center justify-between border-b border-gray-300 dark:border-gray-700">
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              Account
            </span>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700 dark:text-gray-300">Profile</span>
              <button className="text-blue-500 dark:text-blue-400">Edit</button>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700 dark:text-gray-300">Privacy</span>
              <button className="text-blue-500 dark:text-blue-400">Edit</button>
            </div>
          </div>
        </div>

        {/* Notifications Section */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-4 flex items-center justify-between border-b border-gray-300 dark:border-gray-700">
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              Notifications
            </span>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700 dark:text-gray-300">Messages</span>
              <button className="text-blue-500 dark:text-blue-400">
                Manage
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700 dark:text-gray-300">Groups</span>
              <button className="text-blue-500 dark:text-blue-400">
                Manage
              </button>
            </div>
          </div>
        </div>

        {/* Appearance Section */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-4 flex items-center justify-between border-b border-gray-300 dark:border-gray-700">
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              Appearance
            </span>
            <ThemeSwitcher />
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700 dark:text-gray-300">Theme</span>
              <button className="text-blue-500 dark:text-blue-400">
                Choose
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700 dark:text-gray-300">
                Font Size
              </span>
              <button className="text-blue-500 dark:text-blue-400">
                Adjust
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-4 flex items-center justify-between border-b border-gray-300 dark:border-gray-700">
            <span className="text-gray-900 dark:text-gray-100 font-medium">
              About
            </span>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700 dark:text-gray-300">Version</span>
              <span className="text-gray-500 dark:text-gray-400">1.0.0</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-700 dark:text-gray-300">
                Help & Support
              </span>
              <button className="text-blue-500 dark:text-blue-400">
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
