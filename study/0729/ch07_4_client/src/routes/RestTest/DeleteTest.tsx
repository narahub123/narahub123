import { useCallback, useState } from "react";
import { Button } from "../../theme/daisyui";
import { del } from "../../server";
import { useAuth } from "../../contexts";

export const DeleteTest = () => {
  const [data, setData] = useState<object | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [id, setId] = useState("");

  const { jwt } = useAuth();

  const deleteTest = useCallback(() => {
    del(`/test/${id}`, jwt)
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

  console.log(id);
  return (
    <div className="mt-4 my-4">
      <div className="flex flex-col items-center mb-4 space-y-4">
        <div className="space-x-4">
          <label htmlFor="" className="font-bold">
            삭제할 _id
          </label>
          <input
            type="text"
            placeholder="아이디를 입력하세요."
            className="border mr-12 p-4 w-[250px]"
            onChange={onChange}
            value={id}
          />
          <Button onClick={deleteTest} className="mr-12 btn-primary ">
            DELETE ID
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
          <p>data: {JSON.stringify(data, null, 2)}</p>
          {errorMessage && <p>error: {errorMessage}</p>}
        </div>
      )}
    </div>
  );
};
