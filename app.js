const express = require('express');
const { lowerCase } = require('lodash');

// Express App
const app = express();

// Register View Engine
app.set('view engine', 'ejs');

// Listen for requests on port 3000
app.listen(3000); // Go to localhost:3000 on browser

app.get('/', (req, res) => {
  const blogs = [
    { title: 'Yoshi finds eggs', snippet: 'laisdbnfliusdfvbwesfbviasdb' },
    { title: 'Mario finds stars', snippet: 'dfiaklweucnqeebuoywerfnvweruivb' },
    { title: 'How to defeat bowser', snippet: 'iasklcoimeruivbneiwuvbyuwoeb' },
  ];
  res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new Blog' });
});

// 404 Page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
