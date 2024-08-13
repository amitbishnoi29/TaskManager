
# Task Manager Application

## Overview

The **Task Manager Application** is a powerful and user-friendly web application designed to help users efficiently manage their tasks. Built using **Next.js 14**, this app features OTP authentication powered by **Clerk**, and provides an intuitive interface for adding, editing, and organizing tasks.

## Features

### 1. **Authentication**
- **Sign Up/Sign In with OTP:** Secure authentication using OTP verification powered by Clerk.

### 2. **Home Page**
- **Header:**
  - **Title:** "Task Manager"
  - **Search Bar:** Filter tasks based on keywords.
- **Task List:**
  - A scrollable list displaying tasks in a card format.
  - Each task card shows the title, due date, priority level (color-coded), and a checkbox to mark tasks as completed.
  - Swipe left on a task to reveal options for editing or deleting the task.
- **Floating Action Button (FAB):**
  - Positioned at the bottom-right corner to add new tasks.
  - **Icon:** "+"
- **Navigation Bar:**
  - Positioned at the bottom of the screen with icons and labels for **Home**, **Dashboard**, and **Settings**.

### 3. **Dashboard Page**
- **Header:**
  - **Title:** "Dashboard"
- **Task Statistics:**
  - Section displaying statistics for completed tasks, pending tasks, and task priority distribution.
  - Visual representations include pie charts, bar graphs, and line charts.
- **Upcoming Tasks:**
  - List of upcoming tasks with their due dates.
- **Performance Insights:**
  - Insights and suggestions based on user behavior and task completion trends.

### 4. **Add/Edit Task Screen**
- **Header:**
  - **Back Button:** Return to the previous screen.
  - **Title:** "Add Task" or "Edit Task" based on the action.
- **Form Fields:**
  - Input fields for the task title and description.
  - Date picker for selecting the due date.
  - Dropdown menu for choosing the priority level (High, Medium, Low).
  - Location selector with a map for setting location-based reminders.
- **Save Button:**
  - Positioned at the bottom of the form to save the task details.
  - **Icon:** "Save"

## Technology Stack

- **Framework:** [Next.js 14](https://nextjs.org/)
- **Authentication:** [Clerk](https://clerk.dev/) with OTP verification.
- **State Management:** [Zustand](https://github.com/pmndrs/zustand) for handling task data.
- **Styling:** Tailwind CSS for responsive and modern UI design.
- **Charting:** Chart.js and react-chartjs-2 for visual representations on the dashboard.
- **Mapping:** Leaflet.js for location-based reminders.
- **Icons:** Various icons used for UI elements from @heroicons

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/amitbishnoi29/TaskManager.git
  

2.  **Navigate to the Project Directory:**
    
    ```bash
   
    
	    cd TaskManager
    
3.  **Install Dependencies:**
    
    ```bash
    
	    npm install
    
4.  **Run the Development Server:**
    
    ```bash
    
     npm run dev
    
	 Open your browser and go to 
    
	 http://localhost:3000
