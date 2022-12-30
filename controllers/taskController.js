const Task = require('../models/Task');
const asyncHandler = require('../middleware/asyncMiddleware');
const ErrorResponse = require('../utils/errorResponse');

// @desc Get All Tasks
// @route GET /api/v1/tasks
// @access Public

exports.getAllTasks = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.createTask = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const task = await Task.create(req.body);

  res.status(201).json({ success: true, task });
});



exports.createTask = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const task = await Task.create(req.body);

  res.status(201).json({ success: true, task });
});

// @desc Get single task
// @route GET /api/v1/task/:id
// @access Private

exports.getTask = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const task = await Task.findById(id);

  res.status(200).json({ success: true, task });
});

// @desc Update task
// @route PUT /api/v1/tasks/:id
// @access Private

exports.updateTask = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  let task = await Task.findById(id);

  if (task.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User  is not authorized to update this task`, 401)
    );
  }

  task = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, task });
});

// @desc Delete task
// @route DELETE /api/v1/tasks/:id
// @access Private

exports.deleteTask = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const task = await Task.findById(id);

  if (task.user.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User is not authorized to delete this task`, 401)
    );
  }

  task.remove();

  res.status(204).json({ succes: true, task: null });
});
