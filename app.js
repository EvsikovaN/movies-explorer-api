require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { limiter } = require('./utils/limitter');

const { validateSignUp, validateAuth } = require('./utils/validation');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { userRoutes } = require('./routes/userRoutes');
const { movieRoutes } = require('./routes/movieRoutes');
const { createUser, login } = require('./controllers/userControllers');

const { handleError } = require('./middlewares/handleError');
const { NotFoundError } = require('./errors/not-found-err');

const { PORT = 3500, DATABASE = 'mongodb://127.0.0.1:27017/moviesdb' } = process.env;

const app = express();

app.use(cors());
app.use(helmet());
app.use(limiter);

app.use(express.json());

app.use(requestLogger);

app.post(
  '/signin',
  validateAuth,
  login,
);

app.post(
  '/signup',
  validateSignUp,
  createUser,
);

app.use(auth);

app.use('/users', userRoutes);
app.use('/movies', movieRoutes);

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемой страницы не существует'));
});

app.use(errorLogger); // подключаем логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(handleError);

async function main() {
  await mongoose.connect(DATABASE);
  console.log('Connected to db');

  await app.listen(PORT);
  console.log(`Server listen on ${PORT}`);
}

main();
