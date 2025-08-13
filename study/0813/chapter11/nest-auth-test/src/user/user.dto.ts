import { IsEmail, IsString } from 'class-validator';

// 사용자 생성
export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsString()
  username: string;
}

// 사용자 수정
export class UpdateUserDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}
