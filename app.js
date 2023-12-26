const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Create user schema and model
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({ extended: true }));

// Handle registration form submission
app.post('/register', (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  newUser.save((err) => {
    if (err) {
      console.error(err);
      res.send('Registration failed.');
    } else {
      res.send('Registration successful.');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
