const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users/users');
const profileRoutes = require('./routes/profile/Profile');
const dotenv = require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', userRoutes);
app.use('/profile', profileRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Auth Service running on port: ${process.env.PORT}`)
})