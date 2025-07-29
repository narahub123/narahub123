import { useCallback, useEffect, useState } from "react";
import { get } from "../../server";
import { Button } from "../../theme/daisyui";

export const GetTest = () => {
  const [data, setData] = useState<object | null>(null);
  const [id, setId] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const getAllTest = useCallback(() => {
    get("/test")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => setErrorMessage(error.message));
  }, []);

  const getTest = useCallback(() => {
    get(`/test/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => setErrorMessage(error.message));
  }, [id]);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setId(e.target.value);
    },
    [id]
  );

  const clearData = useCallback(() => {
    setData(null);
  }, []);

  return (
    <div className="my-4">
      <div className="flex flex-col items-center mb-4 space-y-4">
        <div>
          <Button onClick={getAllTest} className="mr-12 btn-primary">
            GET ALL
          </Button>
          {data && (
            <Button onClick={clearData} className="mr-12 btn-primary">
              CLEAR
            </Button>
          )}
        </div>
        <div className="space-x-4">
          <label htmlFor="_id" className="font-bold">
            조회할 _id
          </label>
          <input
            type="text"
            placeholder="아이디를 입력하세요."
            className="border mr-12 p-4 w-[250px] rounded-md"
            onChange={onChange}
            value={id}
            id="_id"
          />
          <Button onClick={getTest} className="btn-primary">
            GET ID
            {id && (
              <span className="text-nowrap w-[50px] overflow-hidden text-ellipsis">
                {id}
              </span>
            )}
          </Button>
        </div>
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
