import { Button } from "../components";

export const Login = () => {
  return (
    <div className="flex justify-center w-full mt-4">
      <div className="flex flex-col items-center gap-4 p-4 border-2 border-black rounded-lg w-[50%]">
        <p className="font-bold">로그인</p>
        <input
          type="email"
          placeholder="이메일"
          className="w-full p-2 border-2 border-black rounded-md"
        />
        <input
          type="password"
          placeholder="비밀번호"
          className="w-full p-2 border-2 border-black rounded-md"
        />
        <Button className="w-full btn btn-primary">로그인</Button>
      </div>
    </div>
  );
};
