import { Strategy } from 'passport-kakao';
import { User } from 'src/user/user.entitiy';
import { UserService } from 'src/user/user.service';
declare const KakaoStrategy_base: new (...args: [options: import("passport-kakao").StrategyOptionWithRequest] | [options: import("passport-kakao").StrategyOption]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class KakaoStrategy extends KakaoStrategy_base {
    private userService;
    constructor(userService: UserService);
    validate(accessToken: string, refreshToken: string, profile: any): Promise<User>;
}
export {};
