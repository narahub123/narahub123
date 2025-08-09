import { useSignupStore } from "../stores";
import { Button, Modal, ModalContent } from "../theme/daisyui";
import { Input, Link } from "../components";

const LoginModal = () => {
  const user = useSignupStore((state) => state.user);
  return (
    <Modal open>
      <ModalContent className="space-y-8">
        <div className="flex justify-center">
          <h1 className="text-xl font-bold">다시 오셨군요?</h1>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col items-center gap-4">
            <div className="space-y-4">
              <Input
                field="email"
                label="이메일"
                onChange={() => {}}
                entity={user}
              />
              <Input
                field="password"
                label="비밀번호"
                onChange={() => {}}
                type="password"
                entity={user}
              />
              <Button className="w-full">로그인</Button>
            </div>
            <hr className="w-full" />
            <div>소셜 로그인</div>
          </div>
          <hr className="w-full" />
          <div className="flex justify-center gap-2">
            <p>계정이 없으신가요?</p>
            <Link text="회원가입하러가기" onClick={() => {}} />
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
