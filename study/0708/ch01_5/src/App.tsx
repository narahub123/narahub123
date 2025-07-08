import React, { Component } from "react";
import "./App.css";
import * as D from "./data";
import ClassComponent from "./ClassComponent";
import ArrowComponent from "./ArrowComponent";
import OnClick from "./pages/onClick";

// 화살표 ㄷ함수 방식
const App = () => {
  return (
    <ul>
      <ArrowComponent href="https://www.google.com" text="go to Google" />
      <ClassComponent href="https://www.naver.com" text="go to Naver" />
      <OnClick />
    </ul>
  );
};

export default App;

// class 방식
// export default class App extends Component {
//   render() {
//     return (
//       <ul>
//         <ClassComponent href="https://www.google.com" text="go to Google" />
//         <ClassComponent href="https://www.naver.com" text="go to Naver" />
//       </ul>
//     );
//   }
// }

// function 키워드 방식
// export default function App() {
//   return (
//     <ul>
//       <ClassComponent href="https://www.google.com" text="go to Google" />
//       <ClassComponent href="https://www.naver.com" text="go to Naver" />
//     </ul>
//   );
// }
