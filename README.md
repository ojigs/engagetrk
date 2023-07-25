# EngageTrk

EngageTrk is a web application that helps you keep track of your activities for the day and improve your productivity. You can create, edit, delete tasks, set priorities and deadlines, mark them as completed or pending, and see your progress and statistics. You can also set and sync your tasks' reminders and notifications with your calendar.

## Features

- Create, edit, and delete tasks with titles, descriptions, priorities, and deadlines
- Mark your tasks as completed or pending and see your progress and statistics
- Set reminders and notifications for your tasks and sync them with your calendar
- Filter your tasks by status, priority, deadline, or keyword
- Sort your tasks by title, priority, or deadline
- Search your tasks by keyword or phrase
- Export your data as CSV or PDF files

## Installation

To run EngageTrk locally, you need to have Node.js and npm installed on your machine. You also need to create a Firebase project and get the configuration details. Then follow these steps:

1. Clone this repository: `git clone https://github.com/ojigs/engagetrk.git`
2. Navigate to the project directory: `cd engagetrk`
3. Install the dependencies: `npm install`
4. Create a `.env` file in the root directory and add the following variables with your Firebase configuration details:

    ```env
    REACT_APP_SUPABASE_APP_URL=https://*<project_ref>*.supabase.co
    REACT_APP_SUPABASE_KEY=your_api_key
    REACT_APP_API_URL=https://*<project_ref>*.supabase.co/rest/v1
    ```

5. Start the development server: `npm start`
6. Open http://localhost:3000 in your browser to see the app

## Usage

To use EngageTrk, you need to sign up with your email and password or sign in with Google. Then you can create tasks by clicking on the plus button in the bottom right corner. You can edit or delete tasks by clicking on the pencil or trash icons on each task. You can mark tasks as completed or pending by clicking on the checkbox or circle icons on each task. You can filter your tasks by status, priority, deadline, or keyword by using the dropdown menus in the top left corner. You can sort your tasks by title, priority, or deadline by using the buttons in the top right corner. You can search your tasks by keyword or phrase by using the search bar on the top center. You can set reminders and notifications for your tasks by clicking on the bell icon on each task. You can sync your tasks with your calendar by clicking on the calendar icon in the bottom left corner. You can export your data as CSV or PDF files by clicking on the export button in the top right corner.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
