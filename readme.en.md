Water Tracker

An application for monitoring water consumption.

The application is designed to easily track the amount of water consumed and set personal goals to support health. Our Water Tracker has a convenient and adaptive interface that simplifies tracking the amount of water consumed without unnecessary effort.

Registered users have the following capabilities:

Customize their profile, including adding or modifying personal data and photos.
Calculate the daily water intake norm using a built-in formula or set it at their discretion.
Edit the daily water intake norm.
Add, edit, or delete the amount of water consumed per day.
Track progress on a graph showing the percentage of water consumed per day and month.
Our project combines modern and efficient technologies such as:

React
ReduxToolkit
ReduxPersist
Axios
HTML/CSS
Formik
Node.js
Express
Mongoose
Swagger
Joi
Nodemailer
MongoDB
Google OAuth
Installation and Project Setup

### Installation and Project Setup

To install and configure the project, follow these steps:

## 1. Installing Dependencies

Before starting work, make sure you have the following dependencies installed:

Node.js: version 14 or higher
npm: Node.js package manager
Before you begin, make sure you have Node.js package manager installed, or install it using the [official documentation](https://nodejs.org/en/download)

## 2. Cloning the Repository

Clone the repository with the project to your computer:

[Front-End](https://github.com/BendelVolodymyr/Smart-Foxes-WaterTracker)

[Back-End](https://github.com/BendelVolodymyr/Smart-Foxes-Backend-WaterTracker)

## 3. Installing Project Dependencies

Navigate to your project directory and execute the command to install project dependencies:

npm install

List of dependencies for Back-End:

```javascript
"dependencies": {
   "axios": "^1.6.8",
   "bcrypt": "^5.1.1",
   "cloudinary": "^2.0.3",
   "cors": "^2.8.5",
   "dotenv": "^16.4.5",
   "express": "^4.19.2",
   "jest": "^29.7.0",
   "jimp": "^0.22.12",
   "joi": "^17.12.2",
   "jsonwebtoken": "^9.0.2",
   "moment": "^2.30.1",
   "mongodb": "3.0",
   "mongoose": "^8.2.4",
   "morgan": "^1.10.0",
   "multer": "^1.4.5-lts.1",
   "nanoid": "^3.3.4",
   "nodemailer": "^6.9.13",
   "query-string": "^9.0.0",
   "swagger-ui-express": "^5.0.0"
 },
 "devDependencies": {
   "nodemon": "^3.1.0"
 }
```

List of dependencies for Front-End:

```javascript
 "dependencies": {
    "@emotion/react": "^11.11.4",
    "@emotion/styled": "^11.11.5",
    "@mui/icons-material": "^5.15.14",
    "@mui/material": "^5.15.14",
    "@reduxjs/toolkit": "^2.2.2",
    "@vitejs/plugin-react-swc": "^3.3.2",
    "axios": "^1.6.8",
    "date-fns": "^3.6.0",
    "formik": "^2.4.5",
    "modern-normalize": "^2.0.0",
    "normalize.css": "^8.0.1",
    "notiflix": "^3.2.7",
    "react": "^18.2.0",
    "react-datepicker": "^6.6.0",
    "react-dom": "^18.2.0",
    "react-icons": "^5.0.1",
    "react-password-strength-bar": "^0.4.1",
    "react-redux": "^9.1.0",
    "react-router-dom": "^6.22.3",
    "react-spinners": "^0.13.8",
    "redux-persist": "^6.0.0",
    "styled-components": "^6.0.7",
    "vite-plugin-svgr": "^3.2.0",
    "yup": "^1.4.0"
  },
  "devDependencies": {
    "@swc/cli": "^0.1.62",
    "@swc/core": "^1.3.84",
    "@types/react": "^18.2.15",
    "@types/react-dom": "^18.2.7",
    "@vitejs/plugin-react": "^4.0.3",
    "eslint": "^8.57.0",
    "eslint-config-prettier": "^9.1.0",
    "eslint-plugin-prettier": "^5.1.3",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.3",
    "husky": "^8.0.3",
    "jest": "^29.7.0",
    "lint-staged": "^14.0.1",
    "prettier": "^3.0.3",
    "vite": "^4.4.5"
  }
```

## 4. Environment Setup

Create a .env file in the project's root directory and fill it with environment variables:

The list of environment variables is stored in the .env.example file.

## 5. Running the Project

Once dependencies are installed and the environment is configured, run the project:

npm run dev

By default, the project will be available at http://localhost:3000 for Back-End and http://localhost:5173 for Front-End.

## 6. 6. Our Development Team:

Front-End:
Volodymyr [gitHub](https://github.com/bendelvolodymyr) - Team lead, project setup, worked on styling dark and light themes, footer.
Nataliia [gitHub](https://github.com/NataFilina)- Scrum master, worked on the Welcome page and Loader.
Oksana [gitHub](https://github.com/OksanaLesjuk)- water consumption history, calendar, and modal window with general information and statistics.
Tania [gitHub](https://github.com/Tania66) - worked on user registration and authentication.
Kyrylo [gitHub](https://github.com/kyrylomatkash)- modal window with user information settings.
Oleksiy [gitHub](https://github.com/irokez34) - component with planned daily water intake, modal for calculating the daily water intake norm, scale showing the ratio of water consumed per day.
Georgiy [gitHub](https://github.com/GeorgiySergeev)- worked on the header, completed all Redux setup.

Back-End:
Yuliia [gitHub](https://github.com/turasova) - user and calculation of the daily water intake norm.
Tymur [gitHub](https://github.com/AQR88) - user authentication.
Daria [gitHub](https://github.com/KorolenkoDaria) - adding, editing, and deleting water, information on consumed water, password recovery.
