// src/pages/todo.js
import React, { useState } from 'react';
import styles from '../components/TodoList.module.css'; // Import the styles

const TodoList = () => {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTodos([...todos, task]);
      setTask('');
    }
  };

  const removeTask = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className={styles.container}>
      <h2>📋 Todo List</h2>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Add a new task..."
        className={styles.todoInput}
      />
      <button onClick={addTask} className={styles.addButton}>Add Task</button>

      {todos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#667eea', marginTop: '30px' }}>
          ✨ No tasks yet. Add one to get started!
        </p>
      ) : (
        <ul className={styles.todoList}>
          {todos.map((todo, index) => (
            <li key={index} className={styles.todoItem}>
              <p>✓ {todo}</p>
              <button onClick={() => removeTask(index)} className={styles.removeButton}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;
