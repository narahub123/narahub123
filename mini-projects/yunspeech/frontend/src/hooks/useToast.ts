import { ToastType } from "../types";
import { useOpenStore, useToastStore } from "../stores";

const useToast = () => {
  const setToast = useToastStore((state) => state.setToast);
  const setIsToastOpen = useOpenStore((state) => state.setIsToastOpen);

  const toast = (toast: ToastType) => {
    setToast(toast);
    setIsToastOpen(true);
  };

  return toast;
};

export default useToast;
