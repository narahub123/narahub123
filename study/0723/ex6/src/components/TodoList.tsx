import { useState } from "react";
import { useTodoStore } from "../store/useTodoStore";

const TodoList = () => {
  const [input, setInput] = useState("");
  const { todos, addTodo, removeTodo, toggleTodo, clearTodos } = useTodoStore(
    (state) => state
  );

  const handleAdd = () => {
    if (input.trim() !== "") {
      addTodo(input);
      setInput("");
    }
  };

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력하세요."
        />
        <button onClick={handleAdd}>추가</button>
        <button onClick={clearTodos}>전체 삭제</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.done ? "line-through" : "none" }}
          >
            <span onClick={() => toggleTodo(todo.id)}>{todo.text}</span>
            <button onClick={() => removeTodo(todo.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
