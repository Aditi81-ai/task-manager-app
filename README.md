# Task Manager Full Stack Project

A full-featured MERN (MongoDB, Express, React, Node.js) stack task management application with JWT authentication, task CRUD operations, filtering, search, dark mode, and CSV export functionality.

How to Run Locally

Prerequisites:
- Node.js and npm installed
- MongoDB Atlas account or connection string

Clone the Repository:
git clone https://github.com/Aditi81-ai/task-manager-app.git
cd task-manager-app

Client Setup:
cd client
npm install
npm start
(The client runs at http://localhost:3000/)

Server Setup:
cd server
npm install

Prepare environment variables:
1. Copy .env.example to .env
2. Edit server/.env and fill in your own values:

PORT=5000
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=your_jwt_secret_here

Start server:
npm start
(The server runs at http://localhost:5000/)

Usage:
- Open http://localhost:3000/ in your browser
- Register and manage tasks

Important Notes:
- Your .env file is excluded from version control for security.
- .env.example is provided as a template.
- Replace placeholders with your actual secrets.


Technologies Used:
- MongoDB
- Express.js
- React.js
- Node.js
- JSON Web Tokens (JWT)
- Bcrypt for password hashing

Contact:
Aditi Jagtap
GitHub Profile: https://github.com/Aditi81-ai

Email: aditijagtap213@gmail.com


