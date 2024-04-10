Water Tracker

Застосунок для моніторінга спожитої води.

Застосунок розроблено для того, щоб легко відстежувати кількість випитої води та встановлювати особисті цілі для підтримки здоров'я. Наш Water Tracker має зручний та адаптивний інтерфейс, що спрощує відслідковування кількісті випитої води без зайвих зусиль.

Зареєстрований користувач має наступні можливості:

- налаштувати свій профіль, включаючи додавання або зміну особистих даних та фотографії;
- обчислити денну норму вживання води за допомогою вбудованої формули або встановити її на власний розсуд;
- редагувати денну норму вживання води;
- додавати, редагувати або видаляти кількість випитої води за день;
- відстежувати прогрес за графіком відсотків випитої води за день та місяць.

Наш проект поєднує сучасні та ефективні технології, такі як:

- React
- ReduxToolkit
- ReduxPersist
- Axios
- HTML/CSS
- Formik
- Node.js
- Express
- Mongoose
- Swagger
- Joi
- Nodemailer
- MongoDB
- Google OAuth

## Встановлення та налаштування проекту

Для встановлення та налаштування проекту виконайте наступні кроки:

### 1. Встановлення залежностей

Перед початком роботи переконайтеся, що у вас встановлений пакетний менеджер Node.js, або встановіть його використовуючи [офіційну документацію](https://nodejs.org/en/download)

## 2. Клонування репозиторію

Склонуйте репозиторій з проектом на ваш комп'ютер:

[Front-End](https://github.com/BendelVolodymyr/Smart-Foxes-WaterTracker)

[Back-End](https://github.com/BendelVolodymyr/Smart-Foxes-Backend-WaterTracker)

## 3. Встановлення залежностей проекту

Перейдіть у директорію вашого проекту та виконайте команду встановлення залежностей:

npm install

Список залежностей для Back-End:

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

Список залежностей для Front-End:

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

## 4. Налаштування середовища

Створіть файл .env в кореневій директорії проекту та заповніть його змінними середовища:

Список змінних середовища зберігається в файлі .env.example

## 5. Запуск проекту

Після того як залежності встановлені та середовище налаштоване, запустіть проект:

npm run dev

За замовчуванням проект буде доступний за адресами http://localhost:3000 для Back-End, та http://localhost:5173 для Front-End.

## 6. Наша команда розробників:

Front-End:
Володимир [gitHub](https://github.com/bendelvolodymyr) – Team lead, налаштуванням проекту, працював над оформленням темної і світлої теми, футер.
Наталія [gitHub](https://github.com/NataFilina)– Scrum master, працювала над сторінкою Welcome та над Loader.
Оксана [gitHub](https://github.com/OksanaLesjuk) –історія споживання води, календар та спливаюче вікно з загальною інформацією та статистикою.
Тетяна [gitHub](https://github.com/Tania66)– працювала над реєстрацією то логінізацією користувача.
Кирило [gitHub](https://github.com/kyrylomatkash) – модальне вікно з налаштуваннями інформації про юзера.
Олексій [gitHub](https://github.com/irokez34) – компонент з запланованою денною нормою води, модалка для розрахунку денної норми споживання води, шкала з відношенням випитої води за день.
Георгій [gitHub](https://github.com/GeorgiySergeev)– працював на хедером, виконав всі налаштування redax.

Back-End:
Юлія [gitHub](https://github.com/turasova)– юзер та розрахунок денної норми споживання води.
Тимур [gitHub](https://github.com/AQR88) – автентифікація користувача.
Дар’я [gitHub](https://github.com/KorolenkoDaria)– додавання, редагування та видалення води, інформація по спожитій воді, відновлення пароля.
