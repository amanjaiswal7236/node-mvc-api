# Node.js MVC API

## Overview

This is a Node.js API project built using the MVC architecture. It provides basic CRUD operations for managing users. The API uses MongoDB as the database and includes authentication, validation, and unit testing.

## Features

- Create, read, update, and delete users.
- Basic authentication.
- Input validation using Joi.
- Soft deletion of users.
- Environment-based configuration.
- Unit tests with Jest.

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Joi (Validation)
- Jest (Testing)
- Nodemon (Development)

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo/node-mvc-api.git
    cd node-mvc-api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add the following:
    ```env
    PORT=3000
    DB_URI=mongodb://localhost:27017/worko
    JWT_SECRET=your_secret_key
    ```

### Running the Server

1. Start the server in development mode:
    ```sh
    npm run dev
    ```

2. The server will be running on `http://localhost:3000`.

### Running Tests

1. Run the tests using Jest:
    ```sh
    npm test
    ```

### API Endpoints

#### Authentication

All endpoints require a Bearer token for authentication.

#### User Endpoints

1. **GET /worko/user**
    - List all users.
    - **Headers:** `Authorization: Bearer <your_jwt_token>`

2. **GET /worko/user/:userId**
    - Get user by ID.
    - **Headers:** `Authorization: Bearer <your_jwt_token>`

3. **POST /worko/user**
    - Create a new user.
    - **Headers:** `Content-Type: application/json`, `Authorization: Bearer <your_jwt_token>`
    - **Body:**
      ```json
      {
          "email": "newuser@example.com",
          "name": "New User",
          "age": 25,
          "city": "New City",
          "zipCode": "12345"
      }
      ```

4. **PUT /worko/user/:userId**
    - Update a user.
    - **Headers:** `Content-Type: application/json`, `Authorization: Bearer <your_jwt_token>`
    - **Body:**
      ```json
      {
          "email": "updateduser@example.com",
          "name": "Updated User",
          "age": 30,
          "city": "Updated City",
          "zipCode": "54321"
      }
      ```

5. **PATCH /worko/user/:userId**
    - Partially update a user.
    - **Headers:** `Content-Type: application/json`, `Authorization: Bearer <your_jwt_token>`
    - **Body:**
      ```json
      {
          "name": "Partially Updated User"
      }
      ```

6. **DELETE /worko/user/:userId**
    - Soft delete a user.
    - **Headers:** `Authorization: Bearer <your_jwt_token>`

### Generate JWT for Authentication

To test the authenticated endpoints, you need to generate a JWT token.

1. **Create a login endpoint to generate JWT:**

    - **Method:** POST
    - **URL:** `http://localhost:3000/auth/login`
    - **Body:**
      ```json
      {
          "username": "admin",
          "password": "password"
      }
      ```

    - **Response:** Should return a JWT token.

2. Use the generated JWT token in the `Authorization` header for the other requests.

### Example JWT Middleware

If you need an endpoint to generate JWT for testing, add the following to your project:

1. **Create `routes/auth.routes.js`:**
    ```js
    const express = require('express');
    const jwt = require('jsonwebtoken');
    const config = require('../config');

    const router = express.Router();

    router.post('/login', (req, res) => {
        const { username, password } = req.body;

        // Validate the user credentials here (this is just a placeholder)
        if (username === 'admin' && password === 'password') {
            const token = jwt.sign({ username }, config.jwtSecret, { expiresIn: '1h' });
            return res.json({ token });
        }

        res.status(401).json({ message: 'Invalid credentials' });
    });

    module.exports = router;
    ```

2. **Use the auth route in `src/index.js`:**
    ```js
    const authRoutes = require('./routes/auth.routes');

    app.use('/auth', authRoutes);
    ```

## Environment Variables

- `PORT`: The port on which the server will run.
- `DB_URI`: The URI for connecting to MongoDB.
- `JWT_SECRET`: The secret key for signing JWTs.

