import { useCallback } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Button } from "../theme/daisyui";

export const Card = () => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();
  const [search] = useSearchParams();

  const goback = useCallback(() => navigate(-1), [navigate]);

  return (
    <div>
      <p>location : {JSON.stringify(location, null, 2)}</p>
      <p>params : {JSON.stringify(params, null, 2)}</p>
      <p>cardid : {params["cardid"]}</p>
      <p>
        from : {search.get("from")}, to: {search.get("to")}
      </p>
      <p></p>
      <Button onClick={goback} className="mt-4 btn-primary btn-xs">
        GO BACK
      </Button>
    </div>
  );
};
