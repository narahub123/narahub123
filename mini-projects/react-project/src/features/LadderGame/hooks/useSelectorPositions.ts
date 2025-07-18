import { useEffect } from "react";
import useLadderGameContext from "./useLadderGameContext";

type useSelectorPositionsProps = {
  selectorRefs: React.RefObject<(HTMLButtonElement | null)[]>;
};

const useSelectorPositions = ({ selectorRefs }: useSelectorPositionsProps) => {
  const { setSelectorPositions, participants } = useLadderGameContext();

  useEffect(() => {
    const getPositions = () => {
      if (!selectorRefs.current) return;

      const selectors = selectorRefs.current;

      const selectorPositions = selectors
        .filter((s) => s !== null)
        .map((selector) => {
          const { left, top, width, height } =
            selector!.getBoundingClientRect();

          const centerX = left + width / 2 - window.innerWidth * 0.1 - 16;
          const centerY = top + height / 2;

          return {
            centerX,
            centerY,
          };
        });

      setSelectorPositions(selectorPositions);
    };

    getPositions();

    window.addEventListener("resize", getPositions);

    return () => window.removeEventListener("resize", getPositions);
  }, [participants, selectorRefs.current]);
};

export default useSelectorPositions;
