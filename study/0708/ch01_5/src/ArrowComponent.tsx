import { FC } from "react";

type ArrowComponentProps = {
  href: string;
  text: string;
};

const ArrowComponent: FC<ArrowComponentProps> = (props) => {
  const { href, text } = props;

  return (
    <li>
      <a href={href} target="_blank">
        <p>{text}</p>
      </a>
    </li>
  );
};

export default ArrowComponent;
