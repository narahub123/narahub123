import { FC } from "react";
import { useOpenStore } from "../stores";

const FriendList: FC = () => {
  const setIsUserProfileModalOpen = useOpenStore(
    (state) => state.setIsUserProfileModalOpen
  );

  const handleOpen = () => {
    setIsUserProfileModalOpen(true);
  };

  return (
    <section>
      <header>
        <div>
          <h2>친구 목록</h2>
        </div>
        <div>
          <div className="flex justify-end">
            <button onClick={handleOpen}>내 프로필</button>
          </div>
        </div>
      </header>
      <main></main>
    </section>
  );
};

export default FriendList;
