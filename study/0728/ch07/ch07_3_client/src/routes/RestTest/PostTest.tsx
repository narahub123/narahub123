import { useCallback, useState } from "react";
import { Button } from "../../theme/daisyui";
import { post } from "../../server";
import * as D from "../../data";

export const PostTest = () => {
  const [data, setData] = useState<object | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const postTest = useCallback(() => {
    post("/test", D.makeRandomCard())
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => setErrorMessage(error.message));
  }, []);

  const clearData = useCallback(() => {
    setData(null);
  }, []);

  return (
    <div className="my-4">
      <div className="flex justify-center mb-4">
        <Button onClick={postTest} className="mr-12 btn-primary">
          POST
        </Button>
        {data && (
          <Button onClick={clearData} className="mr-12 btn-primary">
            CLEAR
          </Button>
        )}
      </div>
      {data && (
        <div className="mt-4 text-center border p-4">
          <p>data: {JSON.stringify(data, null, 2)}</p>
          {errorMessage && <p>error: {errorMessage}</p>}
        </div>
      )}
    </div>
  );
};
