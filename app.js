const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Express App
const app = express();

// Connect to mongoDB
const { dbUser, dbPassword } = require('./secrets');
const dbURI = `mongodb+srv://${dbUser}:${dbPassword}@nodetuts.4lhc2.mongodb.net/`;
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Register View Engine
app.set('view engine', 'ejs');

// MIDDLEWARE & STATIC FILES (CSS/images)
app.use(express.static('public')); // Refers to folder name: public
app.use(morgan('dev'));

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
