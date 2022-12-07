const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log('Quiz service running:::')
})