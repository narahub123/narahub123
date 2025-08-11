import { FC, useEffect } from "react";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import { useOpenStore, useAuthStore } from "../stores";
import { ProfileImageUploader, Input } from "../components";
import { signupFieldList } from "../data";
import { SERVER_URL } from "../constants";

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
  const cleanSignupInfo = useAuthStore((state) => state.cleanSignupInfo);

  // 회원가입 사용자 입력 정보 추가
  const setSignupInfo = useAuthStore((state) => state.setSignupInfo);

  // 로그인 모달 여닫기 상태 변화
  const setIsLoginModalOpen = useOpenStore(
    (state) => state.setIsLoginModalOpen
  );

  // 회원 정보 전송 가능 여부 상태
  const canSend = useAuthStore((state) => state.canSend);

  // 회원 정보 전송 가능 상태 변경
  const setCanSend = useAuthStore((state) => state.setCanSend);

  // 회원가입 사용자 정보
  const signupInfo = useAuthStore((state) => state.signup);

  console.log(signupInfo);
  // 이메일 중복 체크
  useEffect(() => {
    if (!signupInfo.email) return;

    const checkEmailDuplicate = async () => {
      try {
        const response = await fetch(
          `${SERVER_URL}/auth/email-duplication-check?email=${signupInfo.email}`
        );

        if (!response.ok) {
          throw new Error("중복 확인 실패");
        }

        const data = await response.json();

        console.log(data);
      } catch (error) {
        console.error("에러 발생", error);
      }
    };

    checkEmailDuplicate();
  }, [signupInfo.email]);

  // 회원가입 정보 유효성 완료 여부 확인
  // 실제로는 유효성 검사의 결과로 확인해야 함
  useEffect(() => {
    console.log(Object.values(signupInfo));

    const canSend = Object.values(signupInfo).every((field, idx) => {
      if (idx === 0) return true;

      return field !== "";
    });

    setCanSend(canSend);
  }, [
    signupInfo.userId,
    signupInfo.username,
    signupInfo.email,
    signupInfo.password,
    signupInfo.password_confirm,
    setCanSend,
    signupInfo,
  ]);

  // 이메일 회원가입 취소 함수
  const handleCancel = () => {
    // 이메일 회원 가입 모달창 닫기
    setIsEmailSignupModalOpen(false);
    // 회원가입 모달창 열기
    setIsSignupModalOpen(true);
    // 회원가입 사용자 정보 삭제
    cleanSignupInfo();
  };

  // 입력 값 업데이트 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    setSignupInfo(id, value);
  };

  // 회원가입
  const handleSignup = async () => {
    const body = {
      profileImage: signupInfo.profile_image || "",
      email: signupInfo.email,
      username: signupInfo.username,
      userId: signupInfo.userId,
      password: signupInfo.password,
    };

    const response = await fetch(`${SERVER_URL}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("회원가입 실패");
    }

    const data = await response.json();

    if (data.success) {
      // email signup 닫기
      setIsEmailSignupModalOpen(false);
      // 로그인 열기
      setIsLoginModalOpen(true);
      // 회원가입 사용자 정보 삭제
      cleanSignupInfo();
      // canSend 초기화
      setCanSend(false);
    }
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
                entity={signupInfo}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-between w-full">
          <Button className="text-white btn btn-error" onClick={handleCancel}>
            취소
          </Button>
          <Button
            className="btn btn-primary"
            disabled={!canSend}
            onClick={handleSignup}
          >
            회원가입
          </Button>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default EmailSignupModal;
