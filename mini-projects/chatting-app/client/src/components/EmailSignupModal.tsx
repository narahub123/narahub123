import { FC, useEffect } from "react";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import { useOpenStore, useSignupStore } from "../stores";
import ProfileImageUploader from "./ProfileImageUploader";
import { signupFieldList } from "../data";
import Input from "./Input";

const EmailSignupModal: FC = () => {
  // 이메일 회원가입 모달창 여닫기 상태
  const isOpen = useOpenStore((state) => state.isEmailSignupModalOpen);

  // 이메일 회원가입 모달창 여닫기 상태 변경
  const setIsEmailSignupModalOpen = useOpenStore(
    (state) => state.setIsEmailSignupModalOpen
  );
  // 회원가입 모달창 여닫기 상태 변경
  const setIsSignupModalOpen = useOpenStore(
    (state) => state.setIsSignupModalOpen
  );
  // 회원가입 사용자 정보 삭제
  const cleanSignupUser = useSignupStore((state) => state.cleanSignupUser);

  // 회원가입 사용자 입력 정보 추가
  const setSignupUserInfo = useSignupStore((state) => state.setUserInfo);

  // 회원 정보 전송 가능 여부 상태
  const canSend = useSignupStore((state) => state.canSend);

  // 회원 정보 전송 가능 상태 변경
  const setCanSend = useSignupStore((state) => state.setCanSend);

  // 회원가입 사용자 정보
  const user = useSignupStore((state) => state.user);

  console.log(user);

  // 회원가입 정보 유효성 완료 여부 확인
  // 실제로는 유효성 검사의 결과로 확인해야 함
  useEffect(() => {
    console.log(Object.values(user));

    const canSend = Object.values(user).every((field, idx) => {
      if (idx === 0) return true;

      return field !== "";
    });

    setCanSend(canSend);
  }, [
    user.userId,
    user.username,
    user.email,
    user.password,
    user.password_confirm,
  ]);

  // 이메일 회원가입 취소 함수
  const handleCancel = () => {
    // 이메일 회원 가입 모달창 닫기
    setIsEmailSignupModalOpen(false);
    // 회원가입 모달창 열기
    setIsSignupModalOpen(true);
    // 회원가입 사용자 정보 삭제
    cleanSignupUser();
  };

  // 입력 값 업데이트 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    setSignupUserInfo(id, value);
  };

  return (
    <Modal open={isOpen}>
      <ModalContent className="space-y-8">
        <div className="flex justify-center">
          <h2 className="text-xl font-bold">이메일 회원 가입</h2>
        </div>
        <div className="flex justify-center">
          <div className="space-y-4">
            <div className="flex justify-center flex-1">
              <ProfileImageUploader />
            </div>
            {signupFieldList.map((input) => (
              <Input
                key={input.field}
                field={input.field}
                placeholder={input.placeholder}
                type={input.type}
                onChange={handleChange}
                entity={user}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between w-full">
          <Button className="text-white btn btn-error" onClick={handleCancel}>
            취소
          </Button>
          <Button className="btn btn-primary" disabled={!canSend}>
            회원가입
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default EmailSignupModal;
