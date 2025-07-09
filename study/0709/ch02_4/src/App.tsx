import "./App.css";

function App() {
  // key
  // const texts = [<p key={0}>Hello</p>, <p key={0}>world</p>];

  // map
  // const texts = ["hello", "world"].map((text, index) => (
  //   <p key={index}>{text}</p>
  // ));

  // children
  const texts = ["hello", "world"].map((text, index) => (
    <p key={index} children={text} />
  ));

  return <div children={texts} />;
}

export default App;
