import { FC } from "react";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import { useOpenStore } from "../stores";
import ProfileImageUploader from "./ProfileImageUploader";

const EmailSignupModal: FC = () => {
  const isOpen = useOpenStore((state) => state.isEmailSignupModalOpen);
  const setIsEmailSignupModalOpen = useOpenStore(
    (state) => state.setIsEmailSignupModalOpen
  );
  const setIsSignupModalOpen = useOpenStore(
    (state) => state.setIsSignupModalOpen
  );

  // 이메일 회원가입 취소 함수
  const handleCancel = () => {
    // 이메일 회원 가입 모달창 닫기
    setIsEmailSignupModalOpen(false);
    // 회원가입 모달창 열기
    setIsSignupModalOpen(true);
  };

  return (
    <Modal open={isOpen}>
      <ModalContent className="space-y-8">
        <div className="flex justify-center">
          <h2 className="text-xl font-bold">이메일 회원 가입</h2>
        </div>
        <div className="flex justify-center">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-28 flex justify-center">
                <label htmlFor="profile_image">프로필 사진</label>
              </div>
              <div className="flex-1 flex justify-center">
                <ProfileImageUploader />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-28 flex justify-center">
                <label htmlFor="userId">사용자 아이디</label>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="userId"
                  id="userId"
                  className="border p-2 w-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-28 flex justify-center">
                <label htmlFor="username">사용자 이름</label>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="border p-2 w-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-28 flex justify-center">
                <label htmlFor="email">이메일</label>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="border p-2 w-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-28 flex justify-center">
                <label htmlFor="password">비밀번호</label>
              </div>
              <div className="flex-1">
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="border p-2 w-full"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-28 flex justify-center">
                <label htmlFor="password_confirm">비밀번호 확인</label>
              </div>
              <div className="flex-1">
                <input
                  type="password"
                  name="password_confirm"
                  id="password_confirm"
                  className="border p-2 w-full"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between">
          <Button className="btn btn-error text-white" onClick={handleCancel}>
            취소
          </Button>
          <Button className="btn btn-primary">회원가입</Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default EmailSignupModal;
