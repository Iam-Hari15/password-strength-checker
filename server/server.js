// Import required modules
const express = require('express');
const cors = require('cors');

// Initialize Express app
const app = express();
const port = 5001;  // Use port 5001

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Root route (optional, for checking if the server is running)
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Password strength checking route
app.post('/check-password', (req, res) => {
  const { password } = req.body;

  // Check if password is provided
  if (!password) {
    return res.status(400).json({ error: 'No password provided' });
  }

  let strength = 'Weak';

  // Moderate strength criteria
  if (password.length > 8 && /[A-Za-z]/.test(password)) {
    strength = 'Moderate';
  }

  // Strong strength criteria
  if (
    password.length > 12 && 
    /[A-Z]/.test(password) &&  // At least one uppercase letter
    /[0-9]/.test(password) &&  // At least one number
    /[!@#$%^&*(),.?":{}|<>]/.test(password)  // At least one special character
  ) {
    strength = 'Strong';
  }

  // Respond with the password strength
  return res.json({ strength });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
