const router = require('express').Router();

const projectRoutes = require('./project.routes');
const taskRoutes = require('./tasks.routes');
const listRoutes = require('./list.routes');
const authRoutes = require('./auth.routes');

// Auth routes
router.use('/auth', authRoutes);

// Projects routes
router.use('/projects', projectRoutes);

// Tasks routes
router.use('/tasks', taskRoutes);

// Lists routes
router.use('/lists', listRoutes);


module.exports = router;
