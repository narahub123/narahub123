import { MyComponent } from "../components";

const RefTest = () => {
  return (
    <div className="flex items-center justify-center w-full h-screen ">
      <div className="flex flex-col items-center space-y-10 ">
        <h1 className="text-2xl font-bold">RefTestPage</h1>
        <MyComponent />
        <MyComponent />
        <MyComponent />
      </div>
    </div>
  );
};

export default RefTest;
