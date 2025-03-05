const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

router.get('/', blogController.blog_index);

// Add a new blog on browser
router.post('/', blogController.blog_create_post);

// Create blogs page
router.get('/create', blogController.blog_create_get);

// Get blog by ID
router.get('/:id', blogController.blog_details);

// Delete blog
router.delete('/:id', blogController.blog_delete);

module.exports = router;
