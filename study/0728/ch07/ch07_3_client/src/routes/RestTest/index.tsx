import { DeleteTest } from "./DeleteTest";
import { GetTest } from "./GetTest";
import { PostTest } from "./PostTest";
import { PutTest } from "./PutTest";

const RestTest = () => {
  return (
    <div>
      <p className="test-3xl text-center text-bold">RestTest</p>
      <DeleteTest />
      <PutTest />
      <PostTest />
      <GetTest />
    </div>
  );
};

export default RestTest;
