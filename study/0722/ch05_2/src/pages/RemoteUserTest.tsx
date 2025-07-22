import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import * as R from "../store/remoteUser";
import * as D from "../data";
import { useCallback, useEffect, useState } from "react";
import { useToggle } from "../hooks";
import { Avatar, Title } from "../components";
import { Button } from "../theme/daisyui";

export const RemoteUserTest = () => {
  const dispatch = useDispatch();
  const user = useSelector<AppState, R.State>(({ remoteUser }) => remoteUser);
  const [loading, toggleLoading] = useToggle();
  const [error, setError] = useState<Error | null>(null);

  const getRemoteUser = useCallback(() => {
    toggleLoading();
    D.fetchRandomUser()
      .then((user) => dispatch(R.setUser(user)))
      .catch(setError)
      .finally(toggleLoading);
  }, [dispatch, toggleLoading]);

  const changeName = useCallback(() => {
    toggleLoading();
    D.fetchRandomUser()
      .then((user) => dispatch(R.changeName(user.name)))
      .catch(setError)
      .finally(toggleLoading);
  }, [dispatch, toggleLoading]);

  const changeEmail = useCallback(
    () => dispatch(R.changeEmail(D.randomEmail())),
    [dispatch]
  );

  const changePicture = useCallback(
    () => dispatch(R.changePicture({ large: D.randomAvatar() })),
    [dispatch]
  );

  useEffect(getRemoteUser, [getRemoteUser]);

  return (
    <section className="mt-4">
      <Title>RemoteUserTest</Title>
      <div className="flex justify-center mt-4 space-x-4">
        <Button onClick={getRemoteUser} className="btn-sm btn-primary">
          GET REMOTE USER
        </Button>

        <Button onClick={changeName} className="btn-sm btn-accent">
          CHANGE NAME
        </Button>

        <Button onClick={changeEmail} className="btn-sm btn-success">
          CHANGE EMAIL
        </Button>

        <Button onClick={changePicture} className="btn-sm btn-secondary">
          CHANGE PICTURE
        </Button>
      </div>
      {loading && (
        <div className="flex items-center justify-center">
          <Button className="btn-circle loading"></Button>
        </div>
      )}
      {error && (
        <div className="p-4 mt-4 bg-red-500">
          <p className="text-3xl text-red-500 text-bold">{error.message}</p>
        </div>
      )}
      <div className="flex justify-center p-4 m-4">
        <Avatar src={user.picture.large} />
        <div className="ml-4">
          <p className="text-xl text-bold">
            {user.name.title}. {user.name.first} {user.name.last}
          </p>
          <p className="italic text-gray-600">{user.email}</p>
        </div>
      </div>
    </section>
  );
};
