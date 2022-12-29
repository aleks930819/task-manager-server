const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    maxlength: [500, 'Task can not be more than 500 characters'],
  },
  completed: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
});

module.exports = mongoose.model('Task', TaskSchema);
