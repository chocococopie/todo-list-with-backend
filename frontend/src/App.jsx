import { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [error, setError] = useState(null);

  // Load todos from backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/todos")
      .then((res) => {
        setTodos(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Backend not responding:", err.message);
        setError("Could not load todos. Is the backend running?");
      });
  }, []);

  // Add a new todo
  const addTodo = () => {
    if (!text.trim()) return;

    axios
      .post("http://localhost:3001/todos", { text })
      .then((res) => {
        setTodos([...todos, res.data]);
        setText("");
      })
      .catch((err) => {
        console.error("Error adding todo:", err.message);
        setError("Could not add todo.");
      });
  };

  // Delete a todo
  const deleteTodo = (id) => {
    axios
      .delete(`http://localhost:3001/todos/${id}`)
      .then(() => {
        setTodos(todos.filter((todo) => todo._id !== id));
      })
      .catch((err) => {
        console.error("Error deleting todo:", err.message);
        setError("Could not delete todo.");
      });
  };

  // Toggle completed status
  const toggleCompleted = (id, newStatus) => {
    axios
      .patch(`http://localhost:3001/todos/${id}`, { completed: newStatus })
      .then(() => {
        setTodos(
          todos.map((todo) =>
            todo._id === id ? { ...todo, completed: newStatus } : todo
          )
        );
      })
      .catch((err) => {
        console.error("Error updating todo:", err.message);
        setError("Could not update todo.");
      });
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1>Todo List</h1>

      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a todo..."
        style={{ marginRight: "0.5rem" }}
      />
      <button onClick={addTodo}>Add</button>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {todos.length === 0 && !error ? (
        <p style={{ marginTop: "1rem" }}>No todos yet. Add one above!</p>
      ) : (
        <ul style={{ marginTop: "1rem" }}>
          {todos.map((todo) => (
            <li
              key={todo._id}
              style={{ marginBottom: "0.5rem", display: "flex" }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompleted(todo._id, !todo.completed)}
                style={{ marginRight: "0.5rem" }}
              />

              <span
                style={{
                  flexGrow: 1,
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo._id)}
                style={{ marginLeft: "1rem" }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
