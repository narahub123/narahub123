import { useNavigate } from "react-router-dom";
import { useToggle } from "../../hooks";
import { useAuth } from "../../contexts";
import { useCallback } from "react";
import { Modal, ModalAction, ModalContent } from "../../theme/daisyui";

export const Logout = () => {
  const navigate = useNavigate();
  const [open, toggleOpen] = useToggle(true);

  const { logout } = useAuth();

  const onAccept = useCallback(() => {
    logout(() => {
      toggleOpen();
      navigate("/");
    });
  }, [navigate, toggleOpen]);

  const onCancel = useCallback(() => {
    toggleOpen();
    navigate(-1);
  }, [navigate, toggleOpen]);

  return (
    <Modal open={open}>
      <ModalContent
        closeIconClassName="btn-primary btn-online"
        onCloseIconClicked={onCancel}
      >
        <p className="text-xl text-center">Are you sure you want to log out?</p>
        <ModalAction>
          <button className="btn btn-primary btn-sm" onClick={onAccept}>
            Logout
          </button>
          <button className="btn btn-secondary btn-sm" onClick={onCancel}>
            Cancel
          </button>
        </ModalAction>
      </ModalContent>
    </Modal>
  );
};
