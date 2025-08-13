import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { User } from 'src/user/user.entitiy';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      clientID: process.env.KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
      callbackURL: 'http://localhost:3000/auth/github',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log(profile);

    const { displayName, profileUrl } = profile;
    const providerId = 'github';

    const user: User = await this.userService.findByEmailOrSave(
      profileUrl,
      displayName,
      providerId,
    );

    return user;
  }
}
