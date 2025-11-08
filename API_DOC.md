API Documentation

This document describes the backend API endpoints for the Task Manager application.

Authentication APIs

Register User
- URL: /api/auth/register
- Method: POST
- Request Body:
  {
    "name": "string",
    "email": "string",
    "password": "string"
  }
- Success Response:
  Status: 201 Created
  Body:
  {
    "message": "User registered successfully"
  }

Login User
- URL: /api/auth/login
- Method: POST
- Request Body:
  {
    "email": "string",
    "password": "string"
  }
- Success Response:
  Status: 200 OK
  Body:
  {
    "token": "jwt_token_string"
  }

User Profile API

Get Profile
- URL: /api/profile
- Method: GET
- Headers: Authorization: Bearer <jwt_token>
- Success Response:
  Status: 200 OK
  Body:
  {
    "name": "string",
    "email": "string"
  }

Task APIs

Get All Tasks
- URL: /api/tasks
- Method: GET
- Headers: Authorization: Bearer <jwt_token>
- Success Response:
  Status: 200 OK
  Body: Array of tasks

Create Task
- URL: /api/tasks
- Method: POST
- Headers: Authorization: Bearer <jwt_token>
- Request Body:
  {
    "title": "string",
    "description": "string",
    "status": "pending|in-progress|completed",
    "priority": "low|medium|high"
  }
- Success Response:
  Status: 201 Created
  Body:
  {
    "message": "Task created successfully"
  }

Update Task
- URL: /api/tasks/:id
- Method: PUT
- Headers: Authorization: Bearer <jwt_token>
- Request Body: Same as Create Task
- Success Response:
  Status: 200 OK
  Body:
  {
    "message": "Task updated successfully"
  }

Delete Task
- URL: /api/tasks/:id
- Method: DELETE
- Headers: Authorization: Bearer <jwt_token>
- Success Response:
  Status: 200 OK
  Body:
  {
    "message": "Task deleted successfully"
  }
