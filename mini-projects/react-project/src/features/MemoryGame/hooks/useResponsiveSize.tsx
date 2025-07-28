import { useLayoutEffect, useState } from "react";
import { DEFAULT_HEIGHT_RATIO, DEFAULT_WIDTH_RATIO } from "../constants";
import { IComponentSize } from "../../../types";

type useResponsiveSizeProps = {
  aspectRatio: string;
};

export const useReposiveSize = ({
  aspectRatio,
}: useResponsiveSizeProps): IComponentSize => {
  const [size, setSize] = useState<IComponentSize>({
    width: 0,
    height: 0,
  });

  useLayoutEffect(() => {
    const [h, v] = aspectRatio.split("/").map((a) => Number(a.trim()));

    if (!h || !v) {
      setSize({
        width: "100%",
        height: "100%",
      });
      return;
    }

    const updateSize = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      let width = viewportWidth * DEFAULT_WIDTH_RATIO;
      let height = (viewportHeight * v) / h;

      if (height > viewportHeight) {
        height = viewportHeight * DEFAULT_HEIGHT_RATIO;
        width = (height * h) / v;
      }

      setSize({ width, height });
    };

    updateSize();

    window.addEventListener("resize", updateSize);

    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, [aspectRatio]);

  return size;
};
