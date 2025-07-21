import { useRef } from "react";
import { useStyleBox, useStyleBoxWithEffect } from "../hooks";

const UseLayoutEffectExample = ({ color }: { color: string }) => {
  const boxRef = useRef<HTMLDivElement>(null);

  useStyleBox(boxRef, color);

  //   useStyleBoxWithEffect(boxRef);

  return (
    <div ref={boxRef} className="h-[300px]">
      useLayoutEffect로 스타일 적용
    </div>
  );
};

export default UseLayoutEffectExample;
