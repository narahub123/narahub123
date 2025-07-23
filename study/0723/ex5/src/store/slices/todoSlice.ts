import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoState } from "../../types";

const initialState: TodoState = {
  todos: [],
  nextId: 1,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.todos.push({ id: state.nextId, text: action.payload, done: false });
      state.nextId += 1;
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.todos.find((t) => t.id === action.payload);

      if (todo) {
        todo.done = !todo.done;
      }
    },
    removeTodo: (state, action: PayloadAction<number>) => {
      state.todos = state.todos.filter((t) => t.id !== action.payload);
    },
    clearTodo: (state) => {
      state.todos = [];
      state.nextId = 1;
    },
  },
});

export const { addTodo, toggleTodo, removeTodo, clearTodo } = todoSlice.actions;

export default todoSlice.reducer;
