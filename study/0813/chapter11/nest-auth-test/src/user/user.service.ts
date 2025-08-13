import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entitiy';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    // 리포지토리 주입
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // 사용자 생성
  createUser(user): Promise<User> {
    return this.userRepository.save(user);
  }

  // 사용자 찾기
  async getUser(email: string) {
    const result = await this.userRepository.findOne({ where: { email } });

    return result;
  }

  // 사용자 수정
  async updateUser(email, _user) {
    const user: User | null = await this.getUser(email);
    console.log(user);

    if (!user) return;

    user.username = _user.username;
    user.password = _user.password;
    console.log(user);

    this.userRepository.save(user);
  }

  // 사용자 삭제
  deleteUser(email: string) {
    return this.userRepository.delete({ email });
  }
}
