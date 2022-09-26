require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { limiter } = require('./utils/limitter');
const router = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { handleError } = require('./middlewares/handleError');

const { PORT = 3500, DATABASE = 'mongodb://127.0.0.1:27017/moviesdb' } = process.env;

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(requestLogger);
app.use(limiter);
app.use(router);
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
