import { useUserContext } from "../hooks";

const UserProfile = () => {
  const { user, setUser } = useUserContext();

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-center">사용자 정보</h2>
      <div className="flex flex-col items-center my-4">
        <p>{user.name}</p>
        <p>{user.age}</p>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => setUser({ name: "홍길동", age: 30 })}
          className="p-2 text-white bg-blue-500 border rounded"
        >
          사용자 정보 변경
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
