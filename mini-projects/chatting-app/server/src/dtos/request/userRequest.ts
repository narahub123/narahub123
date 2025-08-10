import { IsEmail, IsNotEmpty } from "class-validator";

export class EmailCheckRequest {
  @IsNotEmpty({ message: "이메일 필수" })
  @IsEmail({}, { message: "유효하지 않은 이메일 형식" })
  email!: string;
}

export class SignupCheckRequest {
  @IsNotEmpty({ message: "이메일 필수" })
  @IsEmail({}, { message: "유효하지 않은 이메일 형식" })
  email!: string;

  @IsNotEmpty({ message: "사용자 아이디 필수" })
  userId!: string;

  @IsNotEmpty({ message: "사용자 이름 필수" })
  username!: string;

  @IsNotEmpty({ message: "비밀번호 필수" })
  password!: string;

  profileImage?: File;
}

export class LoginCheckRequest {
  @IsNotEmpty({ message: "이메일 필수" })
  @IsEmail({}, { message: "유효하지 않은 이메일 형식" })
  email!: string;

  @IsNotEmpty({ message: "비밀번호 필수" })
  password!: string;
}
