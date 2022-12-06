const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/users/users');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('welcome')
});

app.listen(3000, () => {
  console.log('Server up and running')
})