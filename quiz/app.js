const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { PORT } = process.env;
const questionsRoutes = require('./routes/questions/Questions');
const answersRoutes = require('./routes/answers/Answers');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/question', questionsRoutes);
app.use('/answer', answersRoutes);

app.listen(PORT, () => {
  console.log(`Quiz service is running on port: ${PORT}`)
})