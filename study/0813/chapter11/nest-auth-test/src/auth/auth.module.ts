import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { SessionSerializer } from './session.serializer';
import { LocalStrategy } from './local.strategy';
import { GoogleStrategy } from './google.strategy';
import { KakaoStrategy } from './kakao.strategy';
import { GithubStrategy } from './github.strategy';

@Module({
  imports: [UserModule, PassportModule.register({ session: true })], // 패스포트 모둘 추가
  providers: [
    AuthService,
    LocalStrategy,
    SessionSerializer,
    GoogleStrategy,
    KakaoStrategy,
    GithubStrategy,
  ], // 프로바이더 설정 추가
  controllers: [AuthController],
})
export class AuthModule {}
