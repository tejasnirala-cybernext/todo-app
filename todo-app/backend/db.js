const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/todo-app')

const TodoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: {
    type: Boolean,
    default: false,
  },
})

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
  Todo,
}