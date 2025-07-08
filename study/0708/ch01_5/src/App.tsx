import React, { Component } from "react";
import "./App.css";
import * as D from "./data";
import ClassComponent from "./ClassComponent";

export default class App extends Component {
  render() {
    return (
      <ul>
        <ClassComponent href="https://www.google.com" text="go to Google" />
        <ClassComponent href="https://www.naver.com" text="go to Naver" />
      </ul>
    );
  }
}
