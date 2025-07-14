import { Title } from "../components";
import * as D from "../data";
import User from "./User";

const UserContainer = () => {
  const children = D.makeArray(10)
    .map((index) => D.makeRandomUser())
    .map((user) => (
      <User
        key={user.uuid}
        user={user}
        className="m-2 text-xs border-2 border-blue-300 rounded-lg"
        maxHeight="15rem"
        width="15rem"
      />
    ));

  return (
    <section className="mt-4">
      <Title>UserContainer</Title>
      <div className="flex flex-wrap items-center justify-center p-4 m-4">
        {children}
      </div>
    </section>
  );
};

export default UserContainer;
