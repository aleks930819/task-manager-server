const express = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createUser,
} = require('../controllers/usersController');

const { protect, authorize } = require('../middleware/authMiddleware');
const advancedResults = require('../middleware/advacnedResults');
const User = require('../models/User');

const userRouter = express.Router();

userRouter.use(protect);
userRouter.use(authorize('admin'));

userRouter.route('/').get(advancedResults(User), getUsers).post(createUser);
userRouter.route('/:id').get(getUser).put(updateUser).delete(deleteUser);

module.exports = userRouter;
