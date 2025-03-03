const express = require('express');

// Express App
const app = express();

// Listen for requests on port 3000
app.listen(3000); // Go to localhost:3000 on browser

app.get('/', (req, res) => {
  res.sendFile('./views/index.html', { root: __dirname });
});

app.get('/about', (req, res) => {
  res.sendFile('./views/about.html', { root: __dirname });
});

// Redirects
app.get('/about-us', (req, res) => {
  res.redirect('/about');
});

// 404 Page
app.use((req, res) => {
  res.status(404).sendFile('./views/404.html', { root: __dirname });
});
