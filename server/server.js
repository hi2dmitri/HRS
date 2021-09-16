const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const membersRouter = require('./routes/members');
const employeesRouter = require('./routes/employees');
const interviewsRouter = require('./routes/interviews');
const recruitmentRouter = require('./routes/recruitment');

require('dotenv').config();


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/members', membersRouter);
app.use('/employees', employeesRouter);
app.use('/interviews', interviewsRouter);
app.use('/recruitment', recruitmentRouter);
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err);
    }
  });
});







 
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});