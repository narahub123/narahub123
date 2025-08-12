import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 전역 파이프에 validationPipe 추가
  app.use(cookieParser());
  app.use(
    session({
      secret: 'vary-important-secret', // 세션 암호화 키
      resave: false, // 세션을 항상 저장할지 여부
      saveUninitialized: false, // 세션 저장되기 전까지 초기화되지 않은 상태로 세션을 미리 만들어 저장하는 여부
      cookie: { maxAge: 360000 }, // 쿠키 유효기간 설정 : 1시간
    }),
  );
  app.use(passport.initialize()); // passport 초기화
  app.use(passport.session()); // 세션 저장소 초기화
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
