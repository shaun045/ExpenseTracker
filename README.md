Expense Tracker
A modern web-based expense tracking application built with HTML, CSS, and Vanilla JavaScript.
The application allows users to record financial transactions, categorize them, and visualize how their money is distributed across savings, expenses, and investments.
The project focuses on clean UI design, data visualization, and smooth user interactions, while keeping the implementation lightweight without external frameworks.
________________________________________
Overview
Managing personal finances requires clear visibility of where money is going. This application provides a simple and interactive interface that allows users to:
•	Record transactions
•	Categorize financial activities
•	Track overall balance
•	Visualize distribution using an animated circular chart
•	Review transaction history
•	Persist data locally using browser storage
All data is stored using LocalStorage, allowing the application to retain user data even after refreshing the page.
________________________________________
Features
Transaction Management
Users can create financial entries by providing:
•	Transaction title
•	Transaction amount
•	Category selection
Supported categories include:
•	Savings
•	Investment
•	Expense
Each transaction is instantly reflected in the dashboard metrics and history list.
________________________________________
Animated Financial Dashboard
The application displays key financial metrics:
•	Total balance
•	Total income
•	Total expenses
Values are animated using a custom animateValue() function for a smooth counting effect when data updates.
________________________________________
Circular Distribution Graph
The application visualizes financial distribution through an SVG circular progress chart.
Each category is represented by a segment:
•	Savings — Teal
•	Expense — Orange
•	Investment — Blue
The chart dynamically updates based on the percentage of each category relative to the total amount.
________________________________________
Transaction History
All transactions are listed in a scrollable history panel.
Each entry includes:
•	Transaction title
•	Category indicator
•	Delete option
Transactions are visually categorized using colored borders:
Category	Color
Savings	Teal
Expense	Orange
Investment	Blue
New transactions animate into view to provide immediate visual feedback.
________________________________________
Persistent Storage
The application uses LocalStorage to persist transaction data.
This ensures that:
•	Transactions remain available after page refresh
•	No external database is required
•	The application works fully offline
Stored data is structured as an array of transaction objects.
Example:
{
  title: "Salary",
  amount: 2000,
  category: "savings"
}
________________________________________
Technology Stack
This project was intentionally built without frameworks to strengthen core frontend development skills.
Frontend
•	HTML5
•	CSS3
•	Vanilla JavaScript (ES6)
Browser APIs
•	LocalStorage
•	requestAnimationFrame
•	SVG
________________________________________
User Interface Highlights
The application includes several UI and animation features designed to improve user experience:
•	Glassmorphism inspired layout
•	Animated circular graph using SVG stroke manipulation
•	Smooth number animation using requestAnimationFrame
•	Custom dropdown menu for category selection
•	Dynamic transaction list rendering
•	Interactive hover and transition effects
The UI was designed with emphasis on clarity, visual feedback, and modern aesthetics.
________________________________________
Project Structure
expense-tracker/
│
├── index.html
├── style.css
├── script.js
│
└── README.md
index.html
Defines the application layout including dashboard, transaction form, and history list.
style.css
Handles layout design, animations, responsive grid system, and visual styling.
script.js
Contains the application logic including:
•	transaction management
•	graph updates
•	animated values
•	LocalStorage persistence
•	dropdown interactions
________________________________________
Core Concepts Demonstrated
This project demonstrates understanding of several important frontend concepts:
DOM Manipulation
Dynamic rendering of transaction elements and UI updates.
State Management
Transaction data is stored in an in-memory array and synchronized with LocalStorage.
Data Visualization
SVG stroke manipulation is used to represent financial distribution percentages.
Animation
requestAnimationFrame is used for smooth number transitions.
Event Handling
User actions such as adding or deleting transactions trigger real-time UI updates.
________________________________________
How to Run the Project
1.	Clone the repository
git clone (https://github.com/shaun045/ExpenseTracker.git)
2.	Open the project folder
3.	Run the application by opening:
index.html
No additional setup or dependencies are required.
________________________________________
Future Improvements
Planned enhancements for future versions include:
•	Edit transaction functionality
•	Category filtering
•	Monthly financial summaries
•	Data export functionality
•	Dark/light theme toggle
•	Backend integration with persistent database
•	User authentication
________________________________________
Learning Goals
This project was built to strengthen core frontend development skills including:
•	JavaScript logic and data handling
•	UI rendering and animation
•	state management without frameworks
•	building complete user-facing applications
It serves as a stepping stone toward building more advanced full-stack applications in the future.
________________________________________
Author
Shaun Aniñon
Frontend Developer in progress focused on building practical applications and mastering modern web development tools.

