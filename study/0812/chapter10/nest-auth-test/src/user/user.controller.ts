import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entitiy';

@Controller('user')
export class UserController {
  // 유저 서비스 주입
  constructor(private userService: UserService) {}

  // 사용자 생성
  @Post('/create')
  createUser(@Body() user: User) {
    return this.userService.createUser(user);
  }

  // 사용자 찾기
  @Get('/getUser/:email')
  async getUser(@Param('email') email: string) {
    const user = await this.userService.getUser(email);
    console.log(user);

    return user;
  }

  // 사용자 정보 변경
  @Put('/update/:email')
  updateUser(@Param('email') email: string, @Body() user: User) {
    console.log(user);

    return this.userService.updateUser(email, user);
  }

  // 사용자 삭제
  @Delete('/delete/:email')
  deleteUser(@Param('email') email: string) {
    return this.userService.deleteUser(email);
  }
}
