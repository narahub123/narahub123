import { useCallback, useEffect, useState } from "react";
import * as U from "../../utils";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";

type LoginFormType = Record<"email" | "password", string>;

const initialFormState = {
  email: "",
  password: "",
};

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [{ email, password }, setForm] =
    useState<LoginFormType>(initialFormState);

  const changed = useCallback(
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((obj) => ({ ...obj, [key]: e.target.value }));
    },
    []
  );

  const loginAccount = useCallback(() => {
    console.log(email, password);

    login(email, password, () => navigate("/"));
  }, [email, password, navigate, login]);

  useEffect(() => {
    U.readObjectP<LoginFormType>("user")
      .then((user) => {
        if (user) setForm(user);
      })
      .catch((e) => {}); // 오류 무시
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 border border-gray-300 shadow-xl rounded-xl">
      <div className="flex flex-col items-center justify-center flex-1 max-w-sm px-2 mx-auto">
        <div className="w-full px-6 py-8 text-black bg-white rounded shadow-sm">
          <h1 className="mb-8 text-2xl text-center text-primary">Log In</h1>
          <input
            type="text"
            className="w-full p-3 mb-4 input input-primary"
            placeholder="Email"
            value={email}
            onChange={changed("email")}
          />
          <input
            type="password"
            className="w-full p-3 mb-4 input input-primary"
            name="password"
            placeholder="Password"
            value={password}
            onChange={changed("password")}
          />

          <button
            className="w-full btn btn-primary"
            type="submit"
            onClick={loginAccount}
          >
            LOGIN
          </button>
        </div>

        <div className="mt-6 text-gray-800">
          Create account?
          <Link to="/signup" className="btn btn-link btn-primary">
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
};
