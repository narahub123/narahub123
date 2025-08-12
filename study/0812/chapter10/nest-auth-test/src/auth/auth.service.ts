import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/user/user.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  // 생성자에서 UserService를 주입받음
  constructor(private userService: UserService) {}

  // 사용자 회원가입
  async register(userDto: CreateUserDto) {
    // 이미 가입한 사용자가 있는지 확인
    const user = await this.userService.getUser(userDto.email);

    // 중복 가입인 경우
    if (user) {
      throw new HttpException(
        '해당 유저가 이미 있습니다.',
        HttpStatus.BAD_REQUEST,
      );
    }

    // 비밀번호 해싱
    const encryptedPassword = bcrypt.hashSync(userDto.password, 10);

    // 데이터베이스에 저장
    try {
      const user = await this.userService.createUser({
        ...userDto,
        password: encryptedPassword,
      });

      user.password = '';

      return user;
    } catch (error) {
      throw new HttpException('서버 에러', 500);
    }
  }
}
