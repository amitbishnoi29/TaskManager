
  

# Task Manager Application

  

[Live Demo](https://task-manager-lemon-one.vercel.app/)
[Recording Link](https://shorthillstech-my.sharepoint.com/personal/amit_bishnoi_shorthills_ai/_layouts/15/stream.aspx?id=%2Fpersonal%2Famit%5Fbishnoi%5Fshorthills%5Fai%2FDocuments%2Fvideo%2Drecording%2Emp4&nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&ga=1&referrer=StreamWebApp%2EWeb&referrerScenario=AddressBarCopied%2Eview%2Ee42be2c7%2D10d4%2D42ff%2Dbf6f%2Dbb8e9b25d18d/)

  

## Overview

  

The **Task Manager Application** is a powerful and user-friendly web application designed to help users efficiently manage their tasks. Built using **Next.js 14**, this app features OTP authentication powered by **Clerk**, and provides an intuitive interface for adding, editing, and organizing tasks.

  

## Features

  

### 1. **Authentication**

-  **Sign Up/Sign In with OTP:** Secure authentication using OTP verification powered by Clerk.

  

### 2. **Home Page**

-  **Header:**

-  **Title:** "Task Manager"

-  **Search Bar:** Filter tasks based on keywords.

-  **Task List:**

- A scrollable list displaying tasks in a card format.

- Each task card shows the title, due date, priority level (color-coded), and a checkbox to mark tasks as completed.

- Swipe left on a task to reveal options for editing or deleting the task.

-  **Floating Action Button (FAB):**

- Positioned at the bottom-right corner to add new tasks.

-  **Icon:** "+"

-  **Navigation Bar:**

- Positioned at the bottom of the screen with icons and labels for **Home**, **Dashboard**, and **Settings**.

  

### 3. **Dashboard Page**

-  **Header:**

-  **Title:** "Dashboard"

-  **Task Statistics:**

- Section displaying statistics for completed tasks, pending tasks, and task priority distribution.

- Visual representations include pie charts, bar graphs, and line charts.

-  **Upcoming Tasks:**

- List of upcoming tasks with their due dates.

-  **Performance Insights:**

- Insights and suggestions based on user behavior and task completion trends.

  

### 4. **Add/Edit Task Screen**

-  **Header:**

-  **Back Button:** Return to the previous screen.

-  **Title:** "Add Task" or "Edit Task" based on the action.

-  **Form Fields:**

- Input fields for the task title and description.

- Date picker for selecting the due date.

- Dropdown menu for choosing the priority level (High, Medium, Low).

- Location selector with a map for setting location-based reminders.

-  **Save Button:**

- Positioned at the bottom of the form to save the task details.

-  **Icon:** "Save"

  

## Technology Stack

  

-  **Framework:** [Next.js 14](https://nextjs.org/)

-  **Authentication:** [Clerk](https://clerk.dev/) with OTP verification.

-  **State Management:** [Zustand](https://github.com/pmndrs/zustand) for handling task data.

-  **Styling:** Tailwind CSS for responsive and modern UI design.

-  **Charting:** Chart.js and react-chartjs-2 for visual representations on the dashboard.

-  **Mapping:** Leaflet.js for location-based reminders.

-  **Icons:** Various icons used for UI elements from @heroicons

  

## Getting Started

  

### Prerequisites

  

- Node.js (v14 or later)

- npm (v6 or later)

  

### Installation

  

1.  **Clone the Repository:**

  

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

```

## Design Choices and Trade-Offs

### 1. User Interface and User Experience (UI/UX)
- **Design Choice:** The app's UI is designed to be clean and intuitive, resembling familiar task management tools. Color-coded priority levels, a floating action button (FAB), and a swipeable task card interface enhance usability.
- **Trade-Off:** Advanced customization options, like custom themes or drag-and-drop task organization, were deprioritized. These features can be added in future iterations based on user feedback.

### 2. Responsive Design
- **Design Choice:** The application is responsive, ensuring functionality on both desktop and mobile devices. Tailwind CSS was used for its utility-first approach, creating a consistent design across different screen sizes.
- **Trade-Off:** Complex layouts, such as the dashboard with multiple charts, were simplified for mobile users to ensure readability and usability.

### 3. Authentication with Clerk
- **Design Choice:** OTP authentication using Clerk was implemented to provide secure and modern login. This choice balances security and convenience.
- **Trade-Off:** Implementing OTP authentication added complexity to the user flow. However, the trade-off enhances security and user convenience. Future considerations may include adding social logins.

### 4. State Management
- **Design Choice:** Zustand was chosen for its simplicity and lightweight nature, making global state management straightforward without the overhead of more complex libraries.
- **Trade-Off:** Zustand's simplicity means fewer built-in features for advanced scenarios. The trade-off was acceptable given the app's scale, where complex state management was unnecessary.

### 5. Task Search and Filtering
- **Design Choice:** A search bar with debouncing, powered by lodash, allows users to filter tasks by keywords, status, and priority. Filtering is done client-side for faster feedback.
- **Trade-Off:** Client-side filtering works well for the current app scale. However, server-side filtering might be necessary to handle larger datasets efficiently as the app grows.

### 6. Performance Optimization
- **Design Choice:** The app is optimized using Next.js 14 features such as server-side rendering (SSR) and static site generation (SSG), ensuring fast load times.
- **Trade-Off:** These optimizations require careful management of data fetching and caching. Using SSR and SSG could add complexity to dynamic features that might benefit from client-side rendering.

### 7. Mapping and Location Selection
- **Design Choice:** The location-based reminder feature was integrated with a map component, adding a unique dimension to task management.
- **Trade-Off:** Incorporating a map introduced dependencies on external libraries and added considerations for mobile responsiveness, slightly increasing the learning curve for users unfamiliar with map interactions.
