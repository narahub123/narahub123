import { Link } from "../../components";

export const NavigationBar = () => {
  return (
    <div className="flex p-2 bg-gray-200 navar">
      <Link to="/" className="btn btn-link">
        Home
      </Link>
      <Link to="/board" className="ml-4 btn btn-link">
        Board
      </Link>
    </div>
  );
};
