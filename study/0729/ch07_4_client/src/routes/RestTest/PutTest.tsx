import { useCallback, useState } from "react";
import { Button } from "../../theme/daisyui";
import { put } from "../../server";
import * as D from "../../data";

type Body = Record<"id" | string, any>;

type Data = {
  ok: boolean;
  body?: Body;
  errorMessage?: string;
};

export const PutTest = () => {
  const [data, setData] = useState<Data | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [id, setId] = useState("");

  const putTest = useCallback(() => {
    put(`/test/${id}`, D.makeRandomCard())
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

  console.log(id);

  const clearData = useCallback(() => {
    setData(null);
  }, []);

  return (
    <div className="my-4">
      <div className="flex flex-col items-center mb-4 space-y-4">
        <div className="space-x-4">
          <label htmlFor="_id" className="font-bold">
            수정 _id
          </label>
          <input
            type="text"
            placeholder="아이디를 입력하세요."
            className="border mr-12 p-4 w-[250px]"
            onChange={onChange}
            value={id}
            id="_id"
          />
          <Button onClick={putTest} className="mr-12 btn-primary">
            PUT ID
            {id && (
              <span className="text-nowrap w-[50px] overflow-hidden text-ellipsis">
                {id}
              </span>
            )}
          </Button>
          {data && (
            <Button onClick={clearData} className="mr-12 btn-primary">
              CLEAR
            </Button>
          )}
        </div>
      </div>
      {data && (
        <div className="mt-4 text-center border p-4">
          <p>id: {data?.body?._id}</p>
          <p>data: {JSON.stringify(data, null, 2)}</p>
          {errorMessage && <p>error: {errorMessage}</p>}
        </div>
      )}
    </div>
  );
};
