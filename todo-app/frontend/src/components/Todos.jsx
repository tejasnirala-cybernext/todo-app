import { useEffect, useState } from "react"
import axios from 'axios'

export function Todos({ todos, setTodos }) {

  useEffect(() => {
    async function getTodos() {
      const resData = await axios.get('http://localhost:3000/todos');
      const todosData = resData.data;

      if (todosData.success) {
        setTodos(todosData.message);
      }
    }
    getTodos()
  }, [setTodos]);

  const handleCheckboxChange = async (id) => {
    try {
      const todo = todos.find((todo) => todo._id === id);
      const updatedCompletedStatus = !todo.completed;

      const res = await axios.patch('http://localhost:3000/completed', {
        id,
        completed: updatedCompletedStatus,
      });

      if (res.data.success) {
        setTodos(todos.map((todo) =>
          todo._id === id ? { ...todo, completed: updatedCompletedStatus } : todo
        ));
      } else {
        console.error(res.data.message);
      }
    } catch (error) {
      console.error("Error updating todo", error);
    }
  };

  return (
    <div style={{ marginTop: 10, marginLeft: 10 }}>
      {todos.map((todo) => (
        <div key={todo._id} style={{ marginBottom: 10 }}>
          <div><b>{todo.title}</b></div>
          <div>{todo.description}</div>
          <input
            style={{ marginRight: 10 }}
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleCheckboxChange(todo._id)}
          />
        </div>
      ))}
    </div>
  );
}
