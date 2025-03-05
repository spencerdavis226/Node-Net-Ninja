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
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// Register View Engine
app.set('view engine', 'ejs');

// MIDDLEWARE & STATIC FILES (CSS/images)
app.use(express.static('public')); // Refers to folder name: public
app.use(morgan('dev'));

// Mongoose and mongo sandbox routes
// SAVE
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog 2',
    snippet: 'about my new blog',
    body: 'more about my new blog',
  });

  blog
    .save()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

// FIND
app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});
// FIND BY ID
app.get('/single-blog', (req, res) => {
  Blog.findById('67c8a143f74c3e402c40f86c') // ID grabbed from mongoDB of a blog
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

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
