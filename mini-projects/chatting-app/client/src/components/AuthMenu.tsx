import { auths } from "../data";
import { useOpenStore } from "../stores";

const AuthMenu = () => {
  const isOpen = useOpenStore((state) => state.isAuthMenuOpen);

  const setIsSignupModalOpen = useOpenStore(
    (state) => state.setIsSignupModalOpen
  );

  const setIsLoginModalOpen = useOpenStore(
    (state) => state.setIsLoginModalOpen
  );

  if (!isOpen) return null;

  return (
    <ul className="fixed border border-blue-300 shadow-md bottom-6 right-24">
      {auths.map((auth) => (
        <button
          key={auth.id}
          className="p-4 text-center text-blue-300 hover:bg-blue-300 hover:text-white"
          onClick={
            auth.id === "signup"
              ? () => setIsSignupModalOpen(true)
              : () => setIsLoginModalOpen(true)
          }
        >
          {auth.text}
        </button>
      ))}
    </ul>
  );
};

export default AuthMenu;
