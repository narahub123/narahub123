import { auths } from "../data";
import { useOpenStore } from "../stores";

const AuthMenu = () => {
  const isOpen = useOpenStore((state) => state.isAuthMenuOpen);

  const setIsSignupModalOpen = useOpenStore(
    (state) => state.setIsSignupModalOpen
  );

  if (!isOpen) return null;

  return (
    <ul className="border border-blue-300 fixed bottom-6 right-24 shadow-md">
      {auths.map((auth) => (
        <button
          key={auth.text}
          className="p-4 text-center text-blue-300  hover:bg-blue-300 hover:text-white"
          onClick={() => setIsSignupModalOpen(true)}
        >
          {auth.text}
        </button>
      ))}
    </ul>
  );
};

export default AuthMenu;
