const express = require('express');
const {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect, authorize } = require('../middleware/authMiddleware');

const advancedResults = require('../middleware/advacnedResults');
const Task = require('../models/Task');

const taskRouter = express.Router();

taskRouter
  .route('/')
  .get(advancedResults(Task), getAllTasks)
  .post(protect, authorize('user', 'admin'), createTask);
taskRouter
  .route('/:id')
  .get(protect, authorize('user', 'admin'), getTask)
  .put(protect, authorize('user', 'admin'), updateTask)
  .delete(protect, authorize('user', 'admin'), deleteTask);

module.exports = taskRouter;
