const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');
const membersRouter = require('./routes/members');
const employeesRouter = require('./routes/employees');
const interviewsRouter = require('./routes/interviews');
const recruitmentRouter = require('./routes/recruitment');
const authenticator = require('./routes/verify');

require('dotenv').config();
const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use('/auth', authRouter);

app.use(authenticator);

app.use('/members', membersRouter);
app.use('/employees', employeesRouter);
app.use('/interviews', interviewsRouter);
app.use('/recruitment', recruitmentRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});