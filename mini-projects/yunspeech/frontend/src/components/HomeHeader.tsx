import { useNavigate } from "react-router-dom";

const HomeHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="absolute flex justify-end w-full top-4 right-4">
      <button className="btn" onClick={() => navigate("/admin")}>
        관리자 페이지로
      </button>
    </header>
  );
};

export default HomeHeader;
