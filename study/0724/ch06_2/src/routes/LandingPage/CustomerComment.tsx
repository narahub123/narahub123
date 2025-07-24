import { FC } from "react";
import { CustomerComment as CustomerCommentType } from "../../data";
import { Avatar, Div } from "../../components";

export type CustomerCommentProps = {
  customerComment: CustomerCommentType;
};

export const CustomerComment: FC<CustomerCommentProps> = ({
  customerComment,
}) => {
  const { name, jobTitle, company, avatar, comment } = customerComment;

  return (
    <Div
      className="relative p-2 mx-2 mt-8 border-2 rounded-lg shadow-lg board-primary"
      minWidth="20rem"
      width="20rem"
      minHeight="10rem"
    >
      <div className="absolute flex items-center justify-center w-full -top-7">
        <Avatar src={avatar} className="border-2 border-primary" />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col p-4 font-bold">
          <p>{name}</p>
          <p>{jobTitle}</p>
          <p>{company}</p>
        </div>
        <p className="mt-4">{comment}</p>
      </div>
    </Div>
  );
};
