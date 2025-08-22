import { FC } from "react";

type InputHtmlProps = React.HTMLAttributes<HTMLInputElement>;

type InputProps = InputHtmlProps & {
  entity: any;
  field: string;
  placeholder: string;
  disabled?: boolean;
  type?: string;
};

const Input: FC<InputProps> = ({
  onChange,
  entity,
  field,
  placeholder,
  type = "text",
  ...rest
}) => {
  return (
    <input
      type={type}
      name={field}
      id={field}
      className="w-full p-3 border rounded-md"
      onChange={onChange}
      value={entity[field]}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default Input;
