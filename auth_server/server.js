const express = require('express');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth');

require('dotenv').config();
const app = express();
const PORT = 4000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});