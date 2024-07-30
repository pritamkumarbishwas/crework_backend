# Task Management Backend

## Overview

This project is the backend component of a Task Management System. It provides a RESTful API for user authentication and task management. Built with Node.js, Express, and MongoDB, it supports user registration, login, task creation, and management.

## Live Demo

The backend is hosted on Render and can be accessed via the following URL:

- **API Endpoint**: https://crework-backend-gvsa.onrender.com

## Features

- **User Authentication**: Register, log in, and log out users.
- **Task Management**: Create, read, update, and delete tasks.
- **Status Management**: Track tasks with different statuses and priorities.

## Technologies Used

- **Node.js**
- **Express**
- **MongoDB**
- **JSON Web Tokens (JWT)**
- **Nodemon** (for development)

## Installation

1. **Clone the Repository**

    ```bash
    git clone https://github.com/pritamkumarbishwas/crework_backend.git
    
    cd crework_backend
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Set Up Environment Variables**

    Create a `.env` file in the `backend` directory and add the following environment variables:

    ```env
    PORT=8000
    MONGODB_URI=your_mongodb_uri
    CORS_ORIGIN=*
    ACCESS_TOKEN_SECRET=your_access_token_secret
    ACCESS_TOKEN_EXPIRY=1d
    REFRESH_TOKEN_SECRET=your_refresh_token_secret
    REFRESH_TOKEN_EXPIRY=10d
    ```

4. **Start the Server**

    For development:

    ```bash
    npm run dev
    ```

    For production:

    ```bash
    npm start
    ```

## API Endpoints

### User Endpoints

- **POST** `/api/v1/users/login` - Log in a user and receive an access token.
- **POST** `/api/v1/users/register` - Register a new user.
- **POST** `/api/v1/users/logout` - Log out the current user.

### Task Endpoints

- **GET** `/api/v1/task` - Retrieve all tasks.
- **POST** `/api/v1/task` - Create a new task.
- **PUT** `/api/v1/task/:taskId` - Update an existing task.
- **DELETE** `/api/v1/task/:taskId` - Delete a task.
- **PUT** `/api/v1/task/change-status/:taskId` - Change the status of a task.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

