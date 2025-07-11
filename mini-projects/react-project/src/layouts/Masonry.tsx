import { FC, ReactNode } from "react";

type MasonryProps = {
  children: ReactNode;
};

export const Masonry: FC<MasonryProps> = ({ children }) => {
  return (
    <div className="grid w-full h-screen gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 auto-rows-[1rem]">
      {children}
    </div>
  );
};
