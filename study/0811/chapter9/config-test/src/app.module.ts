import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { WeatherModule } from './weather/weather.module';
import config from './config/config';

console.log('env : ' + process.env.NODE_ENV);
console.log('current working directory : ' + process.cwd());
console.log(`${process.cwd()}/envs/${process.env.NODE_ENV}.env`);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `${process.cwd()}/envs/${process.env.NODE_ENV}.env`, // 환경 변수 경로 지정
      load: [config],
    }),
    WeatherModule,
  ], // ConfigModule 전역 모듈 설정
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
