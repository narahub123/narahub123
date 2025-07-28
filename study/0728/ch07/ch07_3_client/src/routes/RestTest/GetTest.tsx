import { useCallback, useEffect, useState } from "react";
import { get } from "../../server";
import { Button } from "../../theme/daisyui";

export const GetTest = () => {
  const [data, setData] = useState<object>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getAllTest = useCallback(() => {
    get("/test")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => setErrorMessage(error.message));
  }, []);

  const getTest = useCallback(() => {
    get("/test/1234")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => setErrorMessage(error.message));
  }, []);

  return (
    <div className="mb-4">
      <div className="flex justify-center mb-4">
        <Button onClick={getAllTest} className="mr-12 btn-primary">
          GET ALL
        </Button>
        <Button onClick={getTest} className="btn-primary">
          GET ID 1234
        </Button>
      </div>
      <div className="mt-4 text-center">
        <p>data: {JSON.stringify(data, null, 2)}</p>
        {errorMessage && <p>error: {errorMessage}</p>}
      </div>
    </div>
  );
};
