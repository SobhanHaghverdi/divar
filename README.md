# Divar

Divar is a peer-to-peer marketplace platform built with Node.js and Express, allowing users to buy and sell items directly from one another. Leveraging MongoDB as the database and Mongoose for seamless data communication, Divar provides a user-friendly interface for listing advertisements, browsing available items, and facilitating transactions. Join us in creating a vibrant community where users can easily connect and trade!

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Directory Structure](#directory-structure)
- [Environment Variables](#environment-variables)

## Features
- User authentication and authorization using JWT
- Advdertisements listing and browsing
- Image uploads for advertisements
- Responsive design for mobile and desktop
- Error handling and validation
- API documentation using Swagger

## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
- EJS (Embedded JavaScript templating)
- Multer (for file uploads)
- dotenv (for managing environment variables)
- jsonwebtoken (for authorization settings in cookies)
- Swagger (for API documentation)

## Installation

1. Clone the repository:
   
![Clipboard Icon](https://upload.wikimedia.org/wikipedia/commons/4/4f/Clipboard_icon.svg)
> git clone https://github.com/SobhanHaghverdi/divar.git

2. Navigate to the project directory:
   
bash
 cd divar
 
3. Install the dependencies:
   
bash
 npm install
 
4. Set up your environment variables by creating a .env file in the root directory.

5. Start the server:

bash
 npm start

## Usage
Once the server is running, you can access the application at http://localhost:${your_port}. You can register, log in, and start listing or browsing items.

## Directory Structure
divar/
-    ├── README.md
-    ├── package.json
-    ├── server.js
-    ├── public/
-    │   ├── assets/
-    │   ├── dist/
-    │   ├── home/
-    │   └── uploads/
-    ├── src/
-    │   ├── app-routes.js
-    │   ├── common/
-    │   │   ├── constants/
-    │   │   │   ├── cookie-enum.js
-    │   │   │   └── env-enum.js
-    │   │   ├── guard/
-    │   │   │   └── authorization-guard.js
-    │   │   ├── messages/
-    │   │   │   └── auth-messages.js
-    │   │   ├── middlewares/
-    │   │   │   ├── global-error-handler.js
-    │   │   │   └── not-found-handler.js
-    │   │   └── utils/
-    │   │       ├── auto-bind.js
-    │   │       ├── multer.js
-    │   │       └── object-helper.js
-    │   ├── config/
-    │   │   ├── mongoose-config.js
-    │   │   └── swagger-config.js
-    │   └── modules/
-    │       ├── advertisement/
-    │       ├── advertisement-option/
-    │       ├── auth/
-    │       ├── category/
-    │       └── user/
-    ├── views/
-    │   ├── layouts/
-    │   │   ├── auth/
-    │   │   ├── panel/
-    │   │   └── website/
-    │   └── pages/
-    │       ├── index.ejs
-    │       ├── auth/
-    │       ├── home/
-    │       └── panel/    

## Environment Variables

Create a .env file in the root directory of your project with the following content:

- PORT=3000
- NODE_ENV="development"
- MONGODB_URL="your_mongodb_connection_string"
- NESHAN_API_KEY="your_neshan_api_key"
- JWT_SECRET_KEY="your_jwt_secret_key"
- COOKIE_SECRET_KEY="your_cookie_secret_key


Make sure to replace the placeholder values with your actual credentials.
