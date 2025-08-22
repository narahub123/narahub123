import { FC } from "react";

const FriendList: FC = () => {
  return (
    <section>
      <header>
        <div>
          <h2>친구 목록</h2>
        </div>
        <div>
          <div className="flex justify-end">
            <button>내 프로필</button>
          </div>
        </div>
      </header>
      <main></main>
    </section>
  );
};

export default FriendList;
