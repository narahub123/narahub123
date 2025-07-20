import { useRef } from "react";
import { useDashboardContext } from "../hooks";
import { Card } from "./Card";

export const CloneCard = () => {
  const componentRef = useRef<HTMLDivElement | null>(null);
  const { cloneCard, cloneStyle, cloneCardRef, InnerComponent } =
    useDashboardContext();

  if (!cloneCard || !cloneStyle) return null;

  return (
    <div
      id="clone_card"
      style={cloneStyle}
      className="shadow-lg overflow-hiddenrounded-md"
      ref={cloneCardRef}
    >
      {InnerComponent ? (
        <InnerComponent ref={componentRef} />
      ) : (
        <Card
          card={cloneCard}
          onClick={() => {}}
          style={{ height: cloneStyle.height }}
        />
      )}
    </div>
  );
};
