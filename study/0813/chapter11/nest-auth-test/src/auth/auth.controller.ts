import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/user.dto';
import {
  AuthenticatedGuard,
  GoogleAuthGuard,
  KakaoAuthGuard,
  LocalAuthGuard,
  LoginGuard,
} from './auth.guard';

@Controller('auth')
export class AuthController {
  // authService 주입
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Post('login')
  async login(@Request() req, @Response() res) {
    const userInfo = await this.authService.validateUser(
      req.body.email,
      req.body.password,
    );

    if (userInfo) {
      res.cookie('login', JSON.stringify(userInfo), {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      });
    }

    return res.send({ message: 'login success' });
  }

  // 가드를 이용한 로그인
  @UseGuards(LoginGuard) // loginGuard 사용
  @Post('login2')
  async login2(@Request() req, @Response() res) {
    // 쿠키 정보는 없지만 req.user가 존재하는 경우 쿠키 정보 추가
    // if (!req.cookies['login'] && req.user) {
    res.cookie('login', JSON.stringify(req.user), {
      httpOnly: true,
      // maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      maxAge: 1000 * 10,
    });
    // }
    return res.send({ message: 'login2 success' });
  }

  // 로그인을 한 때만 실행되는 메서드
  @UseGuards(LoginGuard)
  @Get('test-guard')
  testGuard() {
    return '로그인된 때만 이 글이 보입니다.';
  }

  @UseGuards(LocalAuthGuard)
  @Post('login3')
  login3(@Request() req) {
    return req.user;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('test-guard2')
  testGuardWithSession(@Request() req) {
    return req.user;
  }

  @UseGuards(GoogleAuthGuard)
  @Get('to-google')
  async googleAuth(@Request() req) {}

  @UseGuards(GoogleAuthGuard)
  @Get('google')
  async gooleAuthRedirect(@Request() req, @Response() res) {
    const { user } = req;

    return res.send(user);
  }

  @UseGuards(KakaoAuthGuard)
  @Get('to-kakao')
  async kakaoAuth(@Request() req) {}

  @UseGuards(KakaoAuthGuard)
  @Get('kakao')
  async kakaoAuthRedirect(@Request() req, @Response() res) {
    const { user } = req;

    return res.send(user);
  }
}
