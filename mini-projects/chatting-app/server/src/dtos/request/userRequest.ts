import { IsEmail, IsNotEmpty } from "class-validator";

export class EmailCheckRequest {
  @IsNotEmpty({ message: "이메일 필수" })
  @IsEmail({}, { message: "유효하지 않은 이메일 형식" })
  email!: string;
}
