import React, { useState } from "react";

import { UserContextProvider, UserType } from "../contexts";
import { UserProfile } from "../components";

const ContextTest = () => {
  const [user, setUser] = useState<UserType>({
    name: "user1",
    age: 20,
  });

  return (
    <div>
      <UserContextProvider value={{ user, setUser }}>
        <UserProfile />
      </UserContextProvider>
    </div>
  );
};

export default ContextTest;
