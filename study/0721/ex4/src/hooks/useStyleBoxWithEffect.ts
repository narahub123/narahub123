import React, { useEffect } from "react";

export const useStyleBoxWithEffect = (
  boxRef: React.RefObject<HTMLDivElement | null>
) => {
  useEffect(() => {
    if (!boxRef.current) return;

    const box = boxRef.current;

    box.style.color = "red";
    box.style.width = "200px";
  }, []);
};
