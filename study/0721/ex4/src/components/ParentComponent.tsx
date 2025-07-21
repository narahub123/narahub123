import { HTMLInputTypeAttribute, useRef } from "react";
import CustomInput from "./CustomInput";

type CustomInput = { focus: () => void; clear: () => void };

const ParentComponent = () => {
  const inputRef = useRef<CustomInput>(null);

  return (
    <div className="p-4 space-y-4">
      <p>useImperativeHandler 연습</p>
      <CustomInput ref={inputRef} />
      <div className="space-x-4">
        <button
          onClick={() => {
            inputRef.current?.focus();
          }}
          className="btn btn-primary"
        >
          포커스 이동
        </button>
        <button
          onClick={() => inputRef.current?.clear()}
          className="btn btn-primary"
        >
          초기화
        </button>
      </div>
    </div>
  );
};

export default ParentComponent;
