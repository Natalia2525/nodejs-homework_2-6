const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const boolParser = require('express-query-boolean');
const helmet = require('helmet');
const limiter = require('./helpers/limiter');
const path = require('path');

const { HttpCode } = require('./helpers/constants');

const usersRouter = require('./routes/api/users');
const contactsRouter = require('./routes/api/contacts');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(helmet());

require('dotenv').config();
const PUBLIC_DIR = process.env.PUBLIC_DIR;
const AVATARS_OF_USERS = process.env.AVATARS_OF_USERS;

app.use(express.static(path.join(__dirname, PUBLIC_DIR, AVATARS_OF_USERS)));
app.use(logger(formatsLogger));

app.use(limiter);
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: 10000 }));
app.use(boolParser());
app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((_req, res) => {
  res
    .status(HttpCode.NOT_FOUND)
    .json({ status: 'error', code: HttpCode.NOT_FOUND, message: 'Not found' });
});

app.use((err, _req, res, _next) => {
  const code = err.status || HttpCode.INTERNAL_SERVER_ERROR;
  const status = err.status ? 'error' : 'fail';
  res.status(code).json({ status, code, message: err.message });
});

module.exports = app;
