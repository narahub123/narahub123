import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';
import { User } from 'src/user/user.entitiy';
import { UserService } from 'src/user/user.service';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID!,
      //   clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      callbackURL: 'http://localhost:3000/auth/kakao',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    const providerId = 'kakao';
    const email = profile._json.kakao_account.email;
    const name = profile.displayName;

    const user: User = await this.userService.findByEmailOrSave(
      email,
      name,
      providerId,
    );

    return user;
  }
}
