const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { PORT } = process.env;
const questionsRoutes = require('./routes/questions/Questions');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/question', questionsRoutes);

app.listen(PORT, () => {
  console.log(`Quiz service is running on port: ${PORT}`)
})