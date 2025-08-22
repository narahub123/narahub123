import { useOpenStore, useUserStore } from "../stores";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import { ProfileImageUploader, Input } from "../components";
import { profileFieldList } from "../data";

const UserProfileModal = () => {
  const user = useUserStore((state) => state.user);
  const isUserProfileModalOpen = useOpenStore(
    (state) => state.isUserProfileModalOpen
  );
  const setIsUserProfileModalOpen = useOpenStore(
    (state) => state.setIsUserProfileModalOpen
  );

  const setIsCheckPasswordModalOpen = useOpenStore(
    (state) => state.setIsCheckPasswordModalOpen
  );

  const onCheckPasswordModalOpen = () => {
    setIsCheckPasswordModalOpen(true);
  };

  const onClose = () => {
    setIsUserProfileModalOpen(false);
  };

  if (!user) return null;

  return (
    <Modal open={isUserProfileModalOpen}>
      <ModalContent className="space-y-4" onCloseIconClicked={onClose}>
        <div className="flex justify-center">
          <h2 className="text-xl font-bold">사용자 프로필</h2>
        </div>
        <div className="space-y-4">
          <div className="flex justify-center">
            {/* 회원가입과 사용자 프로필 모두에 적용 가능하게 변경해야 함 */}
            <ProfileImageUploader />
          </div>
          <div className="space-y-4">
            {profileFieldList.map((input) => (
              <Input
                key={input.field}
                field={input.field}
                placeholder={input.placeholder}
                type={input.type}
                entity={user}
                disabled={input.field === "email"}
              />
            ))}
            {/* ResetPassword 모달창 사용? 비밀번호 확인 후 ResetPasswordModal로 이동?*/}
            <Button
              className="text-white btn btn-error"
              onClick={onCheckPasswordModalOpen}
            >
              비밀번호 변경
            </Button>
          </div>
        </div>
        <div className="flex justify-end">
          <Button className="btn-primary">프로필 변경</Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default UserProfileModal;
