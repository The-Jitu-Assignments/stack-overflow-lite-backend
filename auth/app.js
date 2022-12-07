const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users/users');
const dotenv = require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', userRoutes);

app.get('/', (req, res) => {
  res.send('welcome')
});

app.listen(process.env.PORT, () => {
  console.log(`Auth Service running on port: ${process.env.PORT}`)
})