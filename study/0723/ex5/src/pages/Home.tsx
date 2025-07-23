import React from "react";
import { Counter, TodoList } from "../components";

const Home = () => {
  return (
    <div>
      <h1>Redux createSlice 실습</h1>
      <Counter />
      <hr />
      <TodoList />
    </div>
  );
};

export default Home;
