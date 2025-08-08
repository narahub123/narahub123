const AuthMenu = () => {
  const auths = [{ text: "회원가입" }, { text: "로그인" }];

  return (
    <ul className="border border-blue-300 fixed bottom-6 right-24 shadow-md">
      {auths.map((auth) => (
        <button
          key={auth.text}
          className="p-4 text-center text-blue-300  hover:bg-blue-300 hover:text-white"
        >
          {auth.text}
        </button>
      ))}
    </ul>
  );
};

export default AuthMenu;
