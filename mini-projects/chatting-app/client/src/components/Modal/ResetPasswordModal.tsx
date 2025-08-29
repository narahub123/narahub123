import { useState } from "react";
import { useOpenStore } from "../../stores";
import { Button, Modal, ModalContent } from "../../theme/daisyui";
import { Input } from "..";

const initialValue = { email: "", password: "" };

const ResetPasswordModal = () => {
  // 입력값
  const [value, setValue] = useState(initialValue);
  // api 요청 가능 여부 상태
  const [canSend, setCanSend] = useState(false);
  // 이메일 유효성 여부 상태(api 전송 후의 결과)
  const [isValid, setIsValid] = useState(false);

  // 비밀번호 재설정 모달 여닫기 상태
  const isOpen = useOpenStore((state) => state.isResetPasswordModalOpen);

  // 비밀번호 재설정 모달 여닫기 상태 변경 함수
  const setIsResetPasswordModalOpen = useOpenStore(
    (state) => state.setIsResetPasswordModalOpen
  );

  // 로그인 모달 여닫기 상태 변경 함수
  const setIsLoginModalOpen = useOpenStore(
    (state) => state.setIsLoginModalOpen
  );

  // 비밀번호 재설정 취소
  const handleResetPasswordCancel = () => {
    // 비밀번호 재설정 모달 닫기
    setIsResetPasswordModalOpen(false);
    // 로그인 모달 열기
    setIsLoginModalOpen(true);
    // value 초기화
    setValue(initialValue);
    // isValid 초기화
    setIsValid(false);
    // canSend 초기화
    setCanSend(false);
  };

  // 입력값 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    setValue((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (value) {
      setCanSend((prev) => {
        if (prev !== true) return true;
        else return prev;
      });
    } else {
      setCanSend((prev) => {
        if (prev !== false) return false;
        else return prev;
      });
    }
  };

  // 이메일 확인
  const handleEmailCheck = () => {
    setIsValid((prev) => (prev !== true ? true : prev));
    setCanSend((prev) => (prev !== false ? false : prev));
  };

  // 비밀번호 확인
  const handlePasswordCheck = () => {
    setIsValid((prev) => (prev !== true ? true : prev));
  };

  return (
    <Modal open={isOpen}>
      <ModalContent className="space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-bold">비밀번호 재설정</h2>
        </div>
        {isValid ? (
          <>
            <div className="space-y-2">
              <p>이메일로 전송된 임시 비밀번호를 입력해주세요</p>
              <Input
                field="password"
                placeholder="비밀번호"
                type="password"
                onChange={handleChange}
                entity={value}
              />
            </div>
            <div className="flex justify-between">
              <Button
                className="text-white btn btn-error"
                onClick={handleResetPasswordCancel}
              >
                취소
              </Button>
              <Button
                className="btn btn-primary"
                disabled={!canSend}
                onClick={canSend ? handlePasswordCheck : undefined}
              >
                확인
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-2">
              <p>비밀번호를 재설정할 계정의 이메일을 작성해주세요.</p>
              <Input
                field="email"
                placeholder="이메일"
                type="email"
                onChange={handleChange}
                entity={value}
              />
            </div>
            <div className="flex justify-between">
              <Button
                className="text-white btn btn-error"
                onClick={handleResetPasswordCancel}
              >
                취소
              </Button>
              <Button
                className="btn btn-primary"
                disabled={!canSend}
                onClick={canSend ? handleEmailCheck : undefined}
              >
                확인
              </Button>
            </div>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ResetPasswordModal;
