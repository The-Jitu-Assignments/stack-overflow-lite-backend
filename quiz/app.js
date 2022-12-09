const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();
const { PORT } = process.env;
const questionsRoutes = require('./routes/questions/Questions');
const answersRoutes = require('./routes/answers/Answers');
const commentsRoutes = require('./routes/comments/Comments');
const likesRoutes = require('./routes/Likes/Likes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/question', questionsRoutes);
app.use('/answer', answersRoutes);
app.use('/comment', commentsRoutes);
app.use('/likes', likesRoutes);

app.listen(PORT, () => {
  console.log(`Quiz service is running on port: ${PORT}`)
})