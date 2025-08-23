import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useOpenStore, useToastStore } from "../stores";
import Icon from "./Icon";

const Toast = () => {
  const toastRef = useRef<HTMLDivElement>(null);
  const isToastOpen = useOpenStore((state) => state.isToastOpen);
  const setIsToastOpen = useOpenStore((state) => state.setIsToastOpen);
  const clearToast = useToastStore((state) => state.clearToast);

  const toast = useToastStore((state) => state.toast);

  useEffect(() => {
    if (!isToastOpen) {
      return;
    }

    if (toastRef.current) {
      toastRef.current.style.zIndex = "1000";
    }

    const timer = setTimeout(() => {
      setIsToastOpen(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isToastOpen, toastRef.current]);

  useEffect(() => {
    if (!toastRef.current) return;
    const transitionEnd = () => {
      if (!isToastOpen) {
        clearToast();
        if (toastRef.current) {
          toastRef.current.style.zIndex = "-1";
        }
      }
    };

    toastRef.current.addEventListener("transitionend", transitionEnd);

    return () =>
      toastRef.current?.removeEventListener("transitionend", transitionEnd);
  }, [isToastOpen]);

  if (!toast || !isToastOpen) return null;

  return createPortal(
    <div
      ref={toastRef}
      className={`max-w-[95%] min-w-[90%] flex items-center gap-2 -z-10 text-white ${
        toast?.type === "error" ? "bg-red-400" : "bg-green-400"
      } absolute bottom-8 left-1/2 -translate-x-1/2  opacity-0 transition-opacity duration-500 py-2 px-4 rounded-lg ${
        isToastOpen ? "opacity-100" : ""
      }`}
    >
      <span>
        <Icon
          name={toast.type === "error" ? "error" : "check_circle"}
          className="text-2xl"
        />
      </span>
      <span>
        <p>{toast.message}</p>
      </span>
    </div>,
    document.body
  );
};

export default Toast;
