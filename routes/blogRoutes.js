const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => console.log(err));
});

// Create blogs page
router.get('/create', (req, res) => {
  res.render('create', { title: 'Create a new Blog' }); // render create.ejs
});

// Get blog by ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch((err) => console.log(err));
});

// Delete blog
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs' });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
