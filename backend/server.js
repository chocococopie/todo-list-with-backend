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

// Update a todo's completed status
app.patch('/todos/:id', async (req, res) => {
  const { completed } = req.body;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { completed },
      { new: true }
    );
    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(updatedTodo);
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({ error: 'Could not update todo' });
  }
});


// Start server
app.listen(3001, () => console.log('🚀 Backend running on http://localhost:3001'));
