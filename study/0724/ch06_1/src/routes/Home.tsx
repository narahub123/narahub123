import { FC } from "react";

type HomeProps = {
  title?: string;
};

const Home: FC<HomeProps> = ({ title }) => {
  return <p>{title ?? "Home"}</p>;
};

export default Home;
