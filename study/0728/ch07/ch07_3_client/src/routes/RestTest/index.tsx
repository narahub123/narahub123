import { DeleteTest } from "./DeleteTest";
import { GetTest } from "./GetTest";
import { PostTest } from "./PostTest";
import { PutTest } from "./PutTest";

const RestTest = () => {
  return (
    <div>
      <p className="test-3xl text-center font-bold">RestTest</p>
      <DeleteTest />
      <hr />
      <PutTest />
      <hr />
      <PostTest />
      <hr />
      <GetTest />
    </div>
  );
};

export default RestTest;
