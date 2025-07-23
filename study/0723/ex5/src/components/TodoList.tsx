import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import {
  addTodo,
  clearTodo,
  removeTodo,
  Rootstate,
  toggleTodo,
} from "../store";

const TodoList = () => {
  const dispatch = useAppDispatch();
  const [input, setInput] = useState("");
  const todos = useAppSelector((state: Rootstate) => state.todo.todos);

  const handleAdd = () => {
    if (input.trim() !== "") {
      dispatch(addTodo(input));
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
        />
        <button onClick={handleAdd}>추가</button>
        <button onClick={() => dispatch(clearTodo())}>전체 삭제</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            style={{ textDecoration: todo.done ? "line-through" : "none" }}
          >
            <span onClick={() => dispatch(toggleTodo(todo.id))}>
              {todo.text}
            </span>
            <button onClick={() => dispatch(removeTodo(todo.id))}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
