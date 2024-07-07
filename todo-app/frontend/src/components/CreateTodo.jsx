import { useRef } from "react"
import axios from "axios";
export function CreateTodo() {
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

  async function handleAddTodo({ setTodos }) {
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;

    const addTodoResponse = await axios.post(
      'http://localhost:3000/todo',
      {
        title: title,
        description: description
      }
    );

    if(addTodoResponse.data.success) {
      console.log("Todo Addedd")
      const newTodo = addTodoResponse.data.message; // Assuming the response contains the new todo
      titleRef.current.value = '';
      descriptionRef.current.value = '';
      setTodos(prevTodos => [...prevTodos, newTodo]);
    }
  }

  return <div style={{ marginBottom: 30 }}>
    <input 
      style={{ margin: 5 }}
      type="text"
      placeholder="title"
      ref={titleRef} /> <br />
    <input
      style={{ margin: 5 }}
      type="text"
      placeholder="description"
      ref={descriptionRef} /> <br />
    <button
      style={{ marginTop: 10, marginLeft: 35 }} 
      onClick={handleAddTodo}>
      Add todo
    </button>
  </div>
}