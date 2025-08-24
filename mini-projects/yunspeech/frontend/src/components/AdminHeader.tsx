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
    <header className="flex justify-between mx-4 mt-4">
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
          <button onClick={handleLogin} className="btn btn-primary">
            구글 로그인
          </button>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
