import { FC, useEffect, useState } from "react";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import { useOpenStore, useAuthStore } from "../stores";
import { ProfileImageUploader, Input, DragAndDrop } from "../components";
import { signupFieldList } from "../data";
import {
  MEGA_BYTE,
  SERVER_URL,
  SIGNUP_IMAGE_ACCEPT,
  SIGNUP_IMAGE_MAXSIZE,
} from "../constants";
import { isValidFileSize, isValidFileType } from "../utils";

const EmailSignupModal: FC = () => {
  const [isIn, setIsIn] = useState(false);
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
  const clearSignupInfo = useAuthStore((state) => state.clearSignupInfo);

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

  // 프로필 이미지 상태 변경
  const setProfileImage = useAuthStore((state) => state.setProfileImage);

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
    clearSignupInfo();
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
      clearSignupInfo();
      // canSend 초기화
      setCanSend(false);
    }
  };

  const areValidFiles = (files: File[]) => {
    // const totalFiles: any[] = [...prevFiles, files];

    // 총 파일 개수 유효성 검사
    // if (!isValidFileCount(totalFiles, SIGNUP_IMAGE_MAXCOUNT)) return false;

    // 파일 타입 유효성 검사
    let invalidFiles: File[] = files.filter(
      (file) => !isValidFileType(file, SIGNUP_IMAGE_ACCEPT)
    );

    if (invalidFiles.length > 0) return false;

    // 파일 크기 유효성 검사
    invalidFiles = files.filter(
      (file) => !isValidFileSize(file, SIGNUP_IMAGE_MAXSIZE * MEGA_BYTE)
    );

    if (invalidFiles.length > 0) return false;

    return true;
  };

  const storeFilesWithPreview = (files: File[]) => {
    for (const file of files) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          console.log(e.target!.result);

          setProfileImage({ file, preview: e.target!.result as string });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal open={isOpen}>
      <ModalContent className="p-0">
        <DragAndDrop
          isIn={isIn}
          setIsIn={setIsIn}
          className="m-4 rounded-lg"
          storeFiles={storeFilesWithPreview}
          areValidFiles={areValidFiles}
        >
          <div className={`space-y-8 p-6`}>
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
              <Button
                className="text-white btn btn-error"
                onClick={handleCancel}
              >
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
          </div>
        </DragAndDrop>
      </ModalContent>
    </Modal>
  );
};

export default EmailSignupModal;
