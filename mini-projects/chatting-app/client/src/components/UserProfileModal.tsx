import { useEffect, useState } from "react";
import { useOpenStore, useUserStore } from "../stores";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import { ProfileImageUploader, Input, DragAndDrop } from "../components";
import { profileFieldList } from "../data";
import {
  fetchWithAuth,
  isValidFileCount,
  isValidFileSize,
  isValidFileType,
} from "../utils";
import {
  MEGA_BYTE,
  SIGNUP_IMAGE_ACCEPT,
  SIGNUP_IMAGE_MAXCOUNT,
  SIGNUP_IMAGE_MAXSIZE,
} from "../constants";
import { useToast } from "../hooks";
import { ImageType } from "../types";

interface ProfileInfo {
  userId: string;
  username: string;
  profileImage: ImageType;
  email: string;
}

const UserProfileModal = () => {
  const [isIn, setIsIn] = useState(false);
  const [profile, setProfile] = useState<ProfileInfo | null>(null);
  const [canSend, setCanSend] = useState(false);
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

  const toast = useToast();

  // profile 초기화
  useEffect(() => {
    if (!user) return;

    // 초기화
    setProfile({
      userId: user.userId,
      username: user.username,
      email: user.email,
      profileImage: {
        file: null,
        preview: user.profileImage,
      },
    });
  }, [user]);

  // 전송 가능 여부 확인
  useEffect(() => {
    if (!profile || !user) return;
    const canSend = [
      profile.userId !== user.userId,
      profile.profileImage.preview !== user.profileImage,
      profile.username !== user.username,
    ].some(Boolean);

    setCanSend((prev) => (prev === canSend ? prev : canSend));
  }, [profile, user]);

  const onCheckPasswordModalOpen = () => {
    setIsCheckPasswordModalOpen(true);
  };

  const onClose = () => {
    if (!user) return;
    setIsUserProfileModalOpen(false);

    // 초기화
    setProfile({
      userId: user.userId,
      username: user.username,
      email: user.email,
      profileImage: {
        file: null,
        preview: user.profileImage,
      },
    });
  };

  const storeFiles = (files: File[]) => {
    for (const file of files) {
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target) {
          console.log(e.target!.result);

          setProfile((prev) => ({
            ...prev!,
            profileImage: { file, preview: e.target!.result as string },
          }));
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const areValidFiles = (files: File[]) => {
    // 총 파일 개수 유효성 검사
    if (!isValidFileCount(files, SIGNUP_IMAGE_MAXCOUNT)) return false;

    // 파일 타입 유효성 검사
    let invalidFiles: File[] = files.filter(
      (file) => !isValidFileType(file, SIGNUP_IMAGE_ACCEPT)
    );

    if (invalidFiles.length > 0) {
      toast({
        type: "error",
        message: `이미지 타입에 맞지 않습니다.`,
      });
      return false;
    }

    // 파일 크기 유효성 검사
    invalidFiles = files.filter(
      (file) => !isValidFileSize(file, SIGNUP_IMAGE_MAXSIZE * MEGA_BYTE)
    );

    if (invalidFiles.length > 0) {
      toast({
        type: "error",
        message: `이미지의 최대 사이트는 ${SIGNUP_IMAGE_MAXSIZE}mb입니다.`,
      });
      return false;
    }

    return true;
  };

  const setProfileImage = (profileImage: ImageType) => {
    setProfile((prev) => ({
      ...prev!,
      profileImage,
    }));
  };

  // 입력 값 업데이트 함수
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const value = e.target.value;

    setProfile((prev) => ({
      ...prev!,
      [id]: value,
    }));
  };

  const handleUpdateProfile = async () => {
    if (!profile) return;
    const fd = new FormData();

    (Object.keys(profile) as (keyof ProfileInfo)[]).forEach((key) => {
      if (key === "profileImage") {
        if (profile.profileImage?.file) {
          fd.append("profileImage", profile.profileImage.file);
        }
      } else {
        fd.append(key, String(profile[key]));
      }
    });

    try {
      const response = await fetchWithAuth(
        "/users/me",
        {
          method: "PATCH",
          headers: {},
        },
        fd
      );

      if (!response.success) {
        console.error("프로필 수정 실패");
        toast({
          type: "error",
          message: "프로필 수정 실패",
        });
        return;
      }

      const { profileImage, ...rest } = response.data.profile;

      let newProfile = {
        ...rest,
      };

      if (profileImage) {
        newProfile["profileImage"] = {
          file: null,
          preview: profileImage,
        };
      }

      setProfile((prev) => ({
        ...prev,
        ...newProfile,
      }));

      toast({
        type: "success",
        message: "프로필 수정 성공",
      });
    } catch (err) {
      console.error(err);
      toast({
        type: "error",
        message: "프로필 수정 실패",
      });
    }
  };

  if (!user || !profile) return null;

  return (
    <Modal open={isUserProfileModalOpen}>
      <ModalContent onCloseIconClicked={onClose}>
        <DragAndDrop
          isIn={isIn}
          setIsIn={setIsIn}
          storeFiles={storeFiles}
          areValidFiles={areValidFiles}
          className="space-y-4 rounded-xl"
        >
          <div className="flex justify-center">
            <h2 className="text-xl font-bold">사용자 프로필</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-center">
              <ProfileImageUploader
                profileImage={profile.profileImage}
                setProfileImage={setProfileImage}
              />
            </div>
            <div className="space-y-4">
              {profileFieldList.map((input) => (
                <Input
                  key={input.field}
                  field={input.field}
                  placeholder={input.placeholder}
                  type={input.type}
                  entity={profile}
                  disabled={input.field === "email"}
                  onChange={handleChange}
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
            <Button
              className="btn-primary"
              onClick={handleUpdateProfile}
              disabled={!canSend}
            >
              프로필 변경
            </Button>
          </div>
        </DragAndDrop>
      </ModalContent>
    </Modal>
  );
};

export default UserProfileModal;
