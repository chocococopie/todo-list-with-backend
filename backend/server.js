const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo');

const app = express();

app.use(cors());
app.use(express.json());

// Connect to local MongoDB (or use Atlas)
mongoose.connect('mongodb://localhost:27017/todos');

// Routes

// Get all todos
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Add a new todo
app.post('/todos', async (req, res) => {
  const newTodo = new Todo({ text: req.body.text });
  await newTodo.save();
  res.json(newTodo);
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ status: 'Deleted' });
});

// Start server
app.listen(3001, () => console.log('🚀 Backend running on http://localhost:3001'));
