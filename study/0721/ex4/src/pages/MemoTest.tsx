import React from "react";
import { ExpensiveComponent } from "../components";

const MemoTest = () => {
  return (
    <div>
      <h2>useMemo 테스트</h2>
      <ExpensiveComponent />
    </div>
  );
};

export default MemoTest;
