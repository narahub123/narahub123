import { useEffect, useState } from "react";

function App2() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // 문제 1
    // console.log("페이지가 열렸습니다.");

    // 문제 2
    // const timer = setTimeout(() => {
    //   alert("환영합니다.");
    // }, 3000);

    // 문제 2
    // return () => clearTimeout(timer);

    // 문제 3
    console.log("useEffect 실행", count);

    // 문제 4
    return () => {
      console.log("종료됨");
    };
  }, [count]);

  // 문제 3
  // const countUp = () => {
  //   setCount(count + 1);
  // };
  // 문제 3
  // const countDown = () => {
  //   setCount(count - 1);
  // };

  return (
    <div>
      <h2>useEffect 연습</h2>
      {/* 문제 3 */}
      {/* <button onClick={countUp}>증가</button>
      <button onClick={countDown}>감소</button> */}

      
    </div>
  );
}

export default App2;
