export type LoginStoreState = {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export type OpenState = {
  isAuthMenuOpen: boolean;
  setIsAuthMenuOpen: (updater: (prev: boolean) => boolean) => void;
  isSignupModalOpen: boolean;
  setIsSignupModalOpen: (isOpen: boolean) => void;
};
