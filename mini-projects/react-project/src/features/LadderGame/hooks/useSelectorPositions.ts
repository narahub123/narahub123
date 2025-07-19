import { useEffect } from "react";
import useLadderGameContext from "./useLadderGameContext";

type useSelectorPositionsProps = {
  selectorRefs: React.RefObject<(HTMLButtonElement | null)[]>;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

const useSelectorPositions = ({
  selectorRefs,
  containerRef,
}: useSelectorPositionsProps) => {
  const { setSelectorPositions, participants } = useLadderGameContext();

  useEffect(() => {
    const getPositions = () => {
      if (!selectorRefs.current || !containerRef.current) return;

      const containerLeft = containerRef.current.getBoundingClientRect().left;

      const selectors = selectorRefs.current;

      const selectorPositions = selectors
        .filter((s) => s !== null)
        .map((selector) => {
          const { left, width } = selector!.getBoundingClientRect();

          // centerX를 canvas 내의 위치로 변경해야 함
          const centerX = left + width / 2 - containerLeft;

          return centerX;
        });

      setSelectorPositions(selectorPositions);
    };

    getPositions();

    window.addEventListener("resize", getPositions);

    return () => window.removeEventListener("resize", getPositions);
  }, [participants, selectorRefs.current]);
};

export default useSelectorPositions;
