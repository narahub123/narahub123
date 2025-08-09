import { FC } from "react";

type InputProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  entity: any;
  field: string;
  label: string;
  type?: string;
};

const Input: FC<InputProps> = ({
  onChange,
  entity,
  field,
  label,
  type = "text",
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex justify-center w-28">
        <label htmlFor={field}>{label}</label>
      </div>
      <div className="flex-1">
        <input
          type={type}
          name={field}
          id={field}
          className="w-full p-2 border"
          onChange={onChange}
          value={entity[field]}
        />
      </div>
    </div>
  );
};

export default Input;
