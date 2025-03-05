const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

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
app.use(express.urlencoded({ extended: true }));
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

// Add a new blog on browser
app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => console.log(err));
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => console.log(err));
});

app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => console.log(err));
});

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new Blog' });
});

// 404 PAGE
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
