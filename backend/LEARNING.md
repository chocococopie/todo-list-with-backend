## 🧠 What is Asynchronous Code?

In JavaScript (and Node.js), **asynchronous code** lets your program keep running **without waiting** for long operations (like database calls, file reads, API requests).

Instead of freezing and blocking, it says:

> "Hey, go ahead and do this in the background. Let me know when you're done."

---

### 🔄 Without async/await

If you didn’t have `async/await`, you’d have to use **callbacks** or **promises**, like this:

```js
Todo.find().then(todos => {
  res.json(todos);
}).catch(error => {
  res.status(500).json({ error });
});
```

This works, but it gets messy with multiple nested actions. That’s why `async/await` was added — it makes asynchronous code **look like synchronous code**, while still being non-blocking.

---

## ✅ What `async/await` Really Does

* `async` turns a function into a **promise-returning function**
* `await` tells JS to **pause inside that function until the promise resolves**

---

### Example from your code:

```js
app.get('/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});
```

### What's happening under the hood:

1. The route receives a GET request at `/todos`
2. `Todo.find()` is an **asynchronous operation** (it queries MongoDB)
3. `await` pauses the function until MongoDB returns the data
4. Once the data comes back, it's stored in `todos`
5. You send the data as a response: `res.json(todos)`

During that pause, **your server can still handle other requests** — that's the beauty of async code!

---

## ✨ Error handling with async/await

You should always wrap async code in `try...catch` to handle errors gracefully:

```js
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Something went wrong' });
  }
});
```

This way, if MongoDB is down or something fails, your app won't crash — it will return a proper error response.

---

## 🔄 Real-world analogy

Imagine ordering food at a restaurant:

* You place your order → they say, "OK, wait here"
* While you're waiting, the kitchen prepares your food (this is the async part)
* You don’t just freeze — maybe you check your phone (other code runs)
* When your food is ready, they call you → that’s the promise resolving!

---

## 🧩 Summary

| Concept  | Meaning                                              |
| -------- | ---------------------------------------------------- |
| `async`  | Marks a function that returns a promise              |
| `await`  | Waits for a promise to resolve (or reject)           |
| Benefit  | Clean, readable async code that doesn't block server |
| Use case | Talking to databases, APIs, file systems, timers     |

