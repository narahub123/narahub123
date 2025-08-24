import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { logout, signInWithGoogle } from "../utils";

interface AdminHeaderProps {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AdminHeader: FC<AdminHeaderProps> = ({ isLogin, setIsLogin }) => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    await signInWithGoogle();

    setIsLogin(true);
  };

  const handleLogout = async () => {
    await logout();
    setIsLogin(false);
  };

  return (
    <header className="absolute flex justify-between w-full px-4 mt-4">
      <div>
        <button onClick={() => navigate("/")} className="btn">
          홈으로
        </button>
      </div>
      <div>
        {isLogin ? (
          <button onClick={handleLogout} className="text-white btn btn-error">
            로그아웃
          </button>
        ) : (
          <button onClick={handleLogin} className="text-white btn btn-success">
            구글 로그인
          </button>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
