const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// Express App
const app = express();

// Connect to mongoDB
const { username, password } = require('./secrets');
const dbURI = `mongodb+srv://${username}:${password}@nodetuts.4lhc2.mongodb.net/node-tuts`;
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000)) // Port to listen for
  .catch((err) => console.log(err));

// Register View Engine
app.set('view engine', 'ejs');

// MIDDLEWARE & STATIC FILES (CSS/images)
app.use(express.static('public')); // Refers to folder name: public
app.use(morgan('dev'));

// BASIC ROUTES
app.get('/', (req, res) => {
  res.redirect('./blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

// BLOG ROUTES
app.get('/blogs', (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 }) // Newest to oldest sorting
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result }); // index refers to index.ejs
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new Blog' });
});

// 404 PAGE
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
