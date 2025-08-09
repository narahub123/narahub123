import { FC } from "react";

type InputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  entity: any;
  field: string;
  placeholder: string;
  type?: string;
};

const Input: FC<InputProps> = ({
  onChange,
  entity,
  field,
  placeholder,
  type = "text",
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
    />
  );
};

export default Input;
